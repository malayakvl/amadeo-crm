import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
    style: string | null;
    icon: string | null;
    name: string;
    label: string | null;
    placeholder: string | null;
    props: any;
    tips: string | null;
}

const InputText: React.FC<Props> = ({ style, icon, name, label, placeholder, tips, props }) => {
    const t = useTranslations();

    const clear = () => {
        props.setFieldValue(name, '');
    };

    return (
        <div className={`mb-4 ${style}`}>
            {label && (
                <label className="control-label" htmlFor={name}>
                    {t(label)}
                </label>
            )}
            <div className="relative">
                {icon && <i className={`f-icon ${icon}`} />}
                {tips && <em className="input-tips">{tips}</em>}

                <input
                    className={icon ? 'form-control-icon' : 'form-control'}
                    placeholder={placeholder ? t(placeholder) : ''}
                    type="text"
                    onChange={props.handleChange}
                    // value={inputValue || ''}
                    value={props.values[name]}
                    name={name}
                />
                <i
                    role="presentation"
                    className="input-close cursor-pointer"
                    onClick={() => clear()}
                />
                {props.errors[name] && <div className="error-el">{props.errors[name]}</div>}
            </div>
        </div>
    );
};

export { InputText };
