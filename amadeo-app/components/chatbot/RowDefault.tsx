import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showedItemsSelector } from '../../redux/chatbot/selectors';
import { showItemAction } from '../../redux/chatbot';
import { ButtonTableAction } from '../_common';

const Row: React.FC<any> = ({ item, handleEditBtnClick, handleDeleteBtnClick }) => {
    const dispatch = useDispatch();
    const showedItems = useSelector(showedItemsSelector);

    return (
        <>
            <tr>
                <td>
                    <span className="overflow-hidden max-w-[500px] block text-ellipsis">
                        {item.keywords}
                    </span>
                </td>
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
                <td colSpan={2} className="translations" style={{ paddingLeft: '16px' }}>
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
