import { useCallback } from "react";
import { ButtonTableAction, DataTable } from "../../components/_common";
import { PaginationType } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { fetchShippingAction } from "../../redux/shipping/actions";
import { shippingsSelector } from '../../redux/shipping/selectors'

export default function List() {
    const dispatch = useDispatch()

    const sendRequest = useCallback(() => {
        return dispatch(fetchShippingAction())
    }, [dispatch]);

    const items = useSelector(shippingsSelector);

    return (
        <>
            <DataTable
                paginationType={PaginationType.SHIPPING}
                totalAmount={10}
                sendRequest={sendRequest}
                sendDeleteRequest={() => new Promise((resolve, reject) => { })}
                sendCopyRequest={() => new Promise((resolve, reject) => { })}>
                {items?.map((item: Shipping) => (
                    <tr key={item.id}>
                        <td>
                            <input
                                type="checkbox"
                                value={item.id}
                            />
                        </td>
                        <td>
                            {item.method}
                        </td>
                        <td>
                            {item.price}
                        </td>
                        <td>
                            <input type="checkbox" checked={item.enabled} />
                        </td>
                        <td className="text-right whitespace-nowrap">
                            <ButtonTableAction
                                dataId={String(item.id)}
                                localeKey="Edit"
                                className={'btn-edit'}
                                onClick={() => {}}
                            />
                        </td>
                    </tr>
                ))}
            </DataTable>
        </>
    )

}