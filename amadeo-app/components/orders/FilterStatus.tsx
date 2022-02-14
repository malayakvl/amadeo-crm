import React, { useState } from 'react';
// import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { paginationSelectorFactory } from '../../redux/layouts/selectors';
import { PaginationType } from '../../constants';
import { setPaginationAction } from '../../redux/layouts';

const FilterStatus: React.FC<any> = () => {
    // const t = useTranslations();
    const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.ORDERS)
    );
    const [statusSelected, setStatusSelected] = useState<any>(filters.status);
    const filterStatuses = ['new', 'payed', 'overdue'];

    const handleStatusFilter = (e: any) => {
        if (e.target.checked) {
            setStatusSelected([...statusSelected, e.target.value]);
            console.log([...statusSelected, parseInt(e.target.value)]);
            dispatch(
                setPaginationAction({
                    type: PaginationType.ORDERS,
                    modifier: {
                        filters: {
                            ...filters,
                            status: [...statusSelected, e.target.value]
                        },
                        offset: 0
                    }
                })
            );
        } else {
            dispatch(
                setPaginationAction({
                    type: PaginationType.ORDERS,
                    modifier: {
                        filters: {
                            ...filters,
                            status: statusSelected.filter((id: any) => id !== e.target.value)
                        },
                        offset: 0
                    }
                })
            );
            setStatusSelected(statusSelected.filter((id: any) => id !== e.target.value));
        }
        // dispatch(
        //     setPaginationAction({
        //         type: PaginationType.ORDERS,
        //         modifier: {
        //             filters: {
        //                 ...filters,
        //                 status: []
        //             },
        //             offset: 0
        //         }
        //     })
        // );
    };

    return (
        <>
            {filterStatuses.map((status) => (
                <span className="block" key={status}>
                    <input
                        type="checkbox"
                        id={`status_${status}`}
                        value={status}
                        checked={filters.status.includes(status)}
                        onChange={(e) => handleStatusFilter(e)}
                    />
                    <label htmlFor={`status_${status}`}>{status}</label>
                </span>
            ))}
        </>
    );
};

export default FilterStatus;
