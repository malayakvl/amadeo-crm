import { useRouter } from 'next/router';
import React from 'react';

export default function LangSwitcher() {
    const { locale, locales, defaultLocale }: any = useRouter();
    const router = useRouter();

    const switchLang = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const { pathname, asPath, query } = router;
        const target = event.target as HTMLSpanElement;
        const _locale: string = target.getAttribute('data-lang') || defaultLocale;
        router.push({ pathname, query }, asPath, { locale: _locale });
    };

    return (
        <div className="relative">
            <div className="inline-block text-right dropdown">
                <button className="btn-langs">
                    <span>{locale}</span>
                </button>
                <div className="lang-menu">
                    <div className="corner" />
                </div>
                <div
                    className="opacity-0 invisible dropdown-menu
                        transition-all duration-300 transform
                        origin-top-right -translate-y-2 scale-95">
                    <div
                        className="absolute right-0 w-56 mt-2
                        origin-top-right bg-white border border-gray-200
                        divide-y divide-gray-100 rounded-md
                        shadow-lg outline-none">
                        <div className="py-1">
                            {locales.map((locale: string) => (
                                <span
                                    role="presentation"
                                    key={locale}
                                    data-lang={locale}
                                    onClick={switchLang}
                                    className="cursor-pointer hover:bg-gray-50
                                    text-gray-700 flex justify-between w-full
                                    px-4 py-2 text-sm leading-5 text-left">
                                    {locale}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
