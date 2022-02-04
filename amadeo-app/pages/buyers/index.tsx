import { useTranslations } from 'next-intl';
import { DataTable } from '../../components/_common';
import { PaginationType } from '../../constants';
import Image from 'next/image';

export default function Buyers() {
    const t = useTranslations();
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const userProfileImg = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

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
    ]

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
                <DataTable
                    hidePaginationBar
                    hideBulk
                    paginationType={PaginationType.BUYERS}
                    totalAmount={items.length}
                    sendRequest={() => new Promise((resolve, reject) => {
                        resolve();

                    })}
                    sendDeleteRequest={() => new Promise(() => { })}
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
                                <div className="text-center text-orange-450 font-medium">{index + 1}</div>
                            </td>
                            <td className="">
                                <div className="flex">
                                    <div className="relative w-7 h-7">
                                        <Image className="rounded-full" layout="fill" src={userProfileImg}/>
                                    </div>
                                    <div className="ml-2">
                                        <div>{item.fullName}</div>
                                        <div className="font-normal text-xs">{item.username}</div>
                                        <div className="font-medium text-xs text-orange-450">{item.email}</div>
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
    )
}