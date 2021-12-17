import Image from 'next/image';

interface Props {
    value: string;
    icon: string;
}

const InputTextDisabled: React.FC<Props> = ({ value, icon }) => {
    return (
        <div className={`relative`}>
            {icon && <i className={`f-icon ${icon}`} />}

            <input
                className={icon ? 'form-control-icon-disabled' : 'form-control-disabled'}
                type="text"
                value={value}
                disabled
            />
            
        </div>
    );
}

export default InputTextDisabled;