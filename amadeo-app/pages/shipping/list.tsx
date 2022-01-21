import { useCallback } from "react";
import { DataTable } from "../../components/_common";
import { PaginationType } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { fetchShippingsAction } from "../../redux/shipping/actions";
import { shippingsSelector } from '../../redux/shipping/selectors'
import { useTranslations } from "next-intl";
import Image from 'next/image';
import { baseApiUrl } from '../../constants';

export default function List() {
    const dispatch = useDispatch()

    const sendRequest = useCallback(() => {
        return dispatch(fetchShippingsAction())
    }, [dispatch]);

    const items = useSelector(shippingsSelector);
    const t = useTranslations();

    return (
        <div className="flex">
            <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-inner">
                <div className="font-bold text-gray-350 text-lg pb-4 border-b border-gray-200">
                    {t('Free shipping')}
                </div>
                <div className="text-sm text-gray-500 mt-12">
                    {t('Set a shipping threshold. In case order has reacted this amount, the shipping is free for this buyer.')}
                </div>
                <input className="w-full p-2.5 shadow-inner rounded-lg border-2 text-gray-350 font-bold mb-8 mt-6" value="999.99$" />
                <button className="gradient-btn">{t('Save changes')}</button>
            </div>
            <div className="ml-4 flex-1">
                <div className="mb-12 font-bold text-gray-350 text-lg py-4 border-b border-gray-200">
                    {t('Shipping methods')}
                </div>
                <DataTable
                    paginationType={PaginationType.SHIPPING}
                    totalAmount={10}
                    sendRequest={sendRequest}
                    sendDeleteRequest={() => new Promise((resolve, reject) => { })}
                    sendCopyRequest={() => new Promise((resolve, reject) => { })}>
                    {items?.map((item: Shipping) => (
                        <tr key={item.id}>
                            <td>
                                <Image
                                    width={12}
                                    height={12}
                                    src="/images/action-arrow.svg"
                                    layout="fixed"
                                    alt=""
                                />
                            </td>
                            <td className="text-center">
                                {item.id}
                            </td>
                            <td className="text-center">
                                <Image src={`${baseApiUrl}/${item.image}`} width={50} height={50} />
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        value={`switcher_${item.id}`}
                                        checked={item.status}
                                        onChange={() => {
                                            // setSwitcherValue(e.target.value);
                                            // handleShowMore(item.id);
                                        }}
                                    />
                                    <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                                </label>
                            </td>
                            <td className="text-center">
                                countries
                            </td>

                            <td className="text-right whitespace-nowrap">
                                <Image
                                    width={24}
                                    height={24}
                                    src="/images/dots.svg"
                                    layout="fixed"
                                    alt=""
                                />
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>

        </div>
    )

}