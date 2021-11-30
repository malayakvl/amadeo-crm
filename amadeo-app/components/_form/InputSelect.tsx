import { useTranslations } from "next-intl";

interface PropsSelect {
    name: string;
    label: string,
    options: any;
    props: any;
}


const InputSelect: React.FC<PropsSelect> = ({name, label, options,  props}) => {
    const t = useTranslations();
    return (
        <div className="mb-4">
            <label htmlFor={name}>{t(label)}</label>
            <select
                name={name}
                className="txt-input"
                onChange={props.handleChange}
                value={props.values[name] ||''}
            >
                <option value="">------</option>
                {options.map((option:any) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {props.errors[name] && <div className="error-el">{props.errors[name]}</div>}
        </div>
    )
}

export { InputSelect };
