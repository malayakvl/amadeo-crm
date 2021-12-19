export function parseTranslation(option: any, field: string, locale: string) {
    if (option.translations) {
        const findedOption = option.translations.find(
            (data: any) => Object.keys(data)[0] === locale
        );
        if (findedOption) {
            return findedOption[locale][field];
        } else {
            return option[field];
        }
    } else {
        return option[field];
    }
}

export function authHeader(email: string) {
    const token = Buffer.from(
        `${email}:c0P1JUlc-aKiH4qun-Cvapfn60-F7cG9NUM-knCw0x9e-6PWxPEjf-7mtEJZzC-q0mxxn0D`,
        'utf8'
    ).toString('base64');
    return { Authorization: `Bearer ${token}` };
}

export const toggleModalConfirmation = () => {
    // const body = document.querySelector('body');
    const modal = document.querySelector('.modal-confirmation');
    (modal as any).classList.toggle('opacity-0');
    (modal as any).classList.toggle('pointer-events-none');
    (modal as any).classList.toggle('modal-active');
};
