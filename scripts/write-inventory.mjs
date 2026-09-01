// Emits assets/INVENTORY.md from .harness/inventory.json, sandwiched between the
// hand-written fragments assets/INVENTORY.head.md and assets/INVENTORY.tail.md.
// Regenerate; never hand-edit the tables.
//   node scripts/write-inventory.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const BPS = [390, 768, 1440];
const d = (r, b) => (r.bps[b] ? `${r.bps[b].w}x${r.bps[b].h}` : '—');
const frag = (f) => (existsSync(f) ? readFileSync(f, 'utf8').trimEnd() + '\n\n' : '');
const { rows, generated } = JSON.parse(readFileSync('.harness/inventory.json', 'utf8'));
const ph = (id) => generated.filter((g) => g.slotId === id).map((g) => path.basename(g.file)).join('<br>') || '—';
const nat = (r) => (r.natural ? `${r.natural.w}x${r.natural.h}` : '—');

const head = `| slot ID | route | section | kind | 390 | 768 | 1440 | max served | aspect @1440 | object-fit | radius | dominant | aspect Δ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|`;
const row = (r) => `| \`${r.slotId}\` | ${r.route} | \`${r.section}\` | ${r.kind} | ${d(r, 390)} | ${d(r, 768)} | ${d(r, 1440)} | ${nat(r)} | ${r.aspects[1440] ?? '—'} | ${r.fit} | ${r.radius} | \`${r.colour.hex}\` <sub>${r.colour.from}</sub> | ${r.aspectChanges ? '**yes**' : 'no'} |`;

const byProv = (p) => rows.filter((r) => r.provenance === p);

const replaceTbl = [head, ...byProv('REPLACE').map(row)].join('\n');
const phTbl = ['| slot ID | placeholder files |', '|---|---|',
  ...byProv('REPLACE').map((r) => `| \`${r.slotId}\` | \`${ph(r.slotId)}\` |`)].join('\n');
const iconTbl = ['| slot ID | route | section | 390 | 768 | 1440 | what ships instead |', '|---|---|---|---|---|---|---|',
  ...byProv('ICON').map((r) => `| \`${r.slotId}\` | ${r.route} | \`${r.section}\` | ${d(r, 390)} | ${d(r, 768)} | ${d(r, 1440)} | ${r.note || 'lucide-react glyph at the same box and stroke weight'} |`)].join('\n');
const wordTbl = ['| slot ID | route | 390 | 768 | 1440 | what ships instead |', '|---|---|---|---|---|---|',
  ...byProv('WORDMARK').map((r) => `| \`${r.slotId}\` | ${r.route} | ${d(r, 390)} | ${d(r, 768)} | ${d(r, 1440)} | wordmark set in the display font — \`TODO(fact): logo asset\` (FACT-09) |`)].join('\n');
const delTbl = ['| slot ID | route | section | 1440 | why it is not filled |', '|---|---|---|---|---|',
  ...byProv('DELETED').map((r) => `| \`${r.slotId}\` | ${r.route} | \`${r.section}\` | ${d(r, 1440)} | ${r.note} |`)].join('\n');

const tally = ['| | count |', '|---|---|',
  `| slots inventoried | ${rows.length} |`,
  `| REPLACE — placeholder generated | ${byProv('REPLACE').length} |`,
  `| ICON — redrawn in lucide-react | ${byProv('ICON').length} |`,
  `| WORDMARK — set in the display font | ${byProv('WORDMARK').length} |`,
  `| DELETED — inventoried, deliberately not filled | ${byProv('DELETED').length} |`,
  `| TAKE — reference asset files copied into this repo | **0** |`,
  `| placeholder SVG files written | ${generated.length} |`,
  `| REPLACE assets downloaded | **0** |`].join('\n');

writeFileSync('assets/INVENTORY.md',
  frag('assets/INVENTORY.head.md') +
  `## REPLACE — theirs, never downloaded, placeholder generated\n\nRendered box per breakpoint. "max served" is the largest natural size the reference\nactually served across the three widths, not a srcset thumbnail.\n\n${replaceTbl}\n\n` +
  `### Placeholder files\n\nOne SVG per distinct aspect ratio, not per breakpoint — a slot that keeps its aspect across\nall three widths is one image the browser scales.\n\n${phTbl}\n\n` +
  `## ICON — redrawn, not copied\n\n${iconTbl}\n\n` +
  `## WORDMARK — no logo file exists yet\n\n${wordTbl}\n\n` +
  `## DELETED — inventoried, deliberately not filled\n\n${delTbl}\n\n` +
  `## Tally\n\n${tally}\n\n` +
  frag('assets/INVENTORY.tail.md'));
console.log(`assets/INVENTORY.md <- ${rows.length} slots, ${generated.length} placeholders`);
