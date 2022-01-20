import React, { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, itemsSystemSelector } from '../../redux/chatbot/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { Row } from './index';
import { fetchDataSystemAction } from '../../redux/chatbot';

const DefaultMessages: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const items = useSelector(itemsSystemSelector);
    const count = useSelector(itemsCountSelector);

    const sendRequest = useCallback(() => {
        return dispatch(fetchDataSystemAction('system'));
    }, [dispatch]);

    return (
        <>
            <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10">
                <h2 className="dark-blue-header">
                    {t('System Replies')}
                    <span className="text-gray-180 font-normal text-sm"> {t('Mandatory')}</span>
                </h2>
            </div>
            <div className="system-message">
                <DataTable
                    hidePaginationBar={true}
                    paginationType={PaginationType.CHATBOT}
                    totalAmount={count}
                    sendRequest={sendRequest}>
                    {items?.map((item: any) => (
                        <Row key={item.id} item={item} disableChecker={true} />
                    ))}
                </DataTable>
            </div>
        </>
    );
};

export default DefaultMessages;
