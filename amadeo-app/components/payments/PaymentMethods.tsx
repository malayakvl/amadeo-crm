import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PaymentMethods: React.FC = () => {
    const t = useTranslations();

    return (
        <>
            <div className="flex">
                <div className="flex-1 text-center">
                    <Image width="34" height="24" src={'/images/en-flag.svg'} />
                </div>
                <div className="flex-1">Method_name</div>
                <div className="flex-1 text-right">
                    <label className="flex items-center cursor-pointer relative">
                        <input type="checkbox" className="sr-only" />
                        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                    </label>
                </div>
            </div>
            <button type="submit" className="w-full mt-8 gradient-btn">
                {t('Save changes')}
            </button>
        </>
    );
};

export default PaymentMethods;
