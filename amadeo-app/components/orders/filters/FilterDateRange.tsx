import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { paginationSelectorFactory } from '../../../redux/layouts/selectors';
import { PaginationType } from '../../../constants';
import { setPaginationAction } from '../../../redux/layouts';
import Image from 'next/image';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file

import { showDateSelectorAction } from '../../../redux/orders';
import { showDatePopupSelector } from '../../../redux/orders/selectors';

const FilterDateRange: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.ORDERS)
    );
    const showDatePopup = useSelector(showDatePopupSelector);
    // const [showBlock, setShowBlock] = useState<boolean>(true);

    const [state, setState] = useState<any>([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    return (
        <>
            {showDatePopup && (
                <div className="filters-calendar">
                    <DateRangePicker
                        onChange={(item) => {
                            setState([item.selection]);
                            // dispatch(
                            //     setPaginationAction({
                            //         type: PaginationType.ORDERS,
                            //         modifier: {
                            //             filters: {
                            //                 ...filters,
                            //                 created_at: [
                            //                     moment(item.selection.startDate).format(
                            //                         'YYYY-MM-DD'
                            //                     ),
                            //                     moment(item.selection.endDate).format('YYYY-MM-DD')
                            //                 ]
                            //             },
                            //             offset: 0
                            //         }
                            //     })
                            // );
                            // dispatch(showDateSelectorAction(false));
                        }}
                        // showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={state}
                        direction="horizontal"
                    />
                    <span className="bg-blue-400 hover:bg-blue-700 text-white text-xs font-bold py-1 px-1.5 rounded float-right mr-3.5 mb-4">
                        Apply
                    </span>
                </div>
            )}
        </>
    );
};

export default FilterDateRange;
