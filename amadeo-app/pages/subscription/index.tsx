import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';
import { getSession, useSession } from 'next-auth/client';
import { showLoaderAction } from '../../redux/layouts/actions';
import { fetchFormAction } from '../../redux/paymentPlans';
import { itemsSelector } from '../../redux/paymentPlans/selectors';
import { formatCurrency, parseTranslation } from '../../lib/functions';

type PriceProps = {
    name: string;
    price: number;
    desc: string;
    sale: number;
    buttonText: string;
    imageSrc: string;
    disabled?: boolean;
    selected: boolean;
    onClick: any;
};

const Price = ({
    name,
    price,
    desc,
    sale,
    buttonText,
    imageSrc,
    disabled,
    selected,
    onClick
}: PriceProps) => {
    const t = useTranslations();

    return (
        <div
            className={`lg:w-56 p-2 lg:p-4 flex flex-col border-2 lg:border-b-0 ${
                selected ? 'rounded-xl lg:rounded-b-none border-orange-450' : 'border-white'
            }`}>
            <div className="w-full h-32 lg:h-64 relative mx-auto">
                <Image src={imageSrc} layout="fill" className="object-contain object-center" />
            </div>
            <div className="font-bold text-xl mb-2 flex flex-wrap items-center justify-center lg:justify-between">
                {name}
                {name === 'Business' && (
                    <div className="text-[10px] border border-orange-450 rounded-lg p-1 text-orange-450">
                        {t('Most popular')}
                    </div>
                )}
            </div>
            <div className="h-full text-sm">{desc}</div>
            <div className="text-2xl lg:text-4xl font-bold min-h-[6rem]">
                {formatCurrency(price)}
                <span className="text-base"> /month</span>
                {sale > 0 && <div className="text-xs font-bold">{sale}% of sale</div>}
            </div>

            <button
                onClick={onClick}
                className={`${
                    disabled ? 'disabled-btn' : 'gradient-btn'
                } w-full mt-7 justify-self-end`}>
                {buttonText}
            </button>
            {/* <div className="mt-7 mb-auto">{permissions}</div>
            <button
                onClick={onClick}
                className={`${disabled ? 'disabled-btn' : 'gradient-btn'} w-full`}>
                {buttonText}
            </button> */}
        </div>
    );
};

