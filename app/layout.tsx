import type { Metadata } from 'next';
import './globals.css';

// SCAFFOLD (Prompt 1). The real shell — header, nav, drawer, footer, tokens, fonts,
// JSON-LD — lands in Prompt 5 and is lead-owned.
export const metadata: Metadata = {
  title: 'Ridge Garage Door Repair',
  description: 'Scaffold.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header data-shell="header" data-section="shell.header">
          <a href="#main">Skip to content</a>
        </header>
        <main id="main">{children}</main>
        <footer data-shell="footer" data-section="shell.footer">
          <p>Ridge Garage Door Repair</p>
        </footer>
      </body>
    </html>
  );
}
