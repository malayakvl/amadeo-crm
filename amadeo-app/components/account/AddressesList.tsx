import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAddressesAction,
    fetchAddressAction,
    deleteAddressAction
} from '../../redux/addresses';
import { addressesSelector } from '../../redux/addresses/selectors';
import { useTranslations } from 'next-intl';

function AddressesList({ email }: { email: string }) {
    const dispatch = useDispatch();
    const t = useTranslations();
    const addressesData = useSelector(addressesSelector);

    useEffect(() => {
        dispatch(fetchAddressesAction());
    }, [dispatch, email]);

    const editAddress = (addressId: number | null) => {
        dispatch(fetchAddressAction(addressId));
    };
    const deleteAddress = (addressId: number | null) => {
        dispatch(deleteAddressAction(addressId));
    };

    return (
        <>
            {addressesData?.length > 0 && (
                <div className="mt-8">
                    <div className="font-bold text-gray-350 text-base pb-4 mb-2 border border-t-0 border-l-0 border-r-0">
                        {t('My Addressess')}
                    </div>
                    <div className="inline-block min-w-full overflow-hidden align-middle">
                        <table className="min-w-full float-table">
                            <thead>
                                <tr>
                                    <th>{t('Country')}</th>
                                    <th>{t('State')}</th>
                                    <th>{t('Post Code')}</th>
                                    <th>{t('Address Type')}</th>
                                    <th>{t('City')}</th>
                                    <th>{t('Addresses')}</th>
                                    <th>{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {addressesData.map((address: Addresses.Address) => (
                                    <tr key={address.id}>
                                        <td>{address.country_id}</td>
                                        <td>{address.state}</td>
                                        <td>{address.post_code}</td>
                                        <td>{t(address.address_type || '')}</td>
                                        <td>{address.city}</td>
                                        <td>
                                            {address.address_line_1} {address.address_line_1}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    editAddress(address.id);
                                                }}
                                                className="cursor-pointer inline-flex px-2 text-xs font-semibold leading-5
                                                        text-green-700 bg-green-100 rounded-full mr-2">
                                                {t('Edit')}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteAddress(address.id);
                                                }}
                                                className="cursor-pointer inline-flex px-2 text-xs font-semibold leading-5
                                                        text-red-700 bg-red-100 rounded-full">
                                                {t('Delete')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddressesList;
