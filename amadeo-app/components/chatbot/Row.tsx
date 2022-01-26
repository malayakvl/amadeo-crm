import React from 'react';
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
    handleActiveBtnClick,
    itemActive
}) => {
    const dispatch = useDispatch();
    const showedItems = useSelector(showedItemsSelector);
    const checkedIds = useSelector(checkedIdsSelector);

    const parseProduct = (data: any) => {
        let product;
        if (data) {
            product = JSON.parse(data);
        }
        return <>{data ? product[0].name : ''}</>;
    };

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
                    {!disableChecker && (
                        <label
                            htmlFor={item.id}
                            className="flex items-center cursor-pointer relative mt-1">
                            <input
                                type="checkbox"
                                id={item.id}
                                className="sr-only"
                                value={`switcher_${item.id}`}
                                checked={itemActive}
                                onChange={() => {
                                    handleActiveBtnClick(item.id);
                                }}
                            />
                            <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                        </label>
                    )}
                </td>
                <td>
                    <span className="overflow-hidden max-w-[500px] block text-ellipsis">
                        {item.name}
                    </span>
                </td>
                <td>
                    <span className="overflow-hidden max-w-[500px] block text-ellipsis">
                        {item.keywords}
                    </span>
                </td>
                <td>{parseProduct(item.product)}</td>
                <td>{parseProduct(item.discount)}</td>
                <td>{item.answer_count}</td>
                <td
                    className="chat-eye cursor-pointer"
                    role="presentation"
                    onClick={() => dispatch(showItemAction(item.id))}>
                    <i className={showedItems.includes(item.id) ? 'eye' : 'eye-cross'} />
                </td>
                <td className="actions" style={{ width: '150px' }}>
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
                <td colSpan={6} className="translations">
                    <i className="trans-fr" />
                    <div className="shadow-border float-left ml-5 mb-5 translations-msg">
                        <div
                            className="pl-5 inline-block"
                            dangerouslySetInnerHTML={{
                                __html: item.message_fr
                            }}
                        />
                    </div>
                    <div className="clear-both" />
                    <i className="trans-en" />
                    <div className="shadow-border float-left ml-5 mb-5 translations-msg">
                        <div
                            className="pl-5 inline-block"
                            dangerouslySetInnerHTML={{
                                __html: item.message_en
                            }}
                        />
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Row;
