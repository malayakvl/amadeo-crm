import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAddressesAction,
    fetchAddressAction
} from '../../redux/addresses';
import {
    addressesSelector,
} from '../../redux/addresses/selectors';
import {useTranslations} from "next-intl";

function AddressesList() {
    const dispatch = useDispatch();
    const t = useTranslations();
    const addressesData = useSelector(addressesSelector);


    useEffect(() => {
        dispatch(fetchAddressesAction('1@1.com'));
    }, [dispatch]);

    const editAddress = (addressId:number|null) => {
        dispatch(fetchAddressAction(addressId));
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
                            <td className="px-6 py-2 text-left">1{address.state}</td>
                            <td className="px-6 py-2 text-left">{address.post_code}</td>
                            <td className="px-6 py-2 text-left">{t(address.address_type || '')}</td>
                            <td className="px-6 py-2 text-left">{address.city}</td>
                            <td className="px-6 py-2 text-left">{address.address_line_1} {address.address_line_1}</td>
                            <td>
                                <a onClick={() => {editAddress(address.id)}}
                                   className="cursor-pointer px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full mr-1 inline-block">Edit</a>
                                <a href="#"
                                   className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full mr-1 inline-block">Delete</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
        // <div className="container flex justify-center mx-auto">
        //         <div className="w-full">
        //             <div className="border-b border-gray-200 shadow w-full">
        //                 <table className="divide-y divide-gray-300 w-full">
        //                     <thead className="bg-gray-50">
        //                     <tr>
        //                         <th className="px-6 py-2 text-xs text-gray-500">
        //                             ID
        //                         </th>
        //                         <th className="px-6 py-2 text-xs text-gray-500">
        //                             Name
        //                         </th>
        //                         <th className="px-6 py-2 text-xs text-gray-500">
        //                             Email
        //                         </th>
        //                         <th className="px-6 py-2 text-xs text-gray-500">
        //                             Created_at
        //                         </th>
        //                         <th className="px-6 py-2 text-xs text-gray-500">
        //                             Edit
        //                         </th>
        //                         <th className="px-6 py-2 text-xs text-gray-500">
        //                             Delete
        //                         </th>
        //                     </tr>
        //                     </thead>
        //                     <tbody className="bg-white divide-y divide-gray-300">
        //                     <tr className="whitespace-nowrap">
        //                         <td className="px-6 py-4 text-sm text-gray-500">
        //                             1
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <div className="text-sm text-gray-900">
        //                                 Jon doe
        //                             </div>
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <div className="text-sm text-gray-500">jhondoe@example.com</div>
        //                         </td>
        //                         <td className="px-6 py-4 text-sm text-gray-500">
        //                             2021-1-12
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
        //                         </td>
        //                     </tr>
        //                     <tr className="whitespace-nowrap">
        //                         <td className="px-6 py-4 text-sm text-gray-500">
        //                             1
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <div className="text-sm text-gray-900">
        //                                 Jon doe
        //                             </div>
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <div className="text-sm text-gray-500">jhondoe@example.com</div>
        //                         </td>
        //                         <td className="px-6 py-4 text-sm text-gray-500">
        //                             2021-1-12
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
        //                         </td>
        //                     </tr>
        //                     <tr className="whitespace-nowrap">
        //                         <td className="px-6 py-4 text-sm text-gray-500">
        //                             1
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <div className="text-sm text-gray-900">
        //                                 Jon doe
        //                             </div>
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <div className="text-sm text-gray-500">jhondoe@example.com</div>
        //                         </td>
        //                         <td className="px-6 py-4 text-sm text-gray-500">
        //                             2021-1-12
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
        //                         </td>
        //                         <td className="px-6 py-4">
        //                             <a href="#"
        //                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
        //                         </td>
        //                     </tr>
        //                     </tbody>
        //                 </table>
        //             </div>
        //         </div>
        // </div>
    )
}

export default AddressesList
