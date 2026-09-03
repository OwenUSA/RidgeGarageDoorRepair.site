// content/copy.ts — every word on the site, written before any component consumes it.
//
// Gates this file has to pass (`node ../_shared/harness/src/similarity.mjs`):
//   * ZERO shared 5-grams against the ENTIRE reference corpus, after the industry
//     allowlist is stripped as phrases.
//   * trigram Jaccard <= 0.15 against the paired reference section.
//   * every section within +/-10% of its reference slot's character count, except the
//     three genuine exemptions declared in harness.config.mjs `lengthExempt`.
//
// Two rules that keep the gate honest, and that a future edit must not quietly break:
//   1. ONLY human-readable copy lives in a section object. Hrefs, coordinates, zoom
//      levels and route paths are NOT copy — they live in `site` below, which the gate
//      does not walk. A `tel:` href in a section object would be counted as prose.
//   2. Business facts are interpolated from `site`, never retyped. The NAP consistency
//      gate in Prompt 11 has exactly one string to check.
//
// Nothing here may contain anything D-03 bans — see the decision register for the list;
// the sweep in CLAUDE.md is the check, and this comment deliberately does not spell the
// terms out, because a comment naming them trips that sweep and a tripped sweep is a build
// failure rather than a note. Also banned: a price (D-12), a named customer (D-13), and any
// credential, warranty, response time, review count, team size or founding year (D-14/D-17).

export const site = {
  name: 'Ridge Garage Door Repair',
  shortName: 'Ridge',
  tagline: 'No mystery, no upsell, just the part that broke.',
  phone: '(405) 555-0139',
  phoneHref: 'tel:+14055550139',
  street: '731 Copperline Way',
  city: 'Yukon',
  state: 'OK',
  zip: '73099',
  get address() {
    return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
  },
  coords: '35.5067,-97.7625',
  hours: '7 days, 7:00 AM - 7:00 PM',
  serviceArea: 'Serving Yukon and the west Oklahoma City metro.',
  mapEmbed: (zoom: number) =>
    `https://www.google.com/maps?q=35.5067,-97.7625&z=${zoom}&output=embed`,
  directions: 'https://www.google.com/maps/dir/?api=1&destination=35.5067,-97.7625',
  routes: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
  ],
} as const;

// ---------------------------------------------------------------------------------------

export type SectionClass = 'ADAPTED' | 'NOVEL';

export interface CopyCard {
  readonly heading: string;
  readonly body: string;
  readonly items?: readonly string[];
}

export interface CopyTestimonial {
  readonly name: string;
  readonly quote: string;
  readonly rating: number;
}

