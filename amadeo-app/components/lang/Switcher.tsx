import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function LangSwitcher() {
    const { locale, locales, defaultLocale }: any = useRouter();
    const router = useRouter();

    const [showLangMenu, setShowLangMenu] = useState(false);

    const switchLang = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const { pathname, asPath, query } = router;
        const target = event.target as HTMLSpanElement;
        const _locale: string = target.getAttribute('data-lang') || defaultLocale;
        router.push({ pathname, query }, asPath, { locale: _locale });
        setShowLangMenu(false);
    };

    return (
        <div className="relative">
            <div className="inline-block text-right dropdown">
                <button
                    className="btn-langs"
                    onClick={() => {
                        setShowLangMenu(!showLangMenu);
                    }}>
                    <span>{locale}</span>
                </button>
                {showLangMenu && (
                    <div className="lang-menu">
                        <div className="corner" />
                        <ul>
                            {locales.map((locale: string) => (
                                <li
                                    role="presentation"
                                    key={locale}
                                    data-lang={locale}
                                    onClick={switchLang}>
                                    {locale}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
