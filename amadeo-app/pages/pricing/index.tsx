import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';
import { getSession, useSession } from 'next-auth/client';
import { showLoaderAction } from '../../redux/layouts/actions';
import { fetchFormAction } from '../../redux/paymentPlans';
import { itemsSelector } from '../../redux/paymentPlans/selectors';
import { parseTranslation } from '../../lib/functions';

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
            className={`sm:w-56 p-2 sm:p-4 flex flex-col border-2 sm:border-b-0 ${
                selected ? 'rounded-xl sm:rounded-b-none border-orange-450' : 'border-white'
            }`}>
            <div className="w-32 h-32 sm:w-36 sm:h-64 relative mx-auto">
                <Image src={imageSrc} layout="fill" className="object-contain object-center" />
            </div>
            <div className="font-bold text-xl mb-2 flex flex-wrap items-center justify-center sm:justify-between">
                {name}
                {name === 'Business' && (
                    <div className="text-[10px] border border-orange-450 rounded-lg p-1 text-orange-450">
                        {t('Most popular')}
                    </div>
                )}
            </div>
            <div className="h-full text-sm">{desc}</div>
            <div className="text-2xl sm:text-4xl font-bold min-h-[6rem]">
                € {price}
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

export default function Pricing({ locale }: { locale: any }) {
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
            className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 
            ${selected ? 'sm:border-l-2 sm:border-r-2 border-orange-450' : 'border-white'}
            ${className || ''}`}>
            {!disabled ? (
                <div className="w-4 h-4 sm:w-6 sm:h-6 relative mx-auto">
                    <Image src="/images/tick.svg" layout="fill" />
                </div>
            ) : (
                ' '
            )}
        </div>
    );

    const parsePlanValues = (plans: any) => {
        return (
            <>
                {plans.map((option: any, index: number) => (
                    <Fragment key={option.plan.id}>
                        {option.value ? (
                            <Tick selected={index === 1} />
                        ) : (
                            <Tick selected={index === 1} disabled />
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
                        <div className="space-x-0 sm:space-x-10 flex justify-between sm:justify-end items-stretch">
                            <div className="flex-grow mb-4">
                                {parseTranslation(data.option, 'name', locale)}
                            </div>
                            {parsePlanValues(data.values)}
                        </div>
                    </Fragment>
                ))}
            </>
        );
    };

    return (
        <div className="text-gray-350 font-medium max-w-[1440px] mx-auto px-5 my-12 sm:my-16">
            <div className="text-center">
                <div className="text-xs font-bold">{t('Pricing_And_Plans')}</div>
                <div className="mb-3 font-bold text-4xl">{t('Pricing that fits your size')}</div>
                <div>
                    {t(
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                    )}
                </div>
            </div>

            {/*<div className="underline text-center my-8 sm:my-10">*/}
            {/*    <Link href="/dashboard">*/}
            {/*        <a>{t('Skip for now (Take trial)')}</a>*/}
            {/*    </Link>*/}
            {/*</div>*/}

            <div className="sm:space-x-10 flex justify-end items-stretch text-center sm:text-left">
                <Price
                    onClick={() => {
                        setSelected('basic');
                    }}
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

            <div className="text-xs sm:text-sm">
                {plans.values.map((values: any) => (
                    <Fragment key={values.group.id}>
                        <div className="space-x-0 sm:space-x-10 flex justify-between sm:justify-end items-stretch mt-4 sm:m-0">

                            <div className="flex-grow font-bold text-2xl my-6 sm:mt-4">{parseTranslation(values.group, 'name', locale)}</div>
                            <div
                                className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 relative p-3 sm:hidden ${
                                    false ? 'sm:border-l-2 sm:border-r-2 border-orange-450' : 'border-white'
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
                                    true ? 'sm:border-l-2 sm:border-r-2 border-orange-450' : 'border-white'
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
                                    false ? 'sm:border-l-2 sm:border-r-2 border-orange-450' : 'border-white'
                                }`}>
                                <Image
                                    src={'/images/briefcase.png'}
                                    layout="responsive"
                                    width="36"
                                    height="36"
                                    className="object-contain object-center"
                                />
                            </div>
                            <Tick disabled className="hidden sm:block" />
                            <Tick disabled selected className="hidden sm:block" />
                            <Tick disabled className="hidden sm:block" />
                        </div>
                        {parseOptions(values.values, locale)}
                    </Fragment>
                ))}

                <div className="space-x-0 sm:space-x-10 flex justify-between sm:justify-end items-stretch">
                    <div className="flex-grow font-bold text-2xl mb-4 sm:mt-8 mt-0">{''}</div>

                    <div
                        className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 w-3 ${
                            false
                                ? 'sm:border-2 sm:border-t-0 sm:rounded-b-xl border-orange-450'
                                : 'border-white'
                        }`}
                    />

                    <div
                        className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 w-3 ${
                            selected
                                ? 'sm:border-2 sm:border-t-0 sm:rounded-b-xl border-orange-450'
                                : 'border-white'
                        }`}
                    />

                    <div
                        className={`min-w-[4rem] sm:min-w-[14rem] sm:w-56 w-3 ${
                            false
                                ? 'sm:border-2 sm:border-t-0 sm:rounded-b-xl border-orange-450'
                                : 'border-white'
                        }`}
                    />
                </div>
            </div>

            <div className="">
                <div className="space-x-10 flex" />
            </div>

            <div className="mt-16 sm:mt-28 text-center">
                <div className="text-xs font-bold">{t('Support')}</div>
                <div className="mb-3 font-bold text-4xl">{t('Frequently asked questions')}</div>
                <div>
                    {t(
                        'Have some questions before you get started? Check out our FAQ below. If you still have questions, book a call with one of our experts'
                    )}
                </div>
            </div>

            <div className="w-full mt-12 sm:mt-16 mb-20 sm:mb-28 grid grid-cols-1 gap-x-2 gap-y-12 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-16 md:grid-cols-3">
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t('What is the differens between plans ?')}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'The differences between the two plans are:The monthly cost and commission rate. The Basic Plan is $49/month + 5% of sales, and the Business Plan is $149/month + 3% of sales.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t(
                            'Does CommentSold integrate with Shopify/How does the Shopify integration work?'
                        )}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'The Shopify Integration allows you to have the same products & inventory on both Shopify & CommentSold. If you sell on one platform, it’ll update the inventory on the other platform as well.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">{t('How do I cancel my account')}</div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'You will need to log into your CommentSold dashboard and submit a formal request through chat with our Customer Success Team by clicking the green icon in the bottom right.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t('How does the free trial work?')}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'The trial period will give you access to all CommentSold features for 30 days before charging for the plan you choose when you register. You can cancel at any time before then to avoid the charge. (This does not include the transaction fees)'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t('I’m just starting my business - Which plan should I get?')}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'We recommend the Basic Plan if you are just starting your business, which is $49/month + 5% of sales. If you end up growing your business you can always change to the Business Plan at any time.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t(
                            'Do you integrate with other website providers (Wix, Square Online, GoDaddy, etc)'
                        )}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'CommentSold does not integrate with other website hosts. However, all of our plans come with customizable website called the CommentSold Webstore.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t('Is CommentSold available in Canada?')}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'At this time, CommentSold does not offer services outside of the United States. However, we do plan to expand outside of the US in the future, so stay tuned! If you’d like to follow along with CommentSold updates to see when we expand to Canada, you can subscribe to our Company blog or follow us on Facebook.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t('Do you integrate with a POS system?')}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'We do not currently integrate with a POS system. However, we are working towards this!  If you’d like to follow along with CommentSold updates, you can subscribe to our Company blog or follow us on Facebook.We do integrate with Shopify. Shopify has the integration for some POS systems, which makes it a great workaround in the meantime.'
                        )}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-6 text-lg">
                        {t('How does the Facebook integration work?')}
                    </div>
                    <div className="text-blue-350 text-base">
                        {t(
                            'The Facebook integration will allow you to sell directly on Facebook through social media comments. Once your customer registers, all they have to do is comment sold + the identifier number, our system will pick it up. The software will send them an email or Facebook Messenger message where they can view their cart and check out.'
                        )}
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div className="font-bold text-5xl">{t('Try it for free today!')}</div>
                <div className="font-semibold text-3xl">
                    {t('It only takes 30 second to get started')}
                </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap mt-8 mb-16 sm:max-w-2xl mx-auto">
                <input
                    className="form-control i-email icon-close h-14"
                    placeholder={t('Enter contact email')}
                    type="text"
                />
                <button className="sm:ml-5 gradient-btn h-14 w-full sm:max-w-max mt-4 sm:mt-0">
                    <span className="text-lg">{t('Demandez use demo')}</span>
                </button>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { locale } = context;
    console.log('LOCALE', locale);
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    }

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

Pricing.Layout = ({ children }: { children: any }) => {
    const user = useSelector(userSelector);
    const [session] = useSession();
    console.log('USER SESSION', session);
    console.log('USER ', user);
    return children;
};
