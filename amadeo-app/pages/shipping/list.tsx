import { useCallback, useEffect, useState } from 'react';
import { DataTable } from '../../components/_common';
import { PaginationType } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeShippingStatus,
    changeShippingStatuses,
    fetchShippingsAction,
    setThresholdAction
} from '../../redux/shipping/actions';
import { shippingsSelector } from '../../redux/shipping/selectors';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { baseApiUrl } from '../../constants';
import { useRouter } from 'next/router';
import { fetchCountriesAction } from '../../redux/countries/actions';
import { countriesSelector } from '../../redux/countries/selectors';
import {
    checkAllIdsAction,
    checkIdsAction,
    initIdsAction,
    setSuccessToastAction,
    uncheckAllIdsAction
} from '../../redux/layouts';
import { checkedIdsSelector } from '../../redux/layouts/selectors';
import { ErrorMessage, Field, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { userSelector } from '../../redux/user/selectors';
import axios from 'axios';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
import * as Yup from 'yup';
import { getSession } from 'next-auth/client';

const { publicRuntimeConfig } = getConfig();
const url = `${publicRuntimeConfig.apiUrl}/api/shipping`;

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
    const user = useSelector(userSelector);
    const [threshold, setThreshold] = useState(false);
    const [dropDowns, setDropDowns] = useState<Array<boolean>>([]);

    useEffect(() => {
        if (!items) {
            return;
        }
        const setupChecked: any = [];
        items.forEach((item: Shipping) => {
            setupChecked.push({ id: item.id, checked: item.status });
        });
        dispatch(initIdsAction(setupChecked));
        setDropDowns(items.map(() => false));
    }, [items]);

    useEffect(() => {
        dispatch(fetchCountriesAction());
    }, []);

    useEffect(() => {
        if (user.hasOwnProperty('email')) {
            axios
                .get(`${url}/threshold`, {
                    headers: {
                        ...authHeader(user.email)
                    }
                })
                .then((result) => {
                    setThreshold(result.data.threshold);
                });
        }
    }, [user]);

    if (!countries.length || threshold === false) {
        return 'Loading';
    }

    return (
        <>
            <div className="block-white-8 mr-10 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Shipping')}</h1>
                </div>
                <div className="text-gray-400">
                    {t(
                        'Shipping section allows merchant to manage shipping methods and prices for his buyers'
                    )}
                </div>
            </div>

            <div className="flex mt-10 block-white-8">
                {user.role_id !== 3 && (
                    <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-inner">
                        <div className="font-bold text-gray-350 text-lg pb-4 border-b border-gray-200">
                            {t('Free shipping')}
                        </div>
                        <div className="text-sm text-gray-500 mt-12">
                            {t('shipping_threshold')}
                        </div>
                        <Formik
                            onSubmit={(values) => {
                                dispatch(setThresholdAction(values));
                                dispatch(
                                    setSuccessToastAction(
                                        t(`Threshold has been saved: ${values.threshold}`)
                                    )
                                );
                            }}
                            initialValues={{ threshold }}
                            validationSchema={Yup.object().shape({
                                threshold: Yup.number().typeError('Must be number')
                            })}
                            render={(props) => (
                                <Form onSubmit={props.handleSubmit}>
                                    <Field
                                        name="threshold"
                                        className="w-full p-2.5 shadow-inner rounded-lg border-2 text-gray-350 font-bold mt-6"
                                    />
                                    <div className="error-el">
                                        <ErrorMessage name="threshold" />
                                    </div>
                                    <button type="submit" className="w-full mt-8 gradient-btn">
                                        {t('Save changes')}
                                    </button>
                                </Form>
                            )}
                        />
                    </div>
                )}

                <div className="ml-8 flex-1">
                    <div className="mb-8 font-bold text-gray-350 text-lg py-4 border-b border-gray-200">
                        {t('Shipping methods')}
                    </div>
                    <DataTable
                        hidePaginationBar={true}
                        hideBulk={true}
                        paginationType={PaginationType.SHIPPING}
                        totalAmount={items?.length}
                        switcherOnClick={(status: boolean) => {
                            if (status) {
                                dispatch(changeShippingStatuses(true));
                                dispatch(checkAllIdsAction(items));
                            } else {
                                dispatch(changeShippingStatuses(false));
                                dispatch(uncheckAllIdsAction(items));
                            }

                            dispatch(
                                setSuccessToastAction(
                                    t(`Statuses have been changed for all shippings`)
                                )
                            );
                        }}
                        sendRequest={sendRequest}
                        sendDeleteRequest={() => new Promise(() => null)}
                        sendCopyRequest={() => new Promise(() => null)}>
                        {items?.map((item: Shipping, index: number) => (
                            <tr key={item.id}>
                                <td>
                                    <button
                                        onClick={() => {
                                            dropDowns[index] = !dropDowns[index];
                                            setDropDowns([...dropDowns]);
                                        }}>
                                        {dropDowns[index] ? (
                                            <>
                                                <Image
                                                    className="rotate-90 transform"
                                                    width="12"
                                                    height="14"
                                                    src={`/images/action-arrow-orange.svg`}
                                                />
                                            </>
                                        ) : (
                                                <Image
                                                    width="12"
                                                    height="14"
                                                    src={`/images/action-arrow.svg`}
                                                />
                                            )}
                                    </button>
                                </td>

                                <td>
                                    <div className="text-center">{index + 1}</div>
                                </td>
                                <td className="break-all">{item.name}</td>

                                <td className="flex justify-center">
                                    <Image
                                        src={`${baseApiUrl}/${item.image}`}
                                        width={50}
                                        height={50}
                                    />
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
                                                const status = !item.status;
                                                items[index].status = status;
                                                dispatch(changeShippingStatus(item.id, status));
                                                dispatch(
                                                    setSuccessToastAction(
                                                        t(
                                                            `Status of the shipping '${item.name}' is changed`
                                                        )
                                                    )
                                                );
                                            }}
                                        />
                                        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                                    </label>
                                </td>
                                {user.role_id !== 3 && (
                                    <td className="text-center">
                                        {item.countries.length > 0 ? (
                                            <>
                                                {dropDowns[index] ? (
                                                    item.countries.map((country) => {
                                                        return <div key={country.id} className="flex mb-1">
                                                            <Image
                                                                width="34"
                                                                height="24"
                                                                src={`/images/flags/Country=${country.iso}.svg`}
                                                            />
                                                            <div className="ml-auto">
                                                                {country.price}
                                                            </div>
                                                        </div>
                                                    })
                                                ) : (
                                                        <div className="flex mb-1">
                                                            <Image
                                                                width="34"
                                                                height="24"
                                                                src={`/images/flags/Country=${item.countries[0].iso}.svg`}
                                                            />
                                                            <div className="ml-auto">
                                                                {item.countries[0].price}
                                                            </div>
                                                        </div>
                                                    )}
                                            </>
                                        ) : (
                                                <div className="text-gray-400 text-sm">
                                                    {t('Empty')}
                                                </div>
                                            )}
                                    </td>
                                )}

                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(`/shipping/edit-method/${item.id}`);
                                        }}
                                        className="ml-auto block">
                                        <Image
                                            width={24}
                                            height={24}
                                            src="/images/dots.svg"
                                            layout="fixed"
                                            alt=""
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </DataTable>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const { locale } = context;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    }

    return {
        props: {
            session,
            locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
