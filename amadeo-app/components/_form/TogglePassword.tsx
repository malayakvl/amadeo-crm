import { useTranslations } from 'next-intl';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

interface Props {
    name: string;
    label: string;
    props: any;
}

const TogglePassword: React.FC<Props> = ({ name, label, props }) => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <label htmlFor={name}>{t(label)}</label>
            {!showPassword ? (
                <div className="relative">
                    <input
                        className="txt-input"
                        type="password"
                        onChange={props.handleChange}
                        name={name}
                    />
                    <EyeIcon
                        className="h-7 text-black absolute right-2 top-1.5"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    />
                </div>
            ) : (
                <div className="relative">
                    <input
                        className="txt-input"
                        type="text"
                        onChange={props.handleChange}
                        name={name}
                    />
                    <EyeOffIcon
                        className="h-7 text-black absolute right-2 top-1.5"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    />
                </div>
            )}
            {props.errors[name] && <div className="error-el">{props.errors[name]}</div>}
        </div>
    );
};

export { TogglePassword };
