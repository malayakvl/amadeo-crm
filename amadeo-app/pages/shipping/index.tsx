import Image from 'next/image';
import { useTranslations } from "next-intl";
import { InputText } from '../../components/_form';

export default function Shipping() {
    const t = useTranslations();
    return (
        <div className="flex">
            <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-inner">
                <div className="font-bold text-gray-350 text-lg pb-4 border-b border-gray-200">
                    {t('Free shipping')}
                </div>
                <div className="text-sm text-gray-500 mt-12">
                    {t('Set a shipping threshold. In case order has reacted this amount, the shipping is free for this buyer.')}
                </div>
                <input className="w-full p-2.5 shadow-inner rounded-lg border-2 text-gray-350 font-bold mb-8 mt-6" value="999.99$" />
                <button className="gradient-btn">{t('Save changes')}</button>
            </div>
            <div className="ml-4 w-full flex-1 m-6">
                <div className="flex pb-4 border-b">
                    <div className="font-bold text-gray-350 text-lg border-gray-200">
                        <div>{t('Shipping methods')}</div>
                    </div>
                    <button className="flex justify-between item-center gradient-btn ml-auto">
                        <span className="mr-2.5">{t('Add a new method')}</span>
                        <Image src="/images/icon-add-shipping.svg" width={20} height={20} />
                    </button>
                </div>
                <div className="p-4 mt-10 bg-gray-100 rounded-lg shadow-inner mb-6">
                    <div className="mb-6 font-bold text-gray-350 text-lg border-gray-200">
                        {t('Add new shipping method')}
                    </div>
                    <form className="flex">
                        <label className="text-xs text-blue-350 font-bold">
                            {t('Method name')}
                            <InputText
                                style="mt-4 w-52"
                                icon={''}
                                label={null}
                                name={'method_name'}
                                placeholder={'Name'}
                                props={{ values: { method_name: '' }, errors: { method_name: '' } }}
                                tips={null}
                            />
                        </label>
                        <label className="text-xs text-blue-350 font-bold">
                            {t('Method image')}
                            <InputText
                                style="mt-4 w-52"
                                icon={''}
                                label={null}
                                name={'method_name'}
                                placeholder={'Name'}
                                props={{ values: { method_name: '' }, errors: { method_name: '' } }}
                                tips={null}
                            />
                        </label>


                    </form>
                </div>

            </div>
        </div>

    )
}