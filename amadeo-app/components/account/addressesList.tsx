import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAddressesAction,
    fetchAddressAction,
    deleteAddressAction
} from '../../redux/addresses';
import {
    addressesSelector,
} from '../../redux/addresses/selectors';
import {useTranslations} from "next-intl";

function AddressesList({email} : {email:string}) {
    const dispatch = useDispatch();
    const t = useTranslations();
    const addressesData = useSelector(addressesSelector);


    useEffect(() => {
        dispatch(fetchAddressesAction(email));
    }, [dispatch, email]);

    const editAddress = (addressId:number|null) => {
        dispatch(fetchAddressAction(addressId, email));
    }
    const deleteAddress = (addressId:number|null) => {
        dispatch(deleteAddressAction(addressId, email));
    }

    return (
        <div className="container flex justify-center mx-auto mt-5">
        {addressesData.length > 0 && (
            <div className="w-full border-b border-gray-200 shadow w-full">
                <table className="divide-y divide-gray-300 w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            {t('Country')}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            {t('State')}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            {t('Post Code')}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            {t('Address Type')}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            {t('City')}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            {t('Addresses')}
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500 text-left">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                    {addressesData.map((address:Addresses.Address) => (
                        <tr className="whitespace-nowrap" key={address.id}>
                            <td className="px-6 py-2 text-left">{address.country_id}</td>
                            <td className="px-6 py-2 text-left">{address.state}</td>
                            <td className="px-6 py-2 text-left">{address.post_code}</td>
                            <td className="px-6 py-2 text-left">{t(address.address_type || '')}</td>
                            <td className="px-6 py-2 text-left">{address.city}</td>
                            <td className="px-6 py-2 text-left">{address.address_line_1} {address.address_line_1}</td>
                            <td>
                                <a onClick={() => {editAddress(address.id)}}
                                   className="cursor-pointer px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full mr-1 inline-block">{t('Edit')}</a>
                                <a onClick={() => {deleteAddress(address.id)}}
                                   className="cursor-pointer px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full mr-1 inline-block">{t('Delete')}</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
    )
}

export default AddressesList
