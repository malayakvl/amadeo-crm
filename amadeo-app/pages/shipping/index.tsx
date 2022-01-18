import { useTranslations } from "next-intl";
import List from './List'

export default function Shipping() {
    const t = useTranslations();
    return (
        <>
            <div className="page-title">
                <h1>{t('Shipping')}</h1>

            </div>
            <div className="block-white-8 mr-10 mt-10">
                <div className="tabs-content">
                    <div className={`w-full`}>
                        <List locale={'en'} />
                    </div>
                </div>
            </div>
        </>

    )
}