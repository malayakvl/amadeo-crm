import Image from "next/image";

export default function SidebarRow({ src, Icon, title } : {src:any, Icon: any, title:string|null|undefined}) {
    return (
        <div>
            {src && (
                <Image
                    src={src}
                    width={30}
                    height={30}
                    layout="fixed"
                    className="rounded-full"

                />
            )}
            {Icon && <Icon className="h-8 w-8 text-blue-500" />}
            <p className="hidden sm:inline-flex font-medium">{title}</p>
        </div>
    )
}
