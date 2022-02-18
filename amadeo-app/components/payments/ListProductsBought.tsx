import React, { useState } from 'react';
import Image from 'next/image';
import { ProductDetails } from './';

const ListProductsBought: React.FC<{ item: Payments.DataItemDetailed }> = ({ item }) => {
    const { order_items = [], order_amount, total_amount, shipping_amount } = item ?? {};
    const [showMoreConfigs, setShowMoreConfigs] = useState<boolean[]>([]);

    const handlerShowMore = (index: number) => {
        const nextCheckedItems = { ...showMoreConfigs };
        nextCheckedItems[index] = !nextCheckedItems[index];
        setShowMoreConfigs(nextCheckedItems);
    };

    return (
        <div className="mt-7 min-w-max">
            {order_items.map((product: any, index: number) => (
                <>
                    <div
                        className="flex justify-between mt-4 font-bold text-gray-350 cursor-pointer"
                        key={index}
                        role="switch"
                        tabIndex={0}
                        aria-checked={showMoreConfigs[index]}
                        aria-labelledby="showMore"
                        onClick={() => handlerShowMore(index)}
                        onKeyDown={(e) =>
                            (e.key === ' ' || e.key === 'Enter') && handlerShowMore(index)
                        }>
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

                    <ProductDetails
                        product={product}
                        className={!showMoreConfigs[index] ? 'hidden' : ''}
                    />
                </>
            ))}

            <div className="mt-4 pt-4 text-gray-350 text-lg text-right border-t border-gray-200">
                + VAT (20%)
                <span className="inline-block ml-4 font-bold min-w-[3rem]">
                    {+(order_amount * 0.2).toFixed(2)} &euro;
                </span>
            </div>

            <div className="py-1 text-gray-350 text-lg text-right">
                + Shipping
                <span className="inline-block ml-4 font-bold min-w-[3rem]">
                    {+Number(shipping_amount).toFixed(2)} &euro;
                </span>
            </div>

            <div className="text-gray-350 text-2xl text-right">
                Order total
                <span className="inline-block ml-4 font-bold min-w-[5rem]">
                    {+Number(total_amount).toFixed(2)} &euro;
                </span>
            </div>
        </div>
    );
};

export default ListProductsBought;
