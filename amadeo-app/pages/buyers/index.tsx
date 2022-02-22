import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { ListBuyers, Filters, FilterValues } from '../../components/buyer';
import { paginationSelectorFactory } from '../../redux/layouts/selectors';
import { PaginationType } from '../../constants';
import Image from 'next/image';
import { useState } from 'react';

export default function Buyers() {
    const t = useTranslations();

    const [filterOpen, setFilterOpen] = useState(false);

    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.BUYERS)
    );

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
                    <FilterValues />

                    {filterOpen && <Filters />}

                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">
                        <Image width={16} height={16} src={'/images/filter.svg'} />
                        <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>
                        <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">
                            {+!!filters.name +
                                +!!filters.total_amount.length +
                                filters.country_id.length}
                        </div>
                    </button>
                </div>

                <ListBuyers />
            </div>
        </>
    );
}
