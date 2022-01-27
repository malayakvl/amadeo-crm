import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import {
    checkAllIdsAction,
    setErrorToastAction,
    setPaginationAction,
    uncheckAllIdsAction
} from '../../../redux/layouts';
import {
    checkedIdsSelector,
    paginationSelectorFactory,
    switchHeaderSelector
} from '../../../redux/layouts/selectors';
import { RawPagination, EmptyTable, DropdownAction } from '../../_common/index';
import { TableHeaders, PaginationType } from '../../../constants';
import { setSwitchHeaderAction } from '../../../redux/layouts/actions';

interface Props {
    paginationType: Type.PaginationType;
    children: React.ReactNode[];
    totalAmount: number;
    sendRequest: () => Promise<void>;
    sendDeleteRequest: () => Promise<void> | null;
    sendCopyRequest: () => Promise<void> | null;
    switcherOnClick?: any;
}

const DataTable: React.FC<Props> = ({
    paginationType,
    children,
    totalAmount,
    sendRequest,
    sendDeleteRequest,
    sendCopyRequest,
    switcherOnClick,
}) => {
    const { PRODUCTS } = PaginationType;
    const t = useTranslations();
    const checkedIds = useSelector(checkedIdsSelector);
    const switchAllHeader = useSelector(switchHeaderSelector);
    // const showFilters = [PRODUCTS].includes(paginationType);
    // const hideEntries: boolean = [CATEGORIES, INVESTMENT].includes(paginationType);
    const showIds: boolean = [PRODUCTS].includes(paginationType);
    // const hideSearch: boolean = [INVESTMENT].includes(paginationType);
    // const hideSearch = false;
    const headers = TableHeaders[paginationType];
    const dispatch = useDispatch();
    const { limit, sort, column, offset, query, filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(paginationType)
    );
    const [loading, setLoading] = useState(true);
    const [allChecked, setAllChecked] = useState(false);
    const [selectBulkAction, setSelectBulkAction] = useState(null);

    useEffect(() => {
        sendRequest().finally(() => setLoading(false));
        // return cancelDebouncedQuery;
    }, [limit, offset, sort, column, query, filters]);

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

    const bulkActionDropdown = useCallback(
        (action: any): void => {
            if (action === 'delete') {
                sendDeleteRequest();
            } else if (action === 'copy') {
                sendCopyRequest();
            }
            setSelectBulkAction(null);
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
    const handleSwitchAction = (checked: boolean) => {
        dispatch(setSwitchHeaderAction(checked));
    };

    const isTwoRowsHeader = useMemo(() => headers.some((i) => i.subTitles?.length), [headers]);
    const renderTableHeader = () => {
        const getTh = (item: Type.DataTableHeader) => (
            <th
                rowSpan={isTwoRowsHeader && !item.subTitles?.length ? 2 : 1}
                colSpan={item.subTitles?.length || 1}
                key={item.titleKey ? item.titleKey : Math.random().toString(16).slice(2)}
                className={classNames(item.className || 'text-left', {
                    sorting_disabled: !item.sortKey
                })}>
                {item.className === 'option-switcher' && (
                    <label
                        htmlFor="switchAll"
                        className="flex items-center cursor-pointer relative">
                        <input
                            type="checkbox"
                            id="switchAll"
                            className="sr-only"
                            checked={switchAllHeader}
                            onChange={
                                (e: any) => {
                                    handleSwitchAction(e.target.checked)

                                    if (switcherOnClick) {
                                        switcherOnClick(e.target.checked)

                                    }
                                }
                            }
                        />
                        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                    </label>
                )}
                {item.titleKey ? t(item.titleKey) : ''}
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
                        <th style={{ width: '30px' }}>
                            <input
                                type="checkbox"
                                onChange={handleAllChecked}
                                checked={allChecked}
                                className="float-left checkbox-action check-all"
                            />
                            <DropdownAction
                                onChange={(v: any) => {
                                    if (checkedIds.find((d: any) => d.checked === true)) {
                                        bulkActionDropdown(v);
                                        setSelectBulkAction(v);
                                    } else {
                                        dispatch(setErrorToastAction('Select at least one item'));
                                    }
                                }}
                                options={['copy', 'delete']}
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

    // const [vegetagle, setVegetable] = useState(undefined);
    return (
        <>
            {/*{(!hideEntries || showFilters || !hideSearch) && (*/}
            {/*    <div className="mt-3 mb-3">*/}
            {/*        {!hideEntries && (*/}
            {/*            <div className="flex md:w-1/12">*/}
            {/*                <label className="control-label mt-3 mr-3">{t('Action')} </label>*/}
            {/*                <Dropdown*/}
            {/*                    placeholder={t('Select Action')}*/}
            {/*                    value={selectBulkAction}*/}
            {/*                    onChange={(v: any) => {*/}
            {/*                        if (checkedIds.find((d: any) => d.checked === true)) {*/}
            {/*                            bulkActionDropdown(v);*/}
            {/*                            setSelectBulkAction(v);*/}
            {/*                        } else {*/}
            {/*                            dispatch(setErrorToastAction('Select at least one item'));*/}
            {/*                        }*/}
            {/*                    }}*/}
            {/*                    options={['copy', 'delete']}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*)}*/}
            <table className="min-w-full float-table">
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableBody()}</tbody>
            </table>
            {!loading && (
                <div className="flex justify-between w-full mt-5 mb-10">
                    <div>
                        <select value={limit} onChange={setLimit} className="form-control">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
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
