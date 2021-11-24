import { signIn } from "next-auth/client";

export default function ProviderBtns({ Providers, locale } : {Providers: any, locale: string}) {
    return (
        <div className="flex flex-row gap-2">
            {Object.values(Providers).map((provider:any) => {
                if (provider.name != 'Credentials') {
                    return (
                        <button
                            key={provider.name}
                            className={provider.name === 'Facebook' ? 'Facebook' : 'Google'}
                            onClick={() => signIn(provider.id, {
                                callbackUrl: `${window.location.origin}${locale === 'fr' ? '' : `/${locale}`}/dashboard`
                            })}
                        >
                            {provider.name}
                        </button>
                    );
                } else {
                    return
                }
            })}
        </div>
    )
}
