import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

interface Props {
    style: string | null;
    icon: string | null;
    name: string;
    label: string | null;
    placeholder: string | null;
    props: any;
}

const InputTextarea: React.FC<Props> = ({ style, icon, name, label, placeholder, props }) => {
    const t = useTranslations();

    useEffect(
        function () {
            setInputValue(props.values[name]);
        },
        [props.values[name]]
    );

    const clear = () => {
        setInputValue('');
        props.values[name] = '';
    };

    const [inputValue, setInputValue] = useState(props.values[name]);
    return (
        <div className={`mb-4 ${style}`}>
            {label && (
                <label className="control-label" htmlFor={name}>
                    {t(label)}
                </label>
            )}
            <div className="relative">
                {icon && <i className={`f-icon ${icon}`} />}

                <textarea
                    className={icon ? 'form-control-icon' : 'form-control'}
                    placeholder={placeholder ? t(placeholder) : ''}
                    onChange={props.handleChange}
                    value={inputValue || ''}
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

export { InputTextarea };
