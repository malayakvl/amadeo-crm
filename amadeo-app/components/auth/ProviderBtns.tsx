import {signIn} from "next-auth/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";

export default function ProviderBtns({ Providers } : {Providers: any}) {
    return (
        <div className="flex flex-row gap-2">
            {Object.values(Providers).map((provider:any) => {
                return (
                    <button
                        key={provider.name}
                        className={provider.name === 'Facebook' ? 'Facebook' : 'Google'}
                        onClick={() => signIn(provider.id)}
                    >
                        <FontAwesomeIcon icon={provider.name === "Facebook" ? faFacebook : faGoogle} />
                        {provider.name}
                    </button>
                );
            })}
        </div>
    )
}
