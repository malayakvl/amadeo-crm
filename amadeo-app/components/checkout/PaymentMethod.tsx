/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'formik';
import { useTranslations } from 'next-intl';
// import { countriesSelector } from '../../redux/countries/selectors';
// import { fetchCountriesAction } from '../../redux/countries/actions';
// import { prepareCountriesDropdown } from '../../lib/functions';
import { Radio, RadioCreditCard } from './';

const PaymentMethod = () => {
    const t = useTranslations();
    // const dispatch = useDispatch();

    // const props = useFormikContext();

    // const countries = useSelector(countriesSelector);

    // useEffect(() => {
    //     dispatch(fetchCountriesAction());
    // }, []);

    return (
        <div role="group" aria-labelledby="shipping-method-radio-group">
            <Field
                type="radio"
                name="paymentMethod"
                value="paypal"
                title="PayPal"
                text={t('You will be redirected to the PayPal website after submitting your order')}
                img="../payments/paypal"
                component={Radio}
            />

            <Field
                type="radio"
                name="paymentMethod"
                value="card"
                title={t('Credit card')}
                component={RadioCreditCard}
            />

            <div className="flex space-x-2 sm:space-x-4 text-gray-350 font-bold">
                <div className="flex-none">
                    <img width="50" height="50" src="/images/padlock.png" alt="Padlock" />
                </div>

                <div>
                    {t(
                        'We protect your payment information using encryption to provide bank-level security.'
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
