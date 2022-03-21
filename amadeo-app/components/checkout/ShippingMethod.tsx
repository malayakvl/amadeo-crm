/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'formik';
// import { useTranslations } from 'next-intl';
// import { countriesSelector } from '../../redux/countries/selectors';
// import { fetchCountriesAction } from '../../redux/countries/actions';
// import { prepareCountriesDropdown } from '../../lib/functions';
import { Radio } from './';

const ShippingMethod = () => {
    // const t = useTranslations();
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
                name="shippingMethod"
                value="dhl"
                title="10.00 $"
                text="DHL 1st Class With Tracking (5 - 13 days) COVID19 Delay"
                img="dhl"
                component={Radio}
            />

            <Field
                type="radio"
                name="shippingMethod"
                value="fedex"
                title="8.00 $"
                text="Fedex PRIORITY With Tracking (5 - 10 days) COVID19 Delay"
                img="fedex"
                component={Radio}
            />

            <Field
                type="radio"
                name="shippingMethod"
                value="ups"
                title="8.50 $"
                text="UPS PRIORITY With Tracking (5 - 10 days)"
                img="ups"
                component={Radio}
            />
        </div>
    );
};

export default ShippingMethod;
