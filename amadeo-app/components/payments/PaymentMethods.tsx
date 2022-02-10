import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessToastAction } from '../../redux/layouts';
import Image from 'next/image';

const PaymentMethods: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();

    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 123,
            name: 'Method_1_name',
            icon: '/images/payments/amex.svg',
            active: true
        },
        {
            id: 124,
            name: 'Method_2_name',
            icon: '/images/payments/amazon.svg',
            active: true
        },
        {
            id: 125,
            name: 'Method_3_name',
            icon: '/images/payments/bitcoin.svg',
            active: false
        },
        {
            id: 126,
            name: 'Method_4_name',
            icon: '/images/payments/paypal.svg',
            active: true
        },
        {
            id: 127,
            name: 'Method_5_name',
            icon: '/images/payments/visa.svg',
            active: true
        }
    ]);

    const handlerOnSave = useCallback(() => {
        console.log('paymentMethods = ', paymentMethods);
        dispatch(setSuccessToastAction(t('Payment methods saved')));
    }, [paymentMethods]);

    return (
        <>
            {paymentMethods?.map((paymentMethod) => (
                <div key={paymentMethod.id} className="flex space-x-2 items-center mb-2">
                    <div className="flex-none w-7 h-auto">
                        <Image
                            width="46"
                            height="32"
                            src={paymentMethod.icon}
                            className="text-orange-450"
                        />
                    </div>
                    <div className="h-auto flex-grow">{paymentMethod.name}</div>
                    <div className="flex-none text-right">
                        <label className="flex items-center cursor-pointer relative text-size">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={paymentMethod.active}
                                onChange={() => {
                                    paymentMethod.active = !paymentMethod.active;
                                    setPaymentMethods([...paymentMethods]);
                                }}
                            />
                            <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600 w-11 h-6 shadow-inner" />
                        </label>
                    </div>
                </div>
            ))}

            <button onClick={handlerOnSave} className="w-full mt-8 gradient-btn">
                {t('Save changes')}
            </button>
        </>
    );
};

export default PaymentMethods;
