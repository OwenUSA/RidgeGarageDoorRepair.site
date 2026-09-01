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

  // Set when the palette is generated (merged prompt 5+9). Each site MUST land on a
  // different palette: Atlas is plum/crimson (seed 500656), Forge a green/dark ramp
  // (seed 1005). Re-roll on a hue collision -- these sites must look independently built.
  masterSeed: 3104,
  gradientSamples: 5,
};
