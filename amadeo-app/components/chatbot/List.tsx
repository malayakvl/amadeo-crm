import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/chatbot/selectors';
import { fetchDataAction } from '../../redux/chatbot';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { Row } from './index';
import { initIdsAction, setModalConfirmationMetaAction } from '../../redux/layouts';
import {
    deleteAction,
    fetchFormAction,
    bulkDeleteAction,
    changeActiveAction,
    changeActiveAllAction
} from '../../redux/chatbot/actions';
import { switchHeaderSelector } from '../../redux/layouts/selectors';

const ListMessages: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);
    const switchAllHeader = useSelector(switchHeaderSelector);
    const [itemActiveChecked, setItemActiveChecked] = useState<any>({});

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
            dispatch(fetchFormAction(id));
        },
        [items, dispatch]
    );
    const handleActiveBtnClick = (id: number) => {
        const nextCheckedItems = { ...itemActiveChecked };
        nextCheckedItems[id] = !nextCheckedItems[id];
        setItemActiveChecked(nextCheckedItems);
        dispatch(changeActiveAction(id));
    };

    useEffect(() => {
        const setupChecked: any = [];
        const nextCheckedItems = { ...itemActiveChecked };
        items.forEach((item: any) => {
            setupChecked.push({ id: item.id, checked: false });
            nextCheckedItems[item.id] = item.active;
        });
        setItemActiveChecked(nextCheckedItems);
        dispatch(initIdsAction(setupChecked));
    }, [items]);

    useEffect(() => {
        if (items.length) {
            const nextCheckedItems: any = {};
            items.forEach((item: any) => {
                nextCheckedItems[item.id] = switchAllHeader;
            });
            dispatch(changeActiveAllAction(switchAllHeader));
            setItemActiveChecked(nextCheckedItems);
        }
    }, [switchAllHeader]);

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
                        handleActiveBtnClick={handleActiveBtnClick}
                        itemActive={itemActiveChecked[item.id]}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
