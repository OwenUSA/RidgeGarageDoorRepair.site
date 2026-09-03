import type { Metadata } from 'next';
import { Inter, Mulish } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CallBar from '@/components/CallBar';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';
import { business } from '@/lib/business';
import { copy } from '@/content/copy';

// Mulish (display) and Inter (body) are the reference's OWN faces. Both are real -- 4
// loaded @font-face rules each in the Prompt 1 capture -- and both are SIL OFL, so
// next/font self-hosts them here. F-01/F-11: there is NO substitution floor and heading
// metrics are expected to converge. Outfit is a phantom on the reference (27 declared
// faces, 0 loaded, 0 usages) and is deliberately NOT imported.
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mulish',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: copy.routes['/'].meta.title,
  description: copy.routes['/'].meta.description,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: copy.routes['/'].meta.title,
    description: copy.routes['/'].meta.description,
    url: business.url,
    siteName: business.name,
    type: 'website',
    images: [{ url: '/placeholders/home.hero.art.svg', width: 577, height: 607, alt: business.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.routes['/'].meta.title,
    description: copy.routes['/'].meta.description,
    images: ['/placeholders/home.hero.art.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mulish.variable} ${inter.variable}`}>
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
        <CallBar />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
