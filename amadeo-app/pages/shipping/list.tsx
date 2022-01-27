import { useCallback, useEffect } from 'react';
import { ButtonTableAction, DataTable } from '../../components/_common';
import { PaginationType } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShippingsAction } from '../../redux/shipping/actions';
import { shippingsSelector } from '../../redux/shipping/selectors';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { baseApiUrl } from '../../constants';
import { useRouter } from 'next/router';
import { fetchCountriesAction } from '../../redux/countries/actions';
import { countriesSelector } from '../../redux/countries/selectors';
import { checkAllIdsAction, checkIdsAction, initIdsAction, uncheckAllIdsAction } from '../../redux/layouts';
import { checkedIdsSelector, switchHeaderSelector } from '../../redux/layouts/selectors';

export default function List() {
    const dispatch = useDispatch();
    const router = useRouter();
    const sendRequest = useCallback(() => {
        return dispatch(fetchShippingsAction());
    }, [dispatch]);
    const items = useSelector(shippingsSelector);
    const checkedIds = useSelector(checkedIdsSelector);
    const t = useTranslations();
    const countries = useSelector(countriesSelector);
    const switchAllHeader = useSelector(switchHeaderSelector);

    useEffect(() => {
        if (switchAllHeader) {
            dispatch(checkAllIdsAction(items))

        } else {
            dispatch(uncheckAllIdsAction(items))

        }

    }, [switchAllHeader]);

    useEffect(() => {
        if (!items) {
            return;
        }
        const setupChecked: any = [];
        items.forEach((item: Shipping) => {
            setupChecked.push({ id: item.id, checked: item.status });
        });
        dispatch(initIdsAction(setupChecked));
    }, [items]);

    useEffect(() => {
        dispatch(fetchCountriesAction());
    }, []);

    if (!countries.length) {
        return 'Loading';
    }

    return (
        <div className="flex">
            <div className="w-64 p-4 bg-white rounded-lg">
                <div className="font-bold text-gray-350 text-lg pb-4 border-b border-gray-200">
                    {t('Free shipping')}
                </div>
                <div className="text-sm text-gray-500 mt-12">
                    {t(
                        'Set a shipping threshold. In case order has reacted this amount, the shipping is free for this buyer.'
                    )}
                </div>
                <input
                    className="w-full p-2.5 shadow-inner rounded-lg border-2 text-gray-350 font-bold mb-8 mt-6"
                    value="999.99$"
                />
                <button className="gradient-btn">{t('Save changes')}</button>
            </div>
            <div className="block-white-8  ml-4 flex-1">
                <div className="mb-8 font-bold text-gray-350 text-lg py-4 border-b border-gray-200">
                    {t('Shipping methods')}
                </div>
                <DataTable
                    paginationType={PaginationType.SHIPPING}
                    totalAmount={10}
                    sendRequest={sendRequest}
                    sendDeleteRequest={() => new Promise((resolve, reject) => { })}
                    sendCopyRequest={() => new Promise((resolve, reject) => { })}>
                    {items?.map((item: Shipping, index: number) => (
                        <tr className="" key={item.id}>
                            <td>{item.name}</td>
                            <td className="text-center">
                                <Image src={`${baseApiUrl}/${item.image}`} width={50} height={50} />
                            </td>
                            <td>
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        value={`switcher_${item.id}`}
                                        checked={
                                            checkedIds.find((data: any) => data.id === item.id)
                                                ?.checked || false
                                        }
                                        onChange={() => {
                                            dispatch(checkIdsAction(item.id));
                                            items[index].status = !item.status
                                            console.log(item.status)
                                        }}

                                    />
                                    <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                                </label>
                            </td>
                            <td className="text-center">
                                {item.countries.map((country) => (
                                    <div className="bg-gray-400 text-white rounded-md p-1 m-1">
                                        {
                                            countries.find((item: any) => item.id === country.id)
                                                .nicename
                                        }
                                    </div>
                                ))}
                            </td>

                            <td className="text-right whitespace-nowrap">
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(`/shipping/edit-method/${item.id}`);
                                    }}
                                    className="cursor-pointer">
                                    <Image
                                        width={24}
                                        height={24}
                                        src="/images/dots.svg"
                                        layout="fixed"
                                        alt=""
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </div>
    );
}
