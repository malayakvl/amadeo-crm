import React from 'react';
import { useTranslations } from 'next-intl';

const Row: React.FC<any> = ({ item }) => {
    const t = useTranslations();

    return (
        <>
            <tr>
                <td className="actions">
                    <i className="action-triangle" />
                </td>
                <td>
                    <label htmlFor="1" className="flex items-center cursor-pointer relative mt-1">
                        <input type="checkbox" id="1" className="sr-only" />
                        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                    </label>
                </td>
                <td style={{ width: '20%' }}>{item.name}</td>
                <td>{item.trigger}</td>
                <td className="chat-eye">
                    <i className="eye" />
                </td>
            </tr>
            <tr className="hidden">
                <td />
                <td colSpan={4} className="translations">
                    <i className="trans-fr" />
                    <div className="shadow-border float-left ml-5 mb-5 translations-msg">
                        <div
                            className="pl-5 inline-block"
                            dangerouslySetInnerHTML={{
                                __html: t('how_to_use_cahtbot')
                            }}
                        />
                    </div>
                    <div className="clear-both" />
                    <i className="trans-en" />
                    <div className="shadow-border float-left ml-5 mb-5 translations-msg">
                        <div
                            className="pl-5 inline-block"
                            dangerouslySetInnerHTML={{
                                __html: t('how_to_use_cahtbot')
                            }}
                        />
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Row;
