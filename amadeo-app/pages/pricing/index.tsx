import { useTranslations } from "next-intl"
import Image from 'next/image'
import { useState } from "react"

type PriceProps = {
    name: string;
    price: number;
    desc: string;
    sale: number;
    buttonText: string;
    permissions: React.ReactNode
    disabled?: boolean
    selected: boolean
    onClick: any
}

const Price = ({ name, price, desc, sale, buttonText, permissions, disabled, selected, onClick }: PriceProps) => {
    const t = useTranslations()

    return (
        <div onClick={onClick} className={`w-56 p-4 flex flex-col ${selected ? 'border-2 rounded-xl border-orange-450' : ''}`}>
            <div>
                <div className="font-bold text-xl mb-2 flex items-center justify-between">
                    <div>{name}</div>
                    {name === 'Business' &&
                        <div className="text-[10px] border border-orange-450 rounded-lg p-1 text-orange-450">{t('Most popular')}</div>
                    }
                </div>
                <div className="h-24 text-sm">{desc}</div>
                <div className="text-4xl font-bold h-20">
                    {price}<span className="text-base">eur/month</span>
                    {sale > 0 &&
                        <div className="text-xs font-bold">{sale}% of sale</div>
                    }
                </div>

                <button className={`${disabled ? "disabled-btn" : "gradient-btn"} w-full mt-7`}>{buttonText}</button>
            </div>
            <div className="mt-7 mb-auto">
                {permissions}
            </div>
            <button className={`${disabled ? "disabled-btn" : "gradient-btn"} w-full`}>{buttonText}</button>
        </div>
    )
}

