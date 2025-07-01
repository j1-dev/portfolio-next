import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import './globals.css';

const helveticaNeue = localFont({
  src: [
    {
      path: '../../public/font/HelveticaNeueMedium.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/HelveticaNeueBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/font/HelveticaNeueMediumItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/font/HelveticaNeueBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
  ],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${helveticaNeue.className}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
