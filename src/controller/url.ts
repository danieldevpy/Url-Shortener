import { PrismaClient, Prisma } from '@prisma/client'
import { CreateRandomKey } from './keygen'

function newUrl(target_url: string, key?: string) {
    const checkUrl = /^(https:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/.*)?$/;
    if (!checkUrl.test(target_url)) throw new Error("Url destino não permitida.")
    if (!key) key = CreateRandomKey();
    return {
        key: key,
        secret_key: `${key}_admin`,
        target_url: target_url,
    }
}

export async function CreateUrl(
    prisma: PrismaClient,
    target_url: string,
    key?: string,
){
    if (!key) {
        let url = newUrl(target_url, key);
        while (await GetUrl(prisma, url.key)) {
            url = newUrl(target_url, key);
        }
        return await prisma.url.create({ data: url });
    } else {
        try {
            return await prisma.url.create({ data: newUrl(target_url, key) });
        } catch (e: unknown) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new Error('Chave já existente: violação da restrição UNIQUE');
                }
            }
            throw new Error('Erro desconhecido ao criar a URL');
        }
    }
}

export async function GetUrl(prisma: PrismaClient, key: string) {
    return await prisma.url.findUnique({where: {
        key: key
    }})
}