export default function Subscription({ locale }: { locale: any }) {
    const [selected, setSelected] = useState('business');
    const dispatch = useDispatch();
    const plans = useSelector(itemsSelector);

    useEffect(() => {
        dispatch(showLoaderAction(true));
        dispatch(fetchFormAction());
    }, []);

    const t = useTranslations();

    const Tick = ({
        disabled,
        className,
        selected
    }: {
        disabled?: boolean;
        className?: string;
        selected?: boolean;
    }) => (
        <div
            className={`min-w-[4rem] lg:min-w-[14rem] lg:w-56 
            ${selected ? 'lg:border-l-2 lg:border-r-2 border-orange-450' : 'border-white'}
            ${className || ''}`}>
            {!disabled ? (
                <div className="w-4 h-4 lg:w-6 lg:h-6 relative mx-auto">
                    <Image src="/images/tick.svg" layout="fill" />
                </div>
            ) : (
                ' '
            )}
        </div>
    );

    const parsePlanValues = (plans: any) => {
        const selectedIndex = selected === 'basic' ? 0 : selected === 'business' ? 1 : 2;
        return (
            <>
                {plans.map((option: any, index: number) => (
                    <Fragment key={option.plan.id}>
                        {option.value ? (
                            <Tick selected={index === selectedIndex} />
                        ) : (
                            <Tick selected={index === selectedIndex} disabled />
                        )}
                    </Fragment>
                ))}
            </>
        );
    };

    const parseOptions = (data: any, locale: string) => {
        return (
            <>
                {data.map((data: any) => (
                    <Fragment key={data.option.id}>
                        <div className="space-x-0 lg:space-x-10 flex justify-between lg:justify-end items-stretch">
                            <div className="flex-grow mb-4">
                                {parseTranslation(data.option, 'name', locale)}
                            </div>
                            {parsePlanValues(
                                data.values
                                // data.option.id,
                                // parseTranslation(data.option, 'name', locale)
                            )}
                        </div>
                    </Fragment>
                ))}
            </>
        );
    };

    return (
        <div className="text-gray-350 font-medium max-w-[1440px] mx-auto px-5 my-12 lg:my-16">
            <div className="text-center">
                <div className="text-xs font-bold">{t('Pricing_And_Plans')}</div>
                <div className="mb-3 font-bold text-4xl">{t('Pricing that fits your size')}</div>
                <div>
                    {t(
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                    )}
                </div>
            </div>

            {/*<div className="underline text-center mt-8 lg:mt-10">*/}
            {/*    <Link href="/dashboard">*/}
            {/*        <a>{t('Skip for now (Take trial)')}</a>*/}
            {/*    </Link>*/}
            {/*</div>*/}

            <div className="lg:space-x-10 flex justify-end items-stretch text-center lg:text-left mt-8 lg:mt-10">
                <Price
                    onClick={() => setSelected('basic')}
                    name={t('Basic')}
                    selected={selected === 'basic'}
                    price={49}
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    sale={0}
                    buttonText="Select"
                    imageSrc={'/images/box.png'}
                />
                <Price
                    onClick={() => setSelected('business')}
                    name={t('Business')}
                    selected={selected === 'business'}
                    price={99}
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    sale={5}
                    buttonText="Select"
                    imageSrc={'/images/store.png'}
                />
                <Price
                    onClick={() => false}
                    selected={selected === 'platinum'}
                    disabled
                    name={t('Platinum')}
                    price={139}
                    buttonText="Soon"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    sale={3}
                    imageSrc={'/images/briefcase.png'}
                />
            </div>

            <div className="text-xs lg:text-sm">
                {plans.values.map((values: any) => (
                    <Fragment key={values.group.id}>
                        <div className="space-x-0 lg:space-x-10 flex justify-between lg:justify-end items-stretch">
                            <div className="flex-grow font-bold text-2xl my-6 sm:mt-4">
                                {parseTranslation(values.group, 'name', locale)}
                            </div>
                            <div
                                className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 relative p-3 sm:hidden ${
                                    selected === 'basic'
                                        ? 'sm:border-l-2 sm:border-r-2 border-orange-450'
                                        : 'border-white'
                                }`}>
                                <Image
                                    src={'/images/box.png'}
                                    layout="responsive"
                                    width="36"
                                    height="36"
                                    className="object-contain object-center"
                                />
                            </div>

                            <div
                                className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 p-3 relative sm:hidden ${
                                    selected === 'business'
                                        ? 'sm:border-l-2 sm:border-r-2 border-orange-450'
                                        : 'border-white'
                                }`}>
                                <Image
                                    src={'/images/store.png'}
                                    layout="responsive"
                                    width="36"
                                    height="36"
                                    className="object-contain object-center"
                                />
                            </div>

                            <div
                                className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 p-3 relative sm:hidden ${
                                    selected === 'platinum'
                                        ? 'sm:border-l-2 sm:border-r-2 border-orange-450'
                                        : 'border-white'
                                }`}>
                                <Image
                                    src={'/images/briefcase.png'}
                                    layout="responsive"
                                    width="36"
                                    height="36"
                                    className="object-contain object-center"
                                />
                            </div>
                            <Tick
                                disabled
                                selected={selected === 'basic'}
                                className="hidden sm:block"
                            />
                            <Tick
                                disabled
                                selected={selected === 'business'}
                                className="hidden sm:block"
                            />
                            <Tick
                                disabled
                                selected={selected === 'platinum'}
                                className="hidden sm:block"
                            />
                        </div>
                        {parseOptions(values.values, locale)}
                    </Fragment>
                ))}

                <div className="space-x-0 lg:space-x-10 flex justify-between lg:justify-end items-stretch">
                    <div className="flex-grow font-bold text-2xl mb-4 lg:mt-8 mt-0">{''}</div>

                    <div
                        className={`min-w-[4rem] lg:min-w-[14rem] lg:w-56 w-3 ${
                            selected === 'basic'
                                ? 'lg:border-2 lg:border-t-0 lg:rounded-b-xl border-orange-450'
                                : 'border-white'
                        }`}
                    />

                    <div
                        className={`min-w-[4rem] lg:min-w-[14rem] lg:w-56 w-3 ${
                            selected === 'business'
                                ? 'lg:border-2 lg:border-t-0 lg:rounded-b-xl border-orange-450'
                                : 'border-white'
                        }`}
                    />

                    <div
                        className={`min-w-[4rem] lg:min-w-[14rem] lg:w-56 w-3 ${
                            selected === 'platinum'
                                ? 'lg:border-2 lg:border-t-0 lg:rounded-b-xl border-orange-450'
                                : 'border-white'
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { locale } = context;
    const session = await getSession(context);

    return {
        props: {
            session,
            locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}

Subscription.Layout = ({ children }: { children: any }) => {
    const user = useSelector(userSelector);
    const [session] = useSession();
    console.log(user);
    console.log(session);
    return children;
};
