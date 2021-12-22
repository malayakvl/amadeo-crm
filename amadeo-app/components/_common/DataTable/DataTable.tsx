import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
    checkAllIdsAction,
    setPaginationAction,
    uncheckAllIdsAction
} from '../../../redux/layouts';
import { paginationSelectorFactory } from '../../../redux/layouts/selectors';
import { RawPagination, EmptyTable } from '../../_common/index';
import { TableHeaders, PaginationType } from '../../../constants';
import { useTranslations } from 'next-intl';

interface Props {
    paginationType: Type.PaginationType;
    children: React.ReactNode[];
    totalAmount: number;
    sendRequest: () => Promise<void>;
    sendDeleteRequest: () => Promise<void> | null;
    sendCopyRequest: () => Promise<void> | null;
}

const DataTable: React.FC<Props> = ({
    paginationType,
    children,
    totalAmount,
    sendRequest,
    sendDeleteRequest,
    sendCopyRequest
}) => {
    const { PRODUCTS } = PaginationType;
    const t = useTranslations();
    const showFilters = [PRODUCTS].includes(paginationType);
    // const hideEntries: boolean = [CATEGORIES, INVESTMENT].includes(paginationType);
    const hideEntries = false;
    const showIds: boolean = [PRODUCTS].includes(paginationType);
    // const hideSearch: boolean = [INVESTMENT].includes(paginationType);
    const hideSearch = false;
    const headers = TableHeaders[paginationType];
    const dispatch = useDispatch();
    const { limit, sort, column, offset, query }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(paginationType)
    );
    const [loading, setLoading] = useState(true);
    const [allChecked, setAllChecked] = useState(false);
    const [selectBulkAction, setSelectBulkAction] = useState('no action');

    useEffect(() => {
        sendRequest().finally(() => setLoading(false));
        // return cancelDebouncedQuery;
    }, [limit, offset, sort, column, query]);

    const setPage = useCallback(
        (currentPage) => {
            dispatch(
                setPaginationAction({
                    type: paginationType,
                    modifier: { offset: limit * currentPage.selected }
                })
            );
        },
        [paginationType, limit, dispatch]
    );

    const setSort = useCallback(
        (event: React.SyntheticEvent): void => {
            const column = event.currentTarget.getAttribute('data-name') as string;
            const sort = event.currentTarget.getAttribute('data-direction') as string;
            dispatch(setPaginationAction({ type: paginationType, modifier: { sort, column } }));
        },
        [paginationType, dispatch]
    );

    const setLimit = useCallback(
        (event: React.SyntheticEvent): void => {
            const limit = Number((event.target as HTMLSelectElement).value);
            dispatch(setPaginationAction({ type: paginationType, modifier: { limit, offset: 0 } }));
        },
        [paginationType, dispatch]
    );

    const bulkAction = useCallback(
        (event: React.SyntheticEvent): void => {
            const action = String((event.target as HTMLSelectElement).value);
            setSelectBulkAction(action);
            if (action === 'delete') {
                sendDeleteRequest();
                // sendDeleteRequest().finally(() => setLoading(false));
            } else if (action === 'copy') {
                sendCopyRequest();
            }
            // return cancelDebouncedQuery;
        },
        [paginationType, dispatch]
    );

    const handleAllChecked = () => {
        if (!allChecked) {
            dispatch(checkAllIdsAction());
        } else {
            dispatch(uncheckAllIdsAction());
        }
        setAllChecked(!allChecked);
    };

    const isTwoRowsHeader = useMemo(() => headers.some((i) => i.subTitles?.length), [headers]);

    const renderTableHeader = () => {
        const getTh = (item: Type.DataTableHeader) => (
            <th
                rowSpan={isTwoRowsHeader && !item.subTitles?.length ? 2 : 1}
                colSpan={item.subTitles?.length || 1}
                key={item.titleKey}
                className={classNames(item.className || 'text-left', {
                    sorting_disabled: !item.sortKey
                })}>
                {t(item.titleKey)}
                {item.sortKey && (
                    <>
                        <div
                            role="presentation"
                            data-name={item.sortKey}
                            data-direction="ASC"
                            onClick={setSort}
                            className={classNames('btn_sort top', {
                                active: column === item.sortKey && sort === 'ASC'
                            })}
                        />
                        <div
                            role="presentation"
                            data-name={item.sortKey}
                            data-direction="DESC"
                            onClick={setSort}
                            className={classNames('btn_sort down', {
                                active: column === item.sortKey && sort === 'DESC'
                            })}
                        />
                    </>
                )}
            </th>
        );

        return (
            <>
                <tr role="row">
                    {showIds && (
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleAllChecked}
                                checked={allChecked}
                            />
                        </th>
                    )}
                    {headers.map(getTh)}
                </tr>
                {isTwoRowsHeader && (
                    <tr role="row">
                        {headers.map((item: Type.DataTableHeader) => {
                            if (!item.subTitles?.length) return null;
                            return item.subTitles.map(getTh);
                        })}
                    </tr>
                )}
            </>
        );
    };

    const length = useMemo(
        () =>
            headers.reduce((acc: number, item: Type.DataTableHeader) => {
                if (!item.subTitles?.length) return acc;
                return acc + item.subTitles.length;
            }, headers.length),
        [headers]
    );

    const renderTableBody = () => {
        if (loading) {
            return <EmptyTable colSpan={length}>No record with selected criteria</EmptyTable>;
        }
        if (children?.length) return children;
        return <EmptyTable colSpan={length}>{t('Table is empty')}</EmptyTable>;
    };

    return (
        <>
            {(!hideEntries || showFilters || !hideSearch) && (
                <div className="mt-3 mb-3">
                    {!hideEntries && (
                        <div className="flex md:w-1/12">
                            <label className="control-label mt-3 mr-3">{t('Action')} </label>
                            <select
                                value={selectBulkAction}
                                onChange={bulkAction}
                                className="form-control">
                                <option value="no action">No action</option>
                                <option value="delete">Delete</option>
                                <option value="copy">Copy</option>
                            </select>
                        </div>
                    )}
                </div>
            )}
            <table className="min-w-full float-table">
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableBody()}</tbody>
            </table>
            {!loading && (
                <div className="flex justify-between w-full">
                    <div>
                        {totalAmount / limit > 1 && (
                            <select value={limit} onChange={setLimit} className="form-control">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        )}
                    </div>
                    {totalAmount / limit > 1 && (
                        <RawPagination
                            forcePage={offset && offset / limit}
                            pageCount={totalAmount / limit}
                            onPageChange={setPage}
                        />
                    )}
                    <div className="pagination-total">
                        {Boolean(totalAmount) && (
                            <div className="dataTables_info" role="status">
                                {t('Showing')} {offset + 1} {t('to')}{' '}
                                {offset + limit > totalAmount ? totalAmount : offset + limit} of{' '}
                                {totalAmount} {t('entries')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTable;
