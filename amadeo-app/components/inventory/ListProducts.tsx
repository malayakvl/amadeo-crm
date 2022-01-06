import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { DataTable, ButtonTableAction } from '../../components/_common';
import { PaginationType } from '../../constants';
import { checkedIdsSelector } from '../../redux/layouts/selectors';
import { checkIdsAction, initIdsAction } from '../../redux/layouts';
import { paginatedProductsSelector, productsCountSelector } from '../../redux/products/selectors';
import {
    fetchProductsAction,
    bulkDeleteAction,
    bulkCopyAction,
    fetchProductAction,
    setActiveTabAction,
    deleteProductAction,
    copyProductAction
} from '../../redux/products/actions';
import { baseApiUrl } from '../../constants';
import { setModalConfirmationMetaAction } from '../../redux/layouts';
import { BanIcon } from '@heroicons/react/solid';
import { FilterValues } from './index';

const ListProducts: React.FC<any> = (locale: string) => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const count = useSelector(productsCountSelector);
    const items = useSelector(paginatedProductsSelector);
    const checkedIds = useSelector(checkedIdsSelector);
    const [showMoreConfigs, setShowMoreConfigs] = useState<any>({});

    const sendRequest = useCallback(() => {
        return dispatch(fetchProductsAction());
    }, [dispatch]);

    const sendDeleteRequest = useCallback(() => {
        return dispatch(bulkDeleteAction());
    }, [dispatch]);

    const sendCopyRequest = useCallback(() => {
        return dispatch(bulkCopyAction());
    }, [dispatch]);

    useEffect(() => {
        const setupChecked: any = [];
        items.forEach((item: Products.ProductItem) => {
            setupChecked.push({ id: item.id, checked: false });
        });
        dispatch(initIdsAction(setupChecked));
        setShowMoreConfigs(setupChecked);
    }, [items]);

    const handleDuplicateBtnClick = useCallback(
        (event: React.SyntheticEvent): void => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            dispatch(copyProductAction(id));
        },
        [dispatch]
    );

    const handleDeleteBtnClick = useCallback(
        (event: React.SyntheticEvent): void => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            dispatch(
                setModalConfirmationMetaAction({
                    onConfirm: async () => dispatch(deleteProductAction(id)).then(sendRequest)
                })
            );
        },
        [dispatch, sendRequest]
    );
    const handleEditBtnClick = useCallback(
        (event: React.SyntheticEvent): void => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            dispatch(setActiveTabAction('edit'));
            dispatch(fetchProductAction(id));
        },
        [items, dispatch]
    );

    const handleShowMore = (productId: number) => {
        const nextCheckedItems = { ...showMoreConfigs };
        nextCheckedItems[productId] = !nextCheckedItems[productId];
        setShowMoreConfigs(nextCheckedItems);
    };

    const renderConfigurationColors = (configuration: any, productId: number) => {
        return (
            <>
                {configuration.map((config: any) => (
                    <div
                        key={config.color_code}
                        className="rounded-full w-3 h-3 inline-block mr-1"
                        style={{ backgroundColor: `${config.color_code}` }}
                    />
                ))}
                <div
                    className="block text-gray-180 text-[9px] cursor-pointer"
                    role="presentation"
                    onClick={() => handleShowMore(productId)}>
                    <span className="border rounded-lg pt-0.5 pb-0.5 pl-1.5 pr-1.5 uppercase">
                        {t('Show more')}
                    </span>
                </div>
            </>
        );
    };

    const renderConfiguration = (configuration: any, productId: number) => {
        return (
            <table className="w-full">
                <tbody>
                    {configuration.map((config: any) => (
                        <tr key={config.color_id}>
                            <td>
                                <div
                                    className="rounded-full w-3 h-3 inline-block mt-1"
                                    style={{ backgroundColor: `${config.color_code}` }}
                                />
                            </td>
                            <td>
                                <Fragment>
                                    {config.configuration.map((_config: any) => (
                                        <div key={_config.size_name} className="block">
                                            <span className="ml-5 w-[30px] inline-block">
                                                {_config.size_name}
                                            </span>
                                            <span className="ml-5 w-[50px] inline-block">
                                                &euro;{_config.price}
                                            </span>
                                            <span className="ml-5 w-[50px] inline-block">
                                                {_config.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </Fragment>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>
                            <div
                                className="block text-gray-180 text-[9px] cursor-pointer"
                                role="presentation"
                                onClick={() => handleShowMore(productId)}>
                                <span className="border rounded-lg pt-0.5 pb-0.5 pl-1 pr-1 uppercase">
                                    {t('Show less')}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div className="inline-block min-w-full overflow-hidden align-middle">
                <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10">
                    <h2 className="text-gray-350 font-bold font-base">
                        Search Results{' '}
                        <span className="text-gray-180 font-normal text-sm">({count} Results)</span>
                    </h2>
                    <FilterValues locale={locale} />
                </div>
                <DataTable
                    paginationType={PaginationType.PRODUCTS}
                    totalAmount={count}
                    sendRequest={sendRequest}
                    sendDeleteRequest={sendDeleteRequest}
                    sendCopyRequest={sendCopyRequest}>
                    {items?.map((item: any) => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => dispatch(checkIdsAction(item.id))}
                                    value={item.id}
                                    checked={
                                        checkedIds.find((data: any) => data.id === item.id)
                                            ?.checked || false
                                    }
                                />
                            </td>
                            <td>
                                {item.previewphoto && (
                                    <img
                                        src={`${baseApiUrl}/${item.previewphoto}`}
                                        alt=""
                                        // className="object-cover h-[85px]"
                                        className="object-scale-down h-[95px] w-[85px] rounded-lg border p-1.5"
                                    />
                                )}
                                {!item.previewphoto && (
                                    <div className="border rounded-lg w-[85px] h-[95px] flex items-center text-center">
                                        <BanIcon
                                            width={30}
                                            height={30}
                                            className="m-auto text-gray-200"
                                        />
                                    </div>
                                )}
                            </td>
                            <td>
                                <span className="text-gray-180">Ref.</span>{' '}
                                <span className="text-blue-350">{item.id}</span> <br />
                                {item.name}
                                <br />
                                <div
                                    className="text-blue-350 mt-4 block font-normal text-[10px]"
                                    dangerouslySetInnerHTML={{
                                        __html: `${item.description.substring(0, 250)} ...`
                                    }}
                                />
                            </td>
                            <td className="w-[300px]">
                                {showMoreConfigs[item.id] &&
                                    renderConfiguration(item.configuration, item.id)}
                                {!showMoreConfigs[item.id] &&
                                    renderConfigurationColors(item.configuration, item.id)}
                            </td>
                            <td className="text-right whitespace-nowrap">
                                <ButtonTableAction
                                    dataId={String(item.id)}
                                    localeKey="Edit"
                                    className={'btn-edit'}
                                    onClick={handleEditBtnClick}
                                />
                                <ButtonTableAction
                                    dataId={String(item.id)}
                                    onClick={handleDuplicateBtnClick}
                                    localeKey="Duplicate"
                                    className={'btn-copy'}
                                />
                                <ButtonTableAction
                                    dataId={String(item.id)}
                                    onClick={handleDeleteBtnClick}
                                    localeKey="Delete"
                                    className={'btn-delete'}
                                />
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </>
    );
};

export default ListProducts;
