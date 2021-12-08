import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
    icon: string | null;
    name: string;
    label: string | null;
    placeholder: string | null;
    props: any;
}

const InputText: React.FC<Props> = ({ icon, name, label, placeholder, props }) => {
    const t = useTranslations();
    return (
        <div className="mb-4 relative">
            {label && <label htmlFor={name}>{t(label)}</label>}
            {icon && <i className={`f-icon ${icon}`} />}

            <input
                className={icon ? 'form-control-icon' : 'form-control'}
                placeholder={placeholder ? t(placeholder) : ''}
                type="text"
                onChange={props.handleChange}
                value={props.values[name] || ''}
                name={name}
            />
            <i className="input-close" />
            {props.errors[name] && <div className="error-el">{props.errors[name]}</div>}
        </div>
    );
};

export { InputText };
