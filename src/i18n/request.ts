import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Try to get locale from cookies, fallback to 'en'
  let locale = 'en';
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('locale');
    if (
      cookieLocale &&
      (cookieLocale.value === 'en' || cookieLocale.value === 'es')
    ) {
      locale = cookieLocale.value;
    }
  } catch {}

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
