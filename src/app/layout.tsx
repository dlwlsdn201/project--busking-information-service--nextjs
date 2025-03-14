'use client';

import { Navigation } from '@shared/ui/navigation';
import ConfigProviders from './config/ConfigProviders';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';
import { PagePaddingLayout } from '@shared/ui/layout';
import { ThemeToggleButton } from '@shared/ui/common';

// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProviders>
          <div
            id="container"
            style={{
              position: 'relative',
              display: 'flex',
              flexFlow: 'row nowrap',
            }}
          >
            <Navigation />
            <PagePaddingLayout>{children}</PagePaddingLayout>
            <ThemeToggleButton />
          </div>
        </ConfigProviders>
      </body>
    </html>
  );
}
