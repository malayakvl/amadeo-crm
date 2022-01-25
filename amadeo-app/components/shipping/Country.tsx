import { useTranslations } from 'next-intl';
import Select from 'react-select';
import { InputText } from "../_form";

export default function Country({ country, deleteCallback }: { country: any, deleteCallback: any }) {
    const t = useTranslations();

    return (
        <div className="my-4 flex items-center justify-start w-1/2">
            <Select
                className={'w-[200px] form-control-dropdown'}
                classNamePrefix={'inventory'}
                placeholder={t('Country')}
                name="country_id"
                options={[]}
                onChange={() => { }}
                value={1}
            />

            <input
                className="form-control ml-4"
                name={'name'}
                placeholder={'Price'}
                value={country.price}
            />

            <button onClick={deleteCallback} className="ml-4 disabled-btn">delete</button>
        </div>
    )
}