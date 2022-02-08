import { useTranslations } from 'next-intl';
import { DataTable } from '../../components/_common';
import { PaginationType } from '../../constants';
import Image from 'next/image';
import { InputText } from '../../components/_form';
import { useState } from 'react';

export default function Buyers() {
    const t = useTranslations();
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const userProfileImg =
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

    const items = [
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        },
        {
            username: 'username',
            fullName: 'Some Full Name',
            phone: '(406) 555-0120',
            address: '3517 W.Gray St.Utica, Pennsylvania 57867',
            orders: '999',
            totalSpent: '9.845.25',
            email: 'email@email.com'
        }
    ];

    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <>
            <div className="block-white-8 mr-10 white-shadow-big mb-8">
                <div className="page-title">
                    <h1>{t('Shoppers')}</h1>
                </div>
                <div className="text-gray-400">
                    {t('Buyers section provides merchant information about his buyers')}
                </div>
            </div>

            <div className="block-white-8 white-shadow-big">
                <div className="mb-14 relative">
                    {filterOpen && (
                        <div className="-top-14 bg-white absolute right-36 w-80 p-6 shadow-xl rounded-3xl">
                            <div className="pb-3 border-b flex justify-between">
                                <div className="text-gray-350 font-bold text-xl">
                                    {t('Filters')}
                                </div>
                            </div>
                            <InputText
                                style="mt-5 w-full"
                                icon={''}
                                label={null}
                                name={'name'}
                                placeholder={t('Start typing to search')}
                                props={{
                                    values: { name: '' },
                                    errors: { name: '' }
                                }}
                                tips={null}
                            />
                            <div className="flex justify-between mb-2">
                                <div className="flex items-center">
                                    <Image width="10" height="10" src={'/images/lang-arrow.svg'} />
                                    <span className="ml-2 text-xs font-bold text-blue-350">
                                        {t('Spent')}
                                    </span>
                                </div>
                                <div className="text-sm font-thin text-gray-450">999,99,9$</div>
                            </div>
                            <input
                                className="w-full"
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value="50"
                            />
                            <div className="flex mt-1">
                                <div className="w-1/2 mr-2">
                                    <div className="mb-3 text-xs font-bold text-blue-350">
                                        {t('Minimum')}
                                    </div>
                                    <InputText
                                        style="w-full"
                                        icon={''}
                                        label={null}
                                        name={'name'}
                                        placeholder={t('0,00$')}
                                        props={{
                                            values: { name: '' },
                                            errors: { name: '' }
                                        }}
                                        tips={null}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <div className="mb-3 text-xs font-bold text-blue-350">
                                        {t('Maximum')}
                                    </div>
                                    <InputText
                                        style="w-full"
                                        icon={''}
                                        label={null}
                                        name={'name'}
                                        placeholder={t('999,999$')}
                                        props={{
                                            values: { name: '' },
                                            errors: { name: '' }
                                        }}
                                        tips={null}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mb-3">
                                <div className="flex items-center">
                                    <Image width="10" height="10" src={'/images/lang-arrow.svg'} />
                                    <span className="ml-2 text-xs font-bold text-blue-350">
                                        {t('Country')}
                                    </span>
                                </div>
                                <div className="font-bold rounded-full text-center p-[2px] bg-green-250 text-xs h-5 w-5 text-white">
                                    3
                                </div>
                            </div>
                            <InputText
                                style="w-full pb-4 border-b mb-6"
                                icon={''}
                                label={null}
                                name={'name'}
                                placeholder={t('Type to search for...')}
                                props={{
                                    values: { name: '' },
                                    errors: { name: '' }
                                }}
                                tips={null}
                            />
                            <div className="flex items-center mb-3">
                                <input
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    className="text-green-250 border-green-250 w-5 h-5 border-2 rounded mr-2.5"
                                    type="checkbox"
                                />
                                <Image width="40" height="24" src={'/images/en-flag.svg'} />
                                <span className="ml-2 text-xs font-bold text-blue-350">
                                    {t('America')}
                                </span>
                            </div>
                            <div className="flex items-center mb-3">
                                <input
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    className="text-green-250 border-green-250 w-5 h-5 border-2 rounded mr-2.5"
                                    type="checkbox"
                                />
                                <Image width="40" height="24" src={'/images/fr-glag.svg'} />
                                <span className="ml-2 text-xs font-bold text-blue-350">
                                    {t('France')}
                                </span>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">
                        <Image width={16} height={16} src={'/images/filter.svg'} />
                        <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>
                        <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">
                            9
                        </div>
                    </button>
                </div>

                <DataTable
                    hideBulk
                    paginationType={PaginationType.BUYERS}
                    totalAmount={items.length}
                    sendRequest={() =>
                        new Promise((resolve) => {
                            resolve();
                        })
                    }
                    sendDeleteRequest={() => new Promise(() => null)}
                    sendCopyRequest={() => new Promise(() => null)}>
                    {items.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>
                                <button>
                                    <Image
                                        width="12"
                                        height="14"
                                        src={`/images/action-arrow.svg`}
                                    />
                                </button>
                            </td>
                            <td className="text-center">
                                <div className="text-center text-orange-450 font-medium">
                                    {index + 1}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex">
                                    <div className="relative w-7 h-7">
                                        <Image
                                            className="rounded-full"
                                            layout="fill"
                                            src={userProfileImg}
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <div>{item.fullName}</div>
                                        <div className="font-normal text-xs">{item.username}</div>
                                        <div className="font-medium text-xs text-orange-450">
                                            {item.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-center font-medium">{item.phone}</div>
                            </td>
                            <td>
                                <div className="font-medium">{item.address}</div>
                            </td>
                            <td>
                                <div className="text-center text-orange-450">{item.orders}</div>
                            </td>
                            <td>
                                <div className="text-right">{item.totalSpent}</div>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </>
    );
}
