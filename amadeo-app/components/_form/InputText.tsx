import { useTranslations } from "next-intl";

interface Props {
    name: string;
    label: string,
    props: any;
}

const InputText: React.FC<Props> = ({name, label, props}) => {
    const t = useTranslations();
    return (
        <div className="mb-4">
            <label htmlFor={name}>{t(label)}</label>
            <input
                className="txt-input"
                placeholder={t(label)}
                type="text"
                onChange={props.handleChange}
                value={props.values[name] ||''}
                name={name}
            />
            {props.errors[name] && <div className="error-el">{props.errors[name]}</div>}
        </div>
    )
}

export { InputText };
