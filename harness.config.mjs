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
  masterSeed: 3104,
  gradientSamples: 5,
};
