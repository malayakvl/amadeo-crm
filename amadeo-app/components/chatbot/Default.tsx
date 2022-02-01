import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { itemsSystemSelector } from '../../redux/chatbot/selectors';
import { RowDefault } from './index';
import { fetchDataSystemAction } from '../../redux/chatbot';

const DefaultMessages: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const items = useSelector(itemsSystemSelector);

    useEffect(() => {
        dispatch(fetchDataSystemAction('system'));
    }, []);

    return (
        <>
            <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10">
                <h2 className="dark-blue-header">
                    {t('System Replies')}
                    <span className="text-gray-180 font-normal text-sm"> {t('Mandatory')}</span>
                </h2>
            </div>
            <div className="system-message">
                <table className="w-full float-table">
                    <thead>
                        <tr>
                            {/*<th />*/}
                            {/*<th />*/}
                            <th>
                                <i className="scenario" />
                                {t('Scenario')}
                            </th>
                            {/*<th className="text-left">*/}
                            {/*    <i className="message" />*/}
                            {/*    {t('Trigger')}*/}
                            {/*</th>*/}
                            {/*<th />*/}
                            {/*<th />*/}
                            <th className="chat-eye sorting_disabled">
                                <i className="eye" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item: any) => (
                            <RowDefault key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DefaultMessages;
