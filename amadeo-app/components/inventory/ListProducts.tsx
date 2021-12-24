import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowMoreText from 'react-show-more-text';
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

const ListProducts: React.FC = () => {
    const dispatch = useDispatch();
    const count = useSelector(productsCountSelector);
    const items = useSelector(paginatedProductsSelector);
    const checkedIds = useSelector(checkedIdsSelector);

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

    const renderConfiguration = (configuration: any) => {
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
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div className="inline-block min-w-full overflow-hidden align-middle">
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
                                <img
                                    src={`${baseApiUrl}/${item.previewphoto}`}
                                    alt=""
                                    className="object-cover h-[85px]"
                                />
                            </td>
                            <td>
                                <span className="text-gray-180">Ref.</span>{' '}
                                <span className="text-blue-350">{item.id}</span> <br />
                                {item.name}
                                <br />
                                <span className="text-blue-350 mt-4 block font-normal text-[10px]">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={2}
                                        more="Show more"
                                        less="Show less"
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        width={0}
                                        expanded={false}
                                        truncatedEndingComponent={'... '}>
                                        {item.description}
                                    </ShowMoreText>
                                </span>
                            </td>
                            <td className="w-[300px]">{renderConfiguration(item.configuration)}</td>
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
