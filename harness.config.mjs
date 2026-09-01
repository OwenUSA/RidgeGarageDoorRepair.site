// Per-site harness config -- Ridge Garage Door Repair.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

export default {
  referenceOrigin: 'https://costarroofinginc.com',
  devPort: 3104,

  // ref path -> our route. All five of our routes have a real reference counterpart here,
  // so unlike Titan there is no NOVEL-by-default page and no explicit ourRoutes needed.
  routeMap: {
    '/': '/',
    '/about-us/': '/about',
    '/services/': '/services',
    '/contact-us/': '/contact',
    '/privacy-policy/': '/privacy',
  },

  breakpoints: { diff: [390, 768, 1440], extra: [430], canonical: 1440 },

  // The reference is WordPress + ELEMENTOR (hello-elementor theme) with the ElementsKit
  // widget pack -- a fourth distinct page builder across five sites. Top-level bands are
  // .elementor-top-section (v2 markup) and .e-con.e-parent (v3 flex containers); both
  // appear, so both are candidates.
  sectionCandidates: ['.elementor-top-section', '.e-con.e-parent', 'main > section', 'section'],
  // EXACT selectors only -- config.mjs rejects [class*=] matchers (Atlas defect #1).
  chromeSelectors: ['header', 'footer', '.elementor-location-header', '.elementor-location-footer'],
  headerSelector: '.elementor-location-header, header',
  navToggleSelector: '.elementskit-menu-hamburger, button[aria-controls]',
  drawerSelector: '.elementskit-menu-offcanvas-elements, [data-drawer], .mobile-menu',
  ctaSelector: 'a[href^="tel:"], .elementor-button, button, [class*=btn], [class*=button]',
  logoSelector: '.elementor-location-header img, header img, #logo',
  iconFontFamilies: /elementskit|fontawesome|icomoon/i,

  thresholds: { fidelity: 2, struct: 5, token: 0 },
  fidelityMode: 'auto',

  tokenSources: ['app/globals.css', 'app/tokens.css', 'styles/tokens.css'],
  contractPath: 'docs/sections.md',
  reportPath: 'docs/divergence.md',
  copyModulePath: 'content/copy.ts',

  industryAllowlist: [
    'garage door', 'torsion spring', 'extension spring', 'opener', 'cable', 'roller',
    'track', 'panel', 'off-track', 'remote', 'keypad', 'sensor', 'weather seal',
    'residential', 'commercial', 'same-day', 'free estimate', 'repair', 'installation',
    'replacement',
  ],
  gramN: 5,
  trigramMax: 0.15,
  lengthTolerance: 0.1,

  // Prompt 3 — GENUINE length exemptions only. Each one must name a reason the +/-10%
  // rule cannot apply, not a section that was simply hard to hit. Prompt 11 reports these
  // as EXEMPT, never as PASS.
  lengthExempt: {
    '*::shell.header': 'D-02 + D-01. The reference nav is 19 links including a 16-item ' +
      'services mega-menu and 26 city pages; 2,072 of its 2,109 characters are that tree. ' +
      'Ours is five flat routes by contract. The header is measured on the 104/85px bar ' +
      'geometry, not on its character count.',
    '*::shell.footer': 'D-03 + D-14 + D-01. The reference footer carries an email address, ' +
      '"License Number: 1122135", a Terms and Conditions route and a four-item services ' +
      'column naming their own services. Email is banned outright, the licence number is a ' +
      'fact we do not have, and Terms is not one of our five routes. What is left cannot be ' +
      'padded back to 330 characters without inventing something.',
    '/contact::contact.map': 'The reference band is a bare Google Maps iframe with zero text ' +
      'nodes — a 0-character denominator, so a percentage does not exist. D-07 and D-08 ' +
      'require our map to carry the address as real text beside the frame plus a labelled ' +
      'directions link, because the iframe is opaque to assistive tech.',
  },

  // ---- Prompt 2: asset slot classification -------------------------------------------
  // Which reference asset maps to which of OUR slots, and its provenance. Site data, so it
  // lives here and not in the shared package. Read by scripts/inventory.mjs.
  //   REPLACE   their photo/logo/badge — never downloaded, placeholder generated
  //   DELETED   the band it lives in is not built (D-01 / D-02 / D-09)
  //   ICON      redrawn with lucide-react at the same box and stroke weight
  //   WORDMARK  set in the display font until a real logo file exists (FACT-09)
  slotRules: [
    { match: 'shell.header.img1', our: 'shell.header.logo', provenance: 'WORDMARK' },
    { match: 'shell.footer.img1', our: 'shell.footer.logo', provenance: 'WORDMARK' },
    { match: 'home.hero.bg26', our: 'home.hero.art', provenance: 'REPLACE' },
    { match: /^home\.trust-strip\.img/, our: null, provenance: 'ICON',
      note: 'D-14 badge row — lucide glyph + TODO(fact) chip at the same 100px box' },
    { match: 'home.about-teaser.img1', our: 'home.about-teaser.img', provenance: 'REPLACE' },
    { match: /^home\.services-grid\.img/, our: null, provenance: 'REPLACE' },
    { match: 'home.commitment.img1', our: 'home.commitment.img', provenance: 'REPLACE' },
    { match: 'home.performance-band.img1', our: 'home.performance-band.img', provenance: 'REPLACE' },
    { match: /^home\.components-grid\.img/, our: null, provenance: 'REPLACE' },
    { match: 'home.why-choose.bg2', our: 'home.why-choose.bg', provenance: 'REPLACE' },
    { match: 'home.cta-band.bg2', our: 'home.cta-band.bg', provenance: 'REPLACE' },
    { match: 'about.page-hero.bg2', our: 'about.page-hero.bg', provenance: 'REPLACE' },
    { match: 'about.story.img1', our: 'about.story.img', provenance: 'REPLACE' },
    { match: 'about.values.img1', our: 'about.values.img', provenance: 'REPLACE' },
    { match: 'services.page-hero.bg2', our: 'services.page-hero.bg', provenance: 'REPLACE' },
    { match: 'contact.page-hero.bg2', our: 'contact.page-hero.bg', provenance: 'REPLACE' },
    { match: 'privacy.body.img1', our: 'privacy.body.phone-icon', provenance: 'ICON',
      note: 'Twemoji telephone glyph -> lucide Phone at the same 14/15/16px box' },
    { match: 'privacy.body.img2', our: null, provenance: 'DELETED',
      note: 'D-03 — envelope glyph beside an email address. Both go.' },
    { match: 'privacy.body.img3', our: 'privacy.body.web-icon', provenance: 'ICON',
      note: 'Twemoji globe glyph -> lucide Globe at the same box' },
    { match: /^ref\.band10\.img/, our: null, provenance: 'DELETED',
      note: 'D-01 — blog teaser band is not built' },
    { match: /^ref\.band13\.img/, our: null, provenance: 'DELETED',
      note: 'D-02 + D-09 — every project card is a city page and every image is theirs' },
  ],
  badgePatterns: [/trust-strip/],

  // Set when the palette is generated (merged prompt 5+9). Each site MUST land on a
  // different palette: Atlas is plum/crimson (seed 500656), Forge a green/dark ramp
  // (seed 1005). Re-roll on a hue collision -- these sites must look independently built.
  // ---- Prompt 5+9: palette ------------------------------------------------------------
  // The ramp is the REFERENCE's own, extracted at Prompt 1 (docs/profile.md sec.7,
  // harness/tokens.json). palette.mjs converts it to OKLCH, holds every L and C EXACTLY,
  // and re-derives H from a random primary hue. So these hexes never ship -- only their
  // lightness/chroma structure does.
  //
  // Role mapping, and why it is not the obvious one:
  //   accent      = #064d2a, the reference's ACTUAL call CTA fill. L 0.3705 / C 0.0884.
  //   accentDeep  = #27282a, its ACTUAL hover. L 0.2766, darker, as the gate requires.
  //   primary     = #3f444b, the structural slate the reference uses for dark furniture.
  //                 Its chroma (0.0117) is below the accent's, which is the gate's
  //                 "the eye goes to the action, not the furniture" rule.
  //   primaryDeep = #0c0d0e, the reference's deepest observed surface.
  // The reference's bright green #03a143 (L 0.6190 / C 0.1758) is deliberately NOT in the
  // ramp: at L 0.62 neither white (4.06:1) nor ink (4.28:1) reaches AA on it -- it fails
  // AA in the reference's own palette, and no hue rotation can rescue a fixed L. Adopting
  // it as the CTA fill is exactly how a build ships a CTA nobody can read.
  referenceRamp: {
    primary: '#3f444b',
    primaryDeep: '#0c0d0e',
    accent: '#064d2a',
    accentDeep: '#27282a',
    neutral0: '#ffffff',
    neutral200: '#f2f6f9',
    neutral400: '#ccd6df',
    neutral600: '#696969',
    neutral900: '#27282a',
  },

  // EXEMPT from hue rotation (A-7). A randomly green error state is a bug.
  semantic: {
    error: '#b3261e',
    success: '#1e7a3c',
    warning: '#a15c00',
  },

  // The fg/bg combinations the SHELL ACTUALLY RENDERS. Kept synchronised with
  // app/globals.css by hand -- adding a pair nothing renders makes the gate stricter than
  // the site, and omitting one the site renders is how Atlas shipped an invisible CTA.
  // Any gradient band is declared as ONE gradient entry and scored on its worst sample;
  // flat-modelling a ramp is the defect this file exists to prevent.
  pairsInUse: [
    { name: 'body-on-surface',        fg: 'neutral900',   bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'muted-on-surface',       fg: 'neutral600',   bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'heading-on-surface',     fg: 'primaryDeep',  bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'eyebrow-on-surface',     fg: 'accent',       bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'link-on-surface',        fg: 'accent',       bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'body-on-alt',            fg: 'neutral900',   bg: 'neutral200',  min: 4.5, kind: 'text' },
    { name: 'heading-on-alt',         fg: 'primaryDeep',  bg: 'neutral200',  min: 4.5, kind: 'text' },
    // No muted-grey-on-alt pair exists on purpose: neutral600 on neutral200 is 4.28:1 in
    // the reference's OWN ramp, so no rotation can rescue it. On the alt band secondary
    // text is neutral900, never grey. globals.css enforces this.
    { name: 'body-on-dark',           fg: 'neutral0',     bg: 'primary',     min: 4.5, kind: 'text' },
    { name: 'muted-on-dark',          fg: 'neutral200',   bg: 'primary',     min: 4.5, kind: 'text' },
    { name: 'body-on-deep',           fg: 'neutral0',     bg: 'primaryDeep', min: 4.5, kind: 'text' },
    { name: 'muted-on-deep',          fg: 'neutral400',   bg: 'primaryDeep', min: 4.5, kind: 'text' },
    { name: 'footer-link-on-deep',    fg: 'neutral200',   bg: 'primaryDeep', min: 4.5, kind: 'text' },
    // The CTA band is a single ramp primary -> primaryDeep, not two flat fields.
    { name: 'band-text-on-gradient',  fg: 'neutral0',     bg: { gradient: ['primary', 'primaryDeep'] }, min: 4.5, kind: 'text' },
    { name: 'band-muted-on-gradient', fg: 'neutral200',   bg: { gradient: ['primary', 'primaryDeep'] }, min: 4.5, kind: 'text' },
    // The call-now CTA. Same fill in the header button, the hero, every band and the
    // mobile sticky call bar -- one token, gated once.
    { name: 'cta-label',              fg: 'neutral0',     bg: 'accent',      min: 4.5, kind: 'cta'  },
    { name: 'cta-label-hover',        fg: 'neutral0',     bg: 'accentDeep',  min: 4.5, kind: 'text' },
    // neutral900, not primaryDeep: the ghost label was lowered so the call CTA
    // leads on painted contrast among INTERACTIVE elements (rendertruth cta-primacy).
    // Kept in step with app/globals.css .u-btn--ghost by hand.
    { name: 'ghost-label-on-surface', fg: 'neutral900',   bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'ghost-edge-on-surface',  fg: 'borderStrong', bg: 'neutral0',    min: 3,   kind: 'ui'   },
    { name: 'ghost-label-on-dark',    fg: 'neutral0',     bg: 'primary',     min: 4.5, kind: 'text' },
    { name: 'ghost-edge-on-dark',     fg: 'neutral0',     bg: 'primary',     min: 3,   kind: 'ui'   },
    { name: 'input-edge-on-surface',  fg: 'borderStrong', bg: 'neutral0',    min: 3,   kind: 'ui'   },
    { name: 'input-edge-on-alt',      fg: 'borderStrong', bg: 'neutral200',  min: 3,   kind: 'ui'   },
    // Focus ring is two layers: a surface-coloured inner halo, then the dark ring. Both
    // layers gated, on the page, on the CTA fill and on the dark band.
    { name: 'focus-ring-on-page',     fg: 'focus',        bg: 'neutral0',    min: 3,   kind: 'focus' },
    { name: 'focus-ring-on-alt',      fg: 'focus',        bg: 'neutral200',  min: 3,   kind: 'focus' },
    { name: 'focus-halo-on-accent',   fg: 'neutral0',     bg: 'accent',      min: 3,   kind: 'focus' },
    { name: 'focus-halo-on-deep',     fg: 'neutral0',     bg: 'primaryDeep', min: 3,   kind: 'focus' },
    { name: 'error-on-surface',       fg: 'error',        bg: 'neutral0',    min: 4.5, kind: 'text' },
    { name: 'success-on-surface',     fg: 'success',      bg: 'neutral0',    min: 4.5, kind: 'text' },
  ],

  masterSeed: 7104,
  gradientSamples: 5,
};
