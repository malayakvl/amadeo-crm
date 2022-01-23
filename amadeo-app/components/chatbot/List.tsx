import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/chatbot/selectors';
import { fetchDataAction } from '../../redux/chatbot';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { Row } from './index';
import { initIdsAction, setModalConfirmationMetaAction } from '../../redux/layouts';
import { deleteAction, fetchFormAction, bulkDeleteAction } from '../../redux/chatbot/actions';

const ListMessages: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);

    const sendRequest = useCallback(() => {
        return dispatch(fetchDataAction('users'));
    }, [dispatch]);

    const sendDeleteRequest = useCallback(() => {
        return dispatch(bulkDeleteAction());
    }, [dispatch]);

    const handleDeleteBtnClick = useCallback(
        (event: React.SyntheticEvent): void => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            dispatch(
                setModalConfirmationMetaAction({
                    onConfirm: async () => dispatch(deleteAction(id)).then(sendRequest)
                })
            );
        },
        [dispatch, sendRequest]
    );
    const handleEditBtnClick = useCallback(
        (event: React.SyntheticEvent): void => {
            const id = Number(event.currentTarget.getAttribute('data-id'));
            // dispatch(
            //     setActivePageAction({
            //         type: 'inventory',
            //         modifier: 'edit'
            //     })
            // );
            dispatch(fetchFormAction(id));
        },
        [items, dispatch]
    );

    useEffect(() => {
        const setupChecked: any = [];
        items.forEach((item: Products.ProductItem) => {
            setupChecked.push({ id: item.id, checked: false });
        });
        dispatch(initIdsAction(setupChecked));
    }, [items]);

    // const handleActiveBtnClick = (id: number) => {
    //     console.log(`ITEM ID ${id}`);
    // };

    return (
        <div className="mt-7">
            <DataTable
                paginationType={PaginationType.CHATBOT}
                totalAmount={count}
                sendDeleteRequest={sendDeleteRequest}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <Row
                        key={item.id}
                        item={item}
                        handleEditBtnClick={handleEditBtnClick}
                        handleDeleteBtnClick={handleDeleteBtnClick}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
