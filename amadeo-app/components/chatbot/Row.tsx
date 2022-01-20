import React from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { showedItemsSelector } from '../../redux/chatbot/selectors';
import { showItemAction } from '../../redux/chatbot';
import { ButtonTableAction } from '../_common';
import { checkIdsAction } from '../../redux/layouts';
import { checkedIdsSelector } from '../../redux/layouts/selectors';

const Row: React.FC<any> = ({
    item,
    disableChecker,
    handleEditBtnClick,
    handleDeleteBtnClick,
    handleActiveBtnClick
}) => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showedItems = useSelector(showedItemsSelector);
    const checkedIds = useSelector(checkedIdsSelector);

    return (
        <>
            <tr>
                <td className="ids">
                    {!disableChecker && (
                        <input
                            className="float-checkbox"
                            type="checkbox"
                            onChange={() => dispatch(checkIdsAction(item.id))}
                            value={item.id}
                            checked={
                                checkedIds.find((data: any) => data.id === item.id)?.checked ||
                                false
                            }
                        />
                    )}
                </td>
                <td>
                    {/*{disableChecker && (*/}
                    {/*    <label*/}
                    {/*        htmlFor={item.id}*/}
                    {/*        className="flex items-center cursor-pointer relative mt-1">*/}
                    {/*        <input*/}
                    {/*            type="checkbox"*/}
                    {/*            id={item.id}*/}
                    {/*            className="sr-only"*/}
                    {/*            checked={true}*/}
                    {/*        />*/}
                    {/*        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />*/}
                    {/*    </label>*/}
                    {/*)}*/}
                    {!disableChecker && (
                        <label
                            htmlFor={`swithcer_${item.id}`}
                            className="flex items-center cursor-pointer relative mt-1">
                            <input
                                type="checkbox"
                                id={item.id}
                                className="sr-only"
                                value={`switcher_${item.id}`}
                                checked={item.active || false}
                                onChange={() => {
                                    handleActiveBtnClick(item.id);
                                }}
                            />
                            <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                        </label>
                    )}
                </td>
                <td style={{ width: '20%' }}>{item.name}</td>
                <td>{item.trigger}</td>
                <td
                    className="chat-eye cursor-pointer"
                    role="presentation"
                    onClick={() => dispatch(showItemAction(item.id))}>
                    <i className={showedItems.includes(item.id) ? 'eye' : 'eye-cross'} />
                </td>
                <td className="actions">
                    <ButtonTableAction
                        dataId={String(item.id)}
                        localeKey="Edit"
                        className={'btn-edit'}
                        onClick={handleEditBtnClick}
                    />
                    <ButtonTableAction
                        dataId={String(item.id)}
                        onClick={handleDeleteBtnClick}
                        localeKey="Delete"
                        className={'btn-delete'}
                    />
                </td>
            </tr>
            <tr className={showedItems.includes(item.id) ? '' : 'hidden'}>
                <td />
                <td colSpan={5} className="translations">
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