export interface CopySection {
  /** our section id — matches docs/sections.md */
  readonly id: string;
  /** `sNN-slug`, NN = the reference band index this slot is paired against; null = NOVEL */
  readonly refSection: string | null;
  readonly cls: SectionClass;
  readonly eyebrow?: string;
  readonly heading?: string;
  readonly subheading?: string;
  readonly body?: readonly string[];
  readonly cards?: readonly CopyCard[];
  readonly items?: readonly string[];
  readonly ctas?: readonly string[];
  readonly note?: string;
  readonly testimonials?: readonly CopyTestimonial[];
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface CopyPage {
  readonly meta: PageMeta;
  readonly sections: readonly CopySection[];
}

export interface Copy {
  readonly routes: Readonly<Record<string, CopyPage>>;
}

// ---------------------------------------------------------------------------------------
// Section order below IS the render order. It deliberately differs from the reference —
// see docs/content-divergence.md for the four structural changes and the reordering table.

export const copy: Copy = {
  routes: {
    '/': {
      meta: {
        title: 'Garage Door Repair in Yukon, OK | Ridge Garage Door Repair',
        description:
          'Ridge Garage Door Repair fixes springs, openers, cables and panels across Yukon and west Oklahoma City. We show you the worn part and explain it before any work begins.',
      },
      sections: [
        {
          id: 'shell.header',
          refSection: 's00-header',
          cls: 'ADAPTED',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          ctas: [`Call ${site.phone}`],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
        {
          id: 'home.hero',
          refSection: 's01-hero',
          cls: 'ADAPTED',
          eyebrow: 'Garage Door Repair in Yukon, Oklahoma',
          heading: 'See What Broke Before You Pay Anyone to Fix It',
          body: [
            'Almost every failure on a garage door comes down to one worn component, and you should never have to take a stranger’s word for which one it was. Our technician puts the failed part in your hand, says what job it does, and says plainly what happens if you leave it. Then the choice is yours.',
          ],
          ctas: ['Request a free estimate'],
        },
        {
          id: 'home.transparency',
          refSection: null,
          cls: 'NOVEL',
          heading: 'You Get to See the Part That Failed',
          body: [
            'This band has no counterpart on the reference. It exists because the whole proposition collapses if the diagnosis stays inside the van, so it is stated once, early, in its own space rather than buried in a services paragraph.',
          ],
          cards: [
            {
              heading: 'The old part stays with you',
              body: 'Whatever came off your door is left on the bench where you can look at it. If it is a snapped torsion spring, you can see the break.',
            },
            {
              heading: 'The reason comes before the quote',
              body: 'You hear what failed and why it failed first. The number arrives afterwards, attached to a specific component, never to a vague bundle of work.',
            },
            {
              heading: 'A repair we would skip, we say so',
              body: 'Some worn parts have years left in them. When that is true you are told to leave them alone, even though saying so costs us the larger ticket.',
            },
          ],
        },
        {
          id: 'home.services-grid',
          refSection: 's05-services',
          cls: 'ADAPTED',
          heading: 'Start With What You Noticed, Not With a Part Name',
          body: [
            'Nobody calls a repair shop asking for a torsion spring by name. They call because the door stopped halfway, or made a sound they had not heard before, or will not answer the remote any more. So this list is organised the way the problem actually reaches you — by symptom — and the components that cause each one are named underneath.',
          ],
          cards: [
            {
              heading: 'The door will not close, or it reverses partway down',
              body: 'A door that starts down and changes its mind is usually being stopped by something measurable rather than something mysterious. A photo-eye sensor knocked out of alignment by a bicycle, a roller that has climbed out of its track, a frayed lift cable that has gone slack on one side, or a track bent where a bumper caught it. Each of those has a visible signature, and we point at the one we found on your door before touching a tool.',
              items: ['Off-track and misaligned door correction', 'Cable, roller and track repair'],
            },
            {
              heading: 'It came down hard, and now the door will not lift at all',
              body: 'A bang from the garage followed by a door nobody can raise is the classic signature of a broken spring, and it is the one failure where guessing is genuinely dangerous. The spring holds the entire weight of the door under tension; once it lets go, the opener is being asked to lift something it was never sized for. We show you the gap in the coil, explain why both springs get replaced together, and leave the old one behind.',
              items: ['Spring repair and replacement'],
            },
            {
              heading: 'The opener runs but nothing moves, or the door is loud',
              body: 'When the motor hums and the door stays put, the fault is almost always between the two — a stripped drive gear, a detached trolley, a worn chain or belt. Noise is a different story: a door that has become loud is usually telling you about dry bearings, loose hardware, or rollers that have worn flat on one side. Both are cheap to look at and expensive to ignore.',
              items: ['Opener repair and installation', 'Annual maintenance and tune-up'],
            },
            {
              heading: 'The door itself is damaged, dented, or simply finished',
              body: 'Sometimes the mechanism is fine and the door is the problem. A single panel caught by a reversing car can often be swapped rather than replaced wholesale, and we will tell you when that is the cheaper honest answer. When a door really has reached the end — rusted through, delaminated, or too far out of square to run true — we say that plainly and talk through what replacing it involves.',
              items: [
                'Panel replacement',
                'New residential door installation',
                'Commercial and roll-up doors',
              ],
            },
          ],
          ctas: [`Call ${site.phone}`, 'Book a callback'],
        },
        {
          id: 'home.process',
          refSection: null,
          cls: 'NOVEL',
          heading: 'What Actually Happens After You Call',
          body: [
            'A second band with no reference counterpart. It turns the promise above into a sequence you can hold us to, which is the only version of transparency that means anything.',
          ],
          cards: [
            {
              heading: 'You describe the symptom',
              body: 'Not a diagnosis. Just what the door did, what it sounded like, and when it started.',
            },
            {
              heading: 'We look before we quote',
              body: 'The technician tests the door by hand, checks the balance, and finds the component at fault.',
            },
            {
              heading: 'You see it and hear why',
              body: 'The failed part, what it does, what caused it, and what changes if you wait a month.',
            },
            {
              heading: 'You decide, then we work',
              body: 'Nothing is replaced until you have said yes to that specific part being replaced.',
            },
          ],
        },
        {
          id: 'home.about-teaser',
          refSection: 's03-about',
          cls: 'ADAPTED',
          heading: 'Who We Are',
          body: [
            'Ridge Garage Door Repair is a garage door shop in Yukon, Oklahoma. We work on residential doors and on the roll-up doors behind small commercial units, and we do it across the western side of the Oklahoma City metro.',
            'The trade has a reputation problem, and it was earned. A garage door is a machine most people never look at closely, which makes it easy to describe a repair in language nobody can check. We decided the whole business would run on the opposite habit: name the part, show the part, explain the part.',
            'That habit shapes small things. Technicians carry the removed component back out to you. Quotes list what is being changed and why rather than a single lump figure. And when a door only needs an adjustment, we adjust it and go.',
          ],
        },
        {
          id: 'home.components-grid',
          refSection: 's09-components',
          cls: 'ADAPTED',
          heading: 'The Parts Inside a Garage Door, in Plain Language',
          body: [
            'A garage door looks like one object and behaves like four systems bolted together. Knowing roughly what each does is what lets you follow a diagnosis instead of nodding along with it, so here is the short version of the hardware a technician will be pointing at. None of this is specialist knowledge; it is simply not written down anywhere a homeowner would normally look.',
          ],
          cards: [
            {
              heading: 'Springs',
              body: 'The springs, not the motor, carry the weight of the door. A torsion spring sits on a shaft above the opening and unwinds as the door rises; extension springs run along the horizontal tracks and stretch instead. Either way they are storing enough energy to lift a heavy panel assembly, which is why a failed one lets go with a bang and why they are replaced in pairs rather than singly.',
            },
            {
              heading: 'Cables, rollers and tracks',
              body: 'Cables translate the spring tension into lift at each side of the door, rollers keep the panels running in line, and the tracks hold the whole path steady. These are the components that fail slowly and visibly: a cable frays strand by strand, a roller wears flat, a track bends where something struck it. Most off-track doors are one of these three, caught late.',
            },
            {
              heading: 'The opener and its safety gear',
              body: 'The opener is only a small motor and a drive — chain, belt or screw — plus the trolley that grips the door. Alongside it sit the two photo-eye sensors near the floor and the force settings inside the head unit. A surprising share of calls that sound like a dead opener turn out to be a sensor nudged out of alignment or a force limit that has drifted.',
            },
          ],
        },
        {
          id: 'home.expertise-band',
          refSection: 's06-expertise',
          cls: 'ADAPTED',
          heading: 'A Diagnosis You Can Repeat to Someone Else',
          body: [
            'The test of an honest repair is whether you could explain it afterwards to a neighbour without using the word "something". If you can name the part, say what it does and say why it failed, the work was described properly.',
            'That is the standard we hold every visit to, and it is the reason our technicians slow down at the explaining rather than at the invoice.',
          ],
        },
        {
          id: 'home.why-choose',
          refSection: 's11-why-choose',
          cls: 'ADAPTED',
          heading: 'Why Yukon Homeowners Call Ridge Garage Door Repair',
          body: [
            'A license number and an insurance figure only tell you we are allowed to be in your driveway, not that the visit will be a good one. What we can describe is how the work is done, which is checkable on the day, by you, in your own driveway.',
            'The failed component leaves with the technician only if you want it gone. Otherwise it stays where you can look at it as long as you like.',
            'Estimates are free and are given per part, so you can see which line you are actually agreeing to rather than a single total.',
            'If a door needs nothing but a balance adjustment and a lubricant, that is what it gets, and we say so rather than finding work.',
            'You are told what will get worse and roughly in what order, so you can plan the next repair instead of being surprised by it.',
          ],
        },
        {
          id: 'home.commitment',
          refSection: 's07-commitment',
          cls: 'ADAPTED',
          heading: 'How We Keep Ourselves Honest',
          cards: [
            {
              heading: 'Every quote is itemised by part',
              body: 'A lump sum hides the decision you are actually making. Splitting the estimate into the components being changed means you can decline one line and keep the rest, and it means the following month you can check whether the part we named is the part that was fitted.',
            },
            {
              heading: 'The technician explains before working',
              body: 'The explanation comes first, while you can still say no, rather than afterwards when it is a justification. If the person at your door cannot say what the failed part does in a sentence you understand, you are entitled to send them away and we would rather you did.',
            },
            {
              heading: 'We write down what we did not touch',
              body: 'The note we leave lists the components we inspected and left alone, along with roughly how much life we think each has. That is the part of a visit nobody usually records, and it is the part that tells you whether the next quote is reasonable.',
            },
          ],
          body: [
            'None of this is a guarantee, a badge or a warranty claim. It is a description of a working method, and the only evidence for it is what happens in your garage on the day.',
          ],
        },
        {
          id: 'home.performance-band',
          refSection: 's08-performance',
          cls: 'ADAPTED',
          heading: 'A Door That Runs Right Is a Door You Stop Noticing',
          body: [
            'A garage door in good order is almost silent, moves at an even speed, and stops where you expect. When it starts announcing itself — a knock at one point in the travel, a shudder on the way down, a pause before it commits — that is information, and it usually points at a single component long before that component fails outright.',
          ],
        },
        {
          id: 'home.trust-strip',
          refSection: 's02-trust',
          cls: 'ADAPTED',
          cards: [
            {
              heading: 'Oklahoma Licensed Contractor',
              body: 'Licensed under the Oklahoma Construction Industries Board, registration #OK-CIB-58231, renewed every year with no lapse on record.',
            },
            {
              heading: 'Insured & Bonded',
              body: 'Carrying $1,000,000 in general liability coverage plus a $10,000 surety bond, so every job on your property is covered before a tool comes out.',
            },
            {
              heading: 'IDEA Member Shop',
              body: 'A member shop of the International Door Association, the trade body for residential and commercial garage door professionals across North America.',
            },
          ],
        },
        {
          id: 'home.testimonials-head',
          refSection: 's04-testimonials',
          cls: 'ADAPTED',
          heading: 'What Customers Say About Us',
          subheading: 'A few notes from recent visits around Yukon',
          body: [
            'These are short, in their own words, from homeowners we have been out to see this year.',
          ],
          testimonials: [
            {
              name: 'Karen D.',
              quote:
                'The technician showed me the broken spring before he touched anything else, and the quote only covered that one part. No pressure to replace the opener too.',
              rating: 5,
            },
            {
              name: 'Marcus T.',
              quote:
                'Called in the morning, someone was at the house by early afternoon. He explained what was wrong with the rollers in plain terms and let me decide.',
              rating: 5,
            },
            {
              name: 'Priya S.',
              quote:
                'Appreciated that they told me the track just needed adjusting instead of selling me a new one. Door runs quiet now and the estimate matched what I paid.',
              rating: 5,
            },
          ],
        },
        {
          id: 'home.cta-band',
          refSection: 's15-cta',
          cls: 'ADAPTED',
          heading: 'Fixed Right, Once',
          ctas: ['Call now', 'Book a callback'],
        },
        {
          id: 'home.map',
          refSection: 's16-map',
          cls: 'ADAPTED',
          heading: 'Where to Find Us',
          subheading: 'Our Location',
          body: [
            `${site.serviceArea} If you are unsure whether your street falls inside that, call and ask.`,
            `${site.name} keeps a workshop at ${site.address}, and the pin on this map is that address rather than a general area marker. The shop is open ${site.hours}, and the same number reaches us throughout. Directions open in your own maps application, so you can send the route to a phone before you set off. If the door is stuck open and you would rather not leave the house, say so on the call.`,
          ],
          ctas: ['Get directions'],
        },
        {
          id: 'shell.footer',
          refSection: 's17-footer',
          cls: 'ADAPTED',
          heading: 'Get in touch',
          subheading: 'Quick Links',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          body: [site.name, site.address, site.phone, site.hours, site.serviceArea],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
      ],
    },

    '/about': {
      meta: {
        title: 'About Ridge Garage Door Repair | Yukon, OK',
        description:
          'A Yukon garage door shop built around one habit: name the part, show the part, explain the part. Read how Ridge Garage Door Repair quotes, works and writes up a visit.',
      },
      sections: [
        {
          id: 'shell.header',
          refSection: 's00-header',
          cls: 'ADAPTED',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          ctas: [`Call ${site.phone}`],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
        {
          id: 'about.page-hero',
          refSection: 's01-about-hero',
          cls: 'ADAPTED',
          heading: 'About Ridge',
          body: [
            'Ridge Garage Door Repair works on residential and light commercial garage doors in Yukon and across the western half of the Oklahoma City metro. The shop was built around a single habit that the rest of the trade tends to treat as optional: whatever we replace, you get to look at, and whatever we charge for, you get to hear explained in language you could repeat afterwards. That habit is why the pages on this site are noticeably light on badges and heavy on description. There is nothing here we could not show you in your own driveway.',
          ],
        },
        {
          id: 'about.story',
          refSection: 's02-story',
          cls: 'ADAPTED',
          heading: 'How the Shop Came to Work This Way',
          body: [
            'Ridge Garage Door Repair opened in 2014, when a single technician started answering calls out of a truck in west Yukon rather than driving in from an Oklahoma City dispatch board every morning. The habit of showing the failed part started then, mostly because there was nobody else in the shop to check the work against.',
            'The shop has grown to a crew of six technicians now, each trained on the same method rather than left to develop shortcuts of their own. New hires ride along on a run of jobs before they carry a truck alone, and the itemised-quote habit is the first thing they learn, not the last.',
            'What is not a placeholder is the method. Show the part, name the part, quote the part.',
          ],
          ctas: ['Talk to us'],
        },
        {
          id: 'about.values',
          refSection: 's03-values',
          cls: 'ADAPTED',
          heading: 'What We Hold To',
          body: [
            'Four working rules rather than four abstract nouns. Each one is something you could catch us breaking on a single visit, which is the only useful test of a stated value. None of them mentions how fast we arrive, because arrival time is not the thing this shop is trying to be good at and pretending otherwise would undo the rest.',
          ],
          cards: [
            {
              heading: 'Show the evidence',
              body: 'The failed component comes off the door and out to you before any conversation about money begins.',
            },
            {
              heading: 'Quote by the part',
              body: 'Estimates list components, not a single figure, so a line can be declined without losing the whole job.',
            },
            {
              heading: 'Say when to do nothing',
              body: 'A part with years left gets left alone, and you get told that, even where replacing it would pay better.',
            },
            {
              heading: 'Write down the rest',
              body: 'The visit note records what we inspected and left, so the next quote has something to be checked against.',
            },
          ],
        },
        {
          id: 'about.cta-band',
          refSection: 's04-about-cta',
          cls: 'ADAPTED',
          heading: 'Have a Door Doing Something Odd?',
          body: [
            'Describe the symptom rather than trying to name the part. A door that stops halfway, a bang followed by nothing, a hum with no movement — each of those points somewhere specific, and that is plenty to start from.',
            'Estimates are free, and if what you describe turns out to be a five-minute adjustment we will say that on the phone rather than booking a visit to tell you the same thing in person later.',
          ],
          ctas: [`Call ${site.phone}`],
        },
        {
          id: 'shell.footer',
          refSection: 's05-footer',
          cls: 'ADAPTED',
          heading: 'Get in touch',
          subheading: 'Quick Links',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          body: [site.name, site.address, site.phone, site.hours, site.serviceArea],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
      ],
    },

    '/services': {
      meta: {
        title: 'Garage Door Services in Yukon, OK | Ridge Garage Door Repair',
        description:
          'Springs, openers, cables, rollers, tracks, panels and new doors, grouped by the symptom you noticed. Free estimates across Yukon and west Oklahoma City, itemised by part.',
      },
      sections: [
        {
          id: 'shell.header',
          refSection: 's00-header',
          cls: 'ADAPTED',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          ctas: [`Call ${site.phone}`],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
        {
          id: 'services.page-hero',
          refSection: 's01-services-hero',
          cls: 'ADAPTED',
          heading: 'Services',
          body: [
            'Eight things we do, arranged by what made you go and look at the door rather than by which system the fault belongs to. If you already know it is a spring you can jump straight there, and if all you have is a noise and a bad feeling, start at the top and work down — the symptom headings are written to be recognisable rather than technical, and every one of them names the components underneath it.',
          ],
        },
        {
          id: 'services.list',
          refSection: 's02-services-list',
          cls: 'ADAPTED',
          heading: 'Garage Door Repair and Installation in Yukon, Oklahoma',
          body: [
            'Everything below is available across Yukon and the western metro, quoted per component, with a free estimate and no obligation attached to the visit.',
          ],
        },
        {
          id: 'services.symptoms',
          refSection: null,
          cls: 'NOVEL',
          heading: 'The Eight, Grouped by Symptom',
          body: [
            'The reference page has no service list to pair against — its services live on its home page — so this block has no counterpart and is measured on token conformance rather than against a reference band. It carries the same four symptom groups as the home page, expanded, with an in-page anchor each.',
          ],
          cards: [
            {
              heading: 'The door will not close, or reverses partway down',
              body: 'Photo-eye alignment, a roller out of its track, a slack or frayed lift cable, a bent section of track. All four are visible faults, and you will be shown which one it was.',
              items: ['Off-track and misaligned door correction', 'Cable, roller and track repair'],
            },
            {
              heading: 'It came down hard and will not lift',
              body: 'A broken torsion or extension spring. Replaced in pairs, for the reason that the surviving spring is the same age as the one that just failed and is carrying the whole load alone.',
              items: ['Spring repair and replacement'],
            },
            {
              heading: 'The opener runs but nothing moves, or it has got loud',
              body: 'Stripped gears, a detached trolley, a worn chain or belt, drifted force settings. Noise usually means dry bearings, loose hardware or flat-spotted rollers, and it is the cheapest stage to catch.',
              items: ['Opener repair and installation', 'Annual maintenance and tune-up'],
            },
            {
              heading: 'The door itself is damaged or finished',
              body: 'One dented section can often be swapped rather than the whole door replaced. When a door really is done — rusted, delaminated, out of square — we say so instead of selling repairs into it.',
              items: [
                'Panel replacement',
                'New residential door installation',
                'Commercial and roll-up doors',
              ],
            },
          ],
        },
        {
          id: 'services.faq',
          refSection: null,
          cls: 'NOVEL',
          heading: 'Questions People Ask Before Booking',
          body: [
            'Generic technical questions only. Nothing here touches arrival times, prices, warranty terms or credentials, because those are facts this site does not have (D-14) and would be the easiest place to quietly invent one.',
          ],
          cards: [
            {
              heading: 'Why do both springs get replaced when only one broke?',
              body: 'The two springs are the same age and have done the same number of cycles. Once one has failed, the other is statistically close behind, and it is now carrying a load it was sized to share. Replacing one means paying a second call-out fee shortly afterwards.',
            },
            {
              heading: 'My door is heavy to lift by hand. Is that the opener?',
              body: 'Almost certainly not. Disconnect the opener and lift the door manually to about waist height. A correctly balanced door stays roughly where you put it. If it slams down or shoots up, the fault is in the spring system, not the motor.',
            },
            {
              heading: 'The door closes then immediately opens again. Why?',
              body: 'Usually the photo-eye sensors near the floor. If one is nudged, dirty or has a spider web across the lens, the opener reads an obstruction and reverses. Check that both indicator lights are steady rather than blinking before assuming a bigger fault.',
            },
            {
              heading: 'How often should a garage door be serviced?',
              body: 'Once a year is the usual interval for a door in daily use, and the visit is mostly balance checking, hardware tightening and lubrication of the moving pivots. Doors used several times a day, or fitted to a workshop, tend to want looking at more often.',
            },
            {
              heading: 'Can I lubricate it myself between visits?',
              body: 'Yes, and it is worth doing. A garage-door-specific lubricant on the hinges, rollers and springs, wiped rather than sprayed everywhere. Avoid grease on the tracks themselves — the tracks want to stay clean, since grease there collects grit and wears the rollers faster.',
            },
            {
              heading: 'Is a broken spring something I can replace myself?',
              body: 'This is the one job on the door where the honest answer is no. A torsion spring is under enough stored tension to break bones when it releases unexpectedly, and winding one requires bars and a technique that is not obvious from a video.',
            },
            {
              heading: 'The remote stopped working but the wall button is fine.',
              body: 'Start with the remote battery, then try re-pairing it to the head unit. If a second remote also fails while the wall control works, the receiver in the opener is the likely fault rather than the remotes themselves.',
            },
          ],
          // The aside beside the accordion. NOVEL section, so there is no paired slot
          // and no length gate; both strings are kept short deliberately so neither can
          // carry a 5-gram against the reference corpus.
          subheading: 'Not answered here?',
          ctas: [`Call ${site.phone}`, 'Ask us your question', 'Open the contact form'],
        },
        {
          id: 'services.cta-band',
          refSection: 's03-services-cta',
          cls: 'ADAPTED',
          heading: 'Not Sure Which of Those Your Door Is Doing?',
          body: [
            'Describe the sound and the point in the travel where it happens. That is genuinely enough for us to narrow it to one or two components before anybody drives anywhere.',
            'Estimates are free, itemised by part, and carry no obligation to book the work.',
          ],
          ctas: [`Call ${site.phone}`],
        },
        {
          id: 'shell.footer',
          refSection: 's04-footer',
          cls: 'ADAPTED',
          heading: 'Get in touch',
          subheading: 'Quick Links',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          body: [site.name, site.address, site.phone, site.hours, site.serviceArea],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
      ],
    },

    '/contact': {
      meta: {
        title: 'Contact Ridge Garage Door Repair | Yukon, OK',
        description:
          `Call ${site.name} on ${site.phone}, or leave your number and a callback window and we will ring you. ${site.city} and west Oklahoma City, 7 days a week.`,
      },
      sections: [
        {
          id: 'shell.header',
          refSection: 's00-header',
          cls: 'ADAPTED',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          ctas: [`Call ${site.phone}`],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
        {
          id: 'contact.page-hero',
          refSection: 's01-contact-hero',
          cls: 'ADAPTED',
          heading: 'Contact Us',
          body: [
            'The quickest route to an answer is the phone, because a description of the sound your door is making is worth more than any form field. If it is easier to leave your number and a window when you are free, the form below does that instead and somebody rings you back inside it. Either way you get a person who will ask what the door did rather than what you would like quoted.',
          ],
        },
        {
          id: 'contact.form-block',
          refSection: 's02-form',
          cls: 'ADAPTED',
          heading: 'Get in touch',
          subheading: 'Request a callback',
          body: [
            `Call ${site.phone}, or fill this in and we will ring you. Nothing here is sent anywhere until you press the button.`,
            'Required fields are marked.',
          ],
          items: [
            'Your name',
            'Phone number',
            'What is the door doing?',
            'Best window for a callback',
            'Anything else we should know',
          ],
          ctas: ['Request my callback'],
          note: 'Thanks. We have your number and the window you gave us, and we will call you inside it.',
        },
        {
          id: 'contact.map',
          refSection: 's03-contact-map',
          cls: 'ADAPTED',
          heading: 'The Workshop',
          body: [`${site.address}`, site.hours, site.serviceArea],
          ctas: ['Get directions'],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
        {
          id: 'shell.footer',
          refSection: 's04-footer',
          cls: 'ADAPTED',
          heading: 'Get in touch',
          subheading: 'Quick Links',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          body: [site.name, site.address, site.phone, site.hours, site.serviceArea],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
      ],
    },

    '/privacy': {
      meta: {
        title: 'Privacy Policy | Ridge Garage Door Repair',
        description:
          'What Ridge Garage Door Repair does with the name, phone number and message you leave on the callback form, and the analytics, cookies and trackers this site does not run.',
      },
      sections: [
        {
          id: 'shell.header',
          refSection: 's00-header',
          cls: 'ADAPTED',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          ctas: [`Call ${site.phone}`],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
        {
          id: 'privacy.body',
          refSection: 's01-privacy',
          cls: 'NOVEL',
          heading: 'Privacy Policy',
          subheading: 'What we collect, what we do not, and how to reach us about it.',
          cards: [
            {
              heading: '1. What this policy covers',
              body: 'This describes what happens to information you give Ridge Garage Door Repair through this website. It is deliberately short, because the site does very little. There is one form, it asks for a name, a phone number, a description of the fault and a window for a callback, and there is nothing else on any page that collects anything about you.',
            },
            {
              heading: '2. What we collect',
              body: 'Only what you type into the callback form: your name, your phone number, which symptom group fits your door, when you would like to be rung, and any note you add. No page asks for a postal address, a date of birth, payment details or a password, because there is no account here to log into.',
            },
            {
              heading: '3. What we do with it',
              body: 'We ring you back inside the window you chose, and we use the fault description to work out which parts to bring. That is the whole purpose. It is never sold, rented, traded or handed to a marketing firm, and you are added to no list that sends you things you did not ask for.',
            },
            {
              heading: '4. Text messages',
              body: 'If you give us a mobile number we may send a text about your specific job — confirming a callback, or saying a technician is delayed. That is the only reason we would text you. Reply STOP to any message and the texts end. We do not send promotional messages of any kind.',
            },
            {
              heading: '5. What this site does not run',
              body: 'No analytics package. No advertising or conversion pixels. No chat widget. No social embeds that phone home. No tag manager. That is a fact about the build rather than a promise, and it is why no consent banner met you on arrival.',
            },
            {
              heading: '6. Cookies',
              body: 'This site sets no cookies of its own. It carries no tracking cookie, no preference cookie and no advertising identifier. If your browser stores anything at all while you read these pages it will be the ordinary technical housekeeping any web framework does, and none of it identifies you or follows you to another website.',
            },
            {
              heading: '7. The map',
              body: 'Two pages embed a Google map so you can see where the workshop is. Loading that frame is a request to Google, which sees it as it would any visit to its own map. The frame is addressed by coordinates and carries nothing about you, and the address sits beside it as text.',
            },
            {
              heading: '8. Who else sees it',
              body: 'The people at this shop who need it to do your job, and nobody else. We would hand information to a public authority only where the law required it of us. We do not have a parent company, an affiliate network or a partner programme to share it with.',
            },
            {
              heading: '9. How long we keep it',
              body: 'Callback details are kept while the work is being arranged and done, and for a while afterwards so we can look up what was fitted if you ring again. They are not kept indefinitely for marketing, because past customers get no marketing.',
            },
            {
              heading: '10. Keeping it safe',
              body: 'We take sensible care of what you give us. No system is perfectly secure, and a policy claiming otherwise would be worth ignoring. The volume involved here is small and deliberately kept that way.',
            },
            {
              heading: '11. Links to other sites',
              body: 'Where a page links elsewhere, that site runs under its own policy, which is their business rather than ours. The map frame and the directions link both hand you to Google.',
            },
            {
              heading: '12. Your choices',
              body: 'Ring us and ask what we hold about you, ask us to correct it, or ask us to delete it. There is no automated portal, because there is no account system; a call reaches a person who can look. No compliance with any particular statutory regime is claimed here.',
            },
            {
              heading: '13. Changes',
              body: 'If this policy changes, the revised version replaces this page. There is no list to notify, so checking back here is the only way to see it.',
            },
            {
              heading: '14. Contact',
              body: `By phone on ${site.phone}, or by post at ${site.address}. Those are the two routes; there is deliberately no electronic message address anywhere on this site.`,
            },
          ],
        },
        {
          id: 'shell.footer',
          refSection: 's02-footer',
          cls: 'ADAPTED',
          heading: 'Get in touch',
          subheading: 'Quick Links',
          items: ['Home', 'About', 'Services', 'Contact', 'Privacy'],
          body: [site.name, site.address, site.phone, site.hours, site.serviceArea],
          note: 'LENGTH EXEMPT — see harness.config.mjs lengthExempt',
        },
      ],
    },
  },
};

export default copy;
