import Link from "next/link"
import {useTranslations} from "next-intl";

export default function Custom404() {
    const t = useTranslations();
    return (
        <div
            className="flex items-center justify-center
                min-h-screen bg-indigo-500
                bg-fixed bg-cover bg-bottom error-bg"
        >
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
                        <div className="relative ">
                            <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                                <span>4</span><span>0</span><span>4</span>
                            </h1>
                        </div>
                        <h5 className="mt-2 mb-3 font-semibold mr-10">{t('Page not found')}</h5>
                        <h3 className="text-gray-100 mt-10 mb-6">
                            {t('we are sorry, but the page you requested was not found')}
                        </h3>
                        <Link href="/">
                            <a
                                className="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
                                {t('Go to Home')}
                            </a>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps = ({ locale }) => {
    return {
        props: {
            messages: {
                ...require(`../messages/shared/${locale}.json`),
            },
        },
    }
}
