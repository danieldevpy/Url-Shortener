
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
    if (key.length > 10) throw new Error("Tamanho incompativel.");
    const regexp = /^[a-zA-Z]*$/;
    if (!regexp.test(key)) throw new Error("Apenas caracters alpha.");
    return key;
}