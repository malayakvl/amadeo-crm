import { useTranslations } from 'next-intl';
import { DataTable } from '../../components/_common';
import { PaginationType } from '../../constants';
import Image from 'next/image';

export default function Buyers() {
    const t = useTranslations();
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
            <div className="ml-8 flex-1">
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
                                <div className="text-center">{index + 1}</div>
                            </td>
                            <td className="">text</td>
                            <td className="p-0">
                                <div className="text-center">text</div>
                            </td>
                            <td className="">text</td>
                            <td>
                                <div className="text-center">text</div>
                            </td>
                            <td><div className="text-right">100 000 000</div></td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </>
    )
}