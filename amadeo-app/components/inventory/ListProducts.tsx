import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable, ButtonTableAction } from '../../components/_common';
import { PaginationType } from '../../constants';
import { checkedIdsSelector } from '../../redux/layouts/selectors';
import { checkIdsAction, initIdsAction } from '../../redux/layouts';
import { paginatedProductsSelector, productsCountSelector } from '../../redux/products/selectors';
import { fetchProductsAction, bulkDeleteAction } from '../../redux/products/actions';
import { baseApiUrl } from '../../constants';

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
            console.log(id);
            // dispatch(setFormsModalIdAction(id));
        },
        [dispatch]
    );

    const handleDeleteBtnClick = useCallback(
        (event: React.SyntheticEvent): void => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            console.log(id);
            // dispatch(
            //     setModalConfirmationMetaAction({
            //         onConfirm: async () => dispatch(deleteFormAction(id)).then(sendRequest),
            //     })
            // );
        },
        [dispatch, sendRequest]
    );

    return (
        <>
            <div className="inline-block min-w-full overflow-hidden align-middle">
                <DataTable
                    paginationType={PaginationType.PRODUCTS}
                    totalAmount={count}
                    sendRequest={sendRequest}
                    sendDeleteRequest={sendDeleteRequest}>
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
                                <img src={`${baseApiUrl}/${item.previewphoto}`} alt="" width={85} />
                            </td>
                            <td>
                                <span className="text-gray-180">Ref.</span>{' '}
                                <span className="text-blue-350">{item.id}</span> <br />
                                {item.name}
                                <br />
                                <span className="text-blue-350 mt-4 block font-normal text-[10px]">
                                    {item.description}
                                </span>
                            </td>
                            <td>coming soon</td>
                            <td className="text-right">
                                <ButtonTableAction
                                    dataId={String(item.id)}
                                    localeKey="Edit"
                                    className={'edit'}
                                />
                                <ButtonTableAction
                                    dataId={String(item.id)}
                                    onClick={handleDuplicateBtnClick}
                                    localeKey="Duplicate"
                                    className={'copy'}
                                />
                                <ButtonTableAction
                                    dataId={String(item.id)}
                                    onClick={handleDeleteBtnClick}
                                    localeKey="Delete"
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
