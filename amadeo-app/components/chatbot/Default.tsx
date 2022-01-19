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
                    <span className="text-gray-180 font-normal text-sm"> (Mandatory)</span>
                </h2>
            </div>
            <DataTable
                hidePaginationBar={true}
                paginationType={PaginationType.CHATBOT}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <Row key={item.id} item={item} />
                ))}
            </DataTable>
            {/*<table className="min-w-full float-table">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th />*/}
            {/*        <th>*/}
            {/*            <label*/}
            {/*                htmlFor="switchAll"*/}
            {/*                className="flex items-center cursor-pointer relative">*/}
            {/*                <input type="checkbox" id="switchAll" className="sr-only" />*/}
            {/*                <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />*/}
            {/*            </label>*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <i className="scenario" />*/}
            {/*            Scenario*/}
            {/*        </th>*/}
            {/*        <th>*/}
            {/*            <i className="message" />*/}
            {/*            Trigger*/}
            {/*        </th>*/}
            {/*        <th className="chat-eye">*/}
            {/*            <i className="eye" />*/}
            {/*        </th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    <tr>*/}
            {/*        <td className="actions">*/}
            {/*            <i className="action-triangle" />*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <label*/}
            {/*                htmlFor="1"*/}
            {/*                className="flex items-center cursor-pointer relative mt-1">*/}
            {/*                <input*/}
            {/*                    type="checkbox"*/}
            {/*                    id="1"*/}
            {/*                    className="sr-only"*/}
            {/*                />*/}
            {/*                <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />*/}
            {/*            </label>*/}
            {/*        </td>*/}
            {/*        <td>First added item</td>*/}
            {/*        <td>Buyer successfully added wanted item to his cart *for the first time/ first item of the live</td>*/}
            {/*        <td className="chat-eye">*/}
            {/*            <i className="eye" />*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <td />*/}
            {/*        <td colSpan={4} className="translations">*/}
            {/*            <i className="trans-fr" />*/}
            {/*            <div className="shadow-border float-left ml-5 mb-5" style={{ width: 'calc(100% - 60px);' }}>*/}
            {/*                <div*/}
            {/*                    className="pl-5 inline-block"*/}
            {/*                    dangerouslySetInnerHTML={{*/}
            {/*                        __html: t('how_to_use_cahtbot')*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="clear-both" />*/}
            {/*            <i className="trans-en" />*/}
            {/*            <div className="shadow-border float-left ml-5" style={{ width: 'calc(100% - 60px);' }}>*/}
            {/*                <div*/}
            {/*                    className="pl-5 inline-block"*/}
            {/*                    dangerouslySetInnerHTML={{*/}
            {/*                        __html: t('how_to_use_cahtbot')*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <td className="actions">*/}
            {/*            <i className="action-triangle" />*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <label*/}
            {/*                htmlFor="1"*/}
            {/*                className="flex items-center cursor-pointer relative mt-1">*/}
            {/*                <input*/}
            {/*                    type="checkbox"*/}
            {/*                    id="1"*/}
            {/*                    className="sr-only"*/}
            {/*                />*/}
            {/*                <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />*/}
            {/*            </label>*/}
            {/*        </td>*/}
            {/*        <td>First added item</td>*/}
            {/*        <td>Buyer successfully added wanted item to his cart *for the first time/ first item of the live</td>*/}
            {/*        <td className="chat-eye">*/}
            {/*            <i className="eye" />*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </>
    );
};

export default DefaultMessages;