export default function Pricing() {
    const [selected, setSelected] = useState('business')
    const t = useTranslations()
    const Tick = ({ disabled, className }: { disabled?: boolean, className?: string }) =>
        <div className={`mx-auto mb-4 w-5 h-5 relative ${className || ''}`}>
            {!disabled &&
                <Image
                    src="/images/tick.svg"
                    layout="fill"
                />
            }

        </div>

    console.log(selected)
    return (
        <div className="text-gray-350 font-medium max-w-[1440px] mx-auto my-16">
            <div className="text-center">
                <div className="text-xs font-bold">{t('Pricing & Plans')}</div>
                <div className="mb-3 font-bold text-4xl">{t('Pricing that fits your size')}</div>
                <div>{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua')}</div>
            </div>

            <div className="flex my-28 cursor-pointer">
                <div className="text-sm mt-72 mr-auto">
                    <div className="font-bold text-2xl mb-4">{t('Features')}</div>
                    <div className="">
                        <div className="mb-4" >{t('Social Selling on Facebook')}</div>
                        <div className="mb-4" >{t('Facebook live sales schelduling')}</div>
                        <div className="mb-4" >{t('Unlimited products')}</div>
                        <div className="mb-4" >{t('Unlimited staff accounts')}</div>
                        <div className="mb-4" >{t('Inventory management')}</div>
                        <div className="mb-4" >{t('Automatic Invoicing System')}</div>
                        <div className="mb-4" >{t('Payment method automation')}</div>
                        <div className="mb-4" >{t('Choose your shipping prices')}</div>
                        <div className="mb-4" >{t('Extended shipping rules and limits')}</div>
                        <div className="mb-4" >{t('Reporting & Statistics')}</div>
                    </div>
                    <div className="font-bold mt-8 mb-4">{t('Advensed Features')}</div>
                    <div className="">
                        <div className="mb-4">{t('Custom car Expiration')}</div>
                        <div className="mb-4">{t('Waiting list & Notifications')}</div>
                        <div className="mb-4">{t('Prestashop or Shopify integration')}</div>
                        <div className="mb-4">{t('Custom pricing and invoicing to fit your needs')}</div>
                        <div className="mb-4">{t('Branded website')}</div>
                        <div className="mb-4">{t('Pre-loaded Wallet funtionalities for New Customers')}</div>
                    </div>
                    <div className="font-bold mt-8 mb-4">{t('Support')}</div>
                    <div className="">
                        <div className="mb-4">{t('Basic Email Support')}</div>
                        <div className="mb-4">{t('You own dedicated account manager')}</div>
                        <div className="mb-4">{t('Live Sale Coaching from our expert team')}</div>
                    </div>

                </div>
                <div className="space-x-10 flex">
                    <Price
                        onClick={() => setSelected('basic')}
                        name={t('Basic')}
                        selected={selected === 'basic'}
                        price={49}
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                        sale={0}
                        buttonText="Select"
                        permissions={<>
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick className="mt-12 mb-4" />
                            <Tick />
                        </>}
                    />
                    <Price
                        onClick={() => setSelected('business')}
                        name={t('Business')}
                        selected={selected === 'business'}
                        price={99}
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                        sale={5}
                        buttonText="Select"
                        permissions={<>
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick className="mt-12 mb-4" />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick className="mt-12 mb-4" />
                            <Tick />
                        </>}
                    />
                    <Price
                        onClick={() => setSelected('platinum')}
                        selected={selected === 'platinum'}
                        disabled
                        name={t('Platinum')}
                        price={139}
                        buttonText="Comming Soon"
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                        sale={3}
                        permissions={<>
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick className="mt-12 mb-4" />
                            <Tick />
                            <Tick />
                            <Tick />
                            <Tick className="mt-12 mb-4" />
                            <Tick />
                            <Tick />
                        </>}
                    />
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs font-bold">{t('Support')}</div>
                <div className="mb-3 font-bold text-4xl">{t('Frequently asked questions')}</div>
                <div>{t('Have some questions before you get started? Check out our FAQ below. If you still have questions, book a call with one of our experts')}</div>
            </div>

            <div className="w-full mt-16 mb-52">
                <div className="grid grid-cols-3 gap-x-4 mb-16">
                    <div>
                        <div className="font-bold">{t('What is the differens between plans ?')}</div>
                        <div className="text-blue-350">{t('The differences between the two plans are:The monthly cost and commission rate. The Basic Plan is $49/month + 5% of sales, and the Business Plan is $149/month + 3% of sales.')}</div>
                    </div>
                    <div>
                        <div className="font-bold">{t('Does CommentSold integrate with Shopify/How does the Shopify integration work?')}</div>
                        <div className="text-blue-350">{t('The Shopify Integration allows you to have the same products & inventory on both Shopify & CommentSold. If you sell on one platform, it’ll update the inventory on the other platform as well.')}</div>
                    </div>
                    <div>
                        <div className="font-bold">{t('How do I cancel my account')}</div>
                        <div className="text-blue-350">{t('You will need to log into your CommentSold dashboard and submit a formal request through chat with our Customer Success Team by clicking the green icon in the bottom right.')}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 mb-16">
                    <div>
                        <div className="font-bold">{t('How does the free trial work?')}</div>
                        <div className="text-blue-350">{t('The trial period will give you access to all CommentSold features for 30 days before charging for the plan you choose when you register. You can cancel at any time before then to avoid the charge. (This does not include the transaction fees)')}</div>
                    </div>
                    <div>
                        <div className="font-bold">{t('I’m just starting my business - Which plan should I get?')}</div>
                        <div className="text-blue-350">{t('We recommend the Basic Plan if you are just starting your business, which is $49/month + 5% of sales. If you end up growing your business you can always change to the Business Plan at any time.')}</div>
                    </div>
                    <div>
                        <div className="font-bold">{t('Do you integrate with other website providers (Wix, Square Online, GoDaddy, etc)')}</div>
                        <div className="text-blue-350">{t('CommentSold does not integrate with other website hosts. However, all of our plans come with customizable website called the CommentSold Webstore.')}</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 -mb-16">
                    <div>
                        <div className="font-bold">{t('Is CommentSold available in Canada?')}</div>
                        <div className="text-blue-350">{t('At this time, CommentSold does not offer services outside of the United States. However, we do plan to expand outside of the US in the future, so stay tuned! If you’d like to follow along with CommentSold updates to see when we expand to Canada, you can subscribe to our Company blog or follow us on Facebook.')}</div>
                    </div>
                    <div>
                        <div className="font-bold">{t('Do you integrate with a POS system?')}</div>
                        <div className="text-blue-350">{t('We do not currently integrate with a POS system. However, we are working towards this!  If you’d like to follow along with CommentSold updates, you can subscribe to our Company blog or follow us on Facebook.We do integrate with Shopify. Shopify has the integration for some POS systems, which makes it a great workaround in the meantime.')}</div>
                    </div>
                    <div>
                        <div className="font-bold">{t('How does the Facebook integration work?')}</div>
                        <div className="text-blue-350">{t('The Facebook integration will allow you to sell directly on Facebook through social media comments. Once your customer registers, all they have to do is comment sold + the identifier number, our system will pick it up. The software will send them an email or Facebook Messenger message where they can view their cart and check out.')}</div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div className="font-bold text-5xl">{t('Try it for free today!')}</div>
                <div className="font-semibold text-3xl">{t('It only takes 30 second to get started')}</div>
            </div>
            <div className="mx-auto h-14 w-3/6 flex mt-8 mb-16">
                <input
                    className="form-control i-email icon-close"
                    placeholder={t('Enter contact email')}
                    type="text"
                />
                <button className="ml-5 gradient-btn w-96"><span className="text-lg">{t('Demandez use demo')}</span></button>
            </div>
        </div>
    )
}

Pricing.Layout = ({ children }: { children: React.ReactNode }) => {
    return children
}