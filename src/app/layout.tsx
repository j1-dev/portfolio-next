import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import './globals.css';

const helveticaNeue = localFont({
  src: [
    // {
    //   path: '../../public/font/HelveticaNeueMedium.otf',
    //   weight: '400',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/font/HelveticaNeueBold.otf',
    //   weight: '600',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/font/HelveticaNeueMediumItalic.otf',
    //   weight: '400',
    //   style: 'italic',
    // },
    // {
    //   path: '../../public/font/HelveticaNeueBoldItalic.otf',
    //   weight: '600',
    //   style: 'italic',
    // },
    {
      path: '../../public/font/DMMono/DMMono-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/font/DMMono/DMMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/DMMono/DMMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/font/DMMono/DMMono-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/font/DMMono/DMMono-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/font/DMMono/DMMono-MediumItalic.ttf',
      weight: '500',
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
