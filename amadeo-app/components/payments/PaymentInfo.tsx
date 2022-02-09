import { useTranslations } from 'next-intl';

const PaymentInfo: React.FC = () => {
    const t = useTranslations();

    return (
        <>
            <div className="page-title clear-right">
                <h1>{t('Payments')}</h1>
            </div>
            <div className="block">
                <div className="w-full bg-white">
                    <div className="md:flex">
                        <div className="md:shrink-0">
                            <span className="text-blue-350 text-base max-w-[800px]">
                                Payment section should allow merchant to view all payment
                                transactions he had in our system.
                                <p className="my-3">Merchant should be able to:</p>
                                <ul className="list-inside list-disc">
                                    <li>
                                        choose a period using calendar and see transactions within
                                        this period
                                    </li>
                                    <li>
                                        download invoices of each transaction one by one or with
                                        bulk selection
                                    </li>
                                    <li>
                                        manage and adjust payment methods that will be seen and
                                        available for his buyers
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="clear-both" />
            </div>
        </>
    );
};
export default PaymentInfo;
