import { useTranslations } from "next-intl";
import { InputText } from '../../components/_form';

export default function Shipping() {
    const t = useTranslations();
    return (
        <>
            <div className="mb-6 font-bold text-gray-350 text-lg border-gray-200">
                {t('Add new shipping method')}
            </div>
            <div className="p-4 mt-10 bg-gray-100 rounded-lg shadow-inner mb-6">

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
                    <label className="ml-6 text-xs text-blue-350 font-bold">
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
        </>
    )
}