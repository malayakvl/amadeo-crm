import React from 'react';
import Image from 'next/image';

const ListProductsBought: React.FC<{ item: Payments.DataItemDetailed }> = ({ item }) => {
    const { order_items = [], order_amount } = item ?? {};

    return (
        <div className="mt-7 min-w-max">
            {order_items.map((product: any, index: number) => (
                <div className="flex justify-between my-4 font-bold text-gray-350" key={index}>
                    <div className="flex items-center">
                        <div className="w-2 mr-2">
                            <Image
                                width="12"
                                height="14"
                                src={`/images/action-arrow.svg`}
                                className="text-orange-450"
                            />
                        </div>
                        {product.name}
                    </div>

                    <div className="text-right">{product.price * product.quantity} &euro;</div>
                </div>
            ))}

            <div className="mt-4 pt-4 text-gray-350 text-lg text-right border-t border-gray-200">
                + VAT (20%)
                <span className="ml-4 font-bold">
                    {((order_amount / 1.2) * 0.2).toFixed(2)} &euro;
                </span>
            </div>

            <div className="text-gray-350 text-2xl text-right">
                Order total
                <span className="ml-4 font-bold">{order_amount} &euro;</span>
            </div>
        </div>
    );
};

export default ListProductsBought;
