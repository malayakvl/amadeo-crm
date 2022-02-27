import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Totals: React.FC<{ totals: Dashboard.Totals }> = ({ totals }) => {
    const t = useTranslations();

    return (
        <>
            <div className="flex flex-col w-full lg:w-1/4 xl:w-1/5 justify-center align-middle">
                <span className="font-bold text-sm text-blue-350">{t('Total Revenue')}</span>
                <div className="">
                    <Image src="/images/dashboard-card.svg" width={20} height={18} />
                    <span className="ml-3 font-bold text-gray-350 text-2xl">
                        {totals.total_amount} €
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/4 xl:w-1/5 justify-center align-middle pl-4 border border-b-0 border-t-0 border-r-0">
                <span className="font-bold text-sm text-blue-350">{t('Shoppers')}</span>
                <div className="">
                    <Image src="/images/dashboard-customers.svg" width={20} height={18} />
                    <span className="ml-3 font-bold text-gray-350 text-2xl">
                        {totals.total_buyers}
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/4 xl:w-1/5 justify-center align-middle pl-4 border border-b-0 border-t-0 border-r-0">
                <span className="font-bold text-sm text-blue-350">{t('Pending orders')}</span>
                <div className="">
                    <Image src="/images/dashboard-invoices.svg" width={20} height={20} />
                    <span className="ml-3 font-bold text-gray-350 text-2xl">
                        {totals.total_pending}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Totals;
