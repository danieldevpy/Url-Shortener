export const minLength = 3;
export const maxLength = 50;

export function CreateRandomKey(length: number = 5): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

export function CreateCustomKey(key: string): string {
    if (key.length < minLength || key.length > maxLength){
        throw new Error(`O tamanho da chave deverá ser entre ${minLength} e ${maxLength}`)
    };
    const regexp = /^[a-zA-Z]*$/;
    if (!regexp.test(key)) throw new Error("Apenas caracteres alfabeticos!.");
    return key;
}