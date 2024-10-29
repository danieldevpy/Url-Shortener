import { PrismaClient } from '@prisma/client'
import { CreateRandomKey, CreateCustomKey} from './keygen'

function ValidateTarget(target_url: string) {
    const checkUrl = /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/;
    if (!checkUrl.test(target_url)) throw new Error("Verifique se a url destino está correta!")
}

function CreateObjectUrl(target_url: string, key?: string) {
    ValidateTarget(target_url)
    if (!key) key = CreateRandomKey();
    return {
        key: key,
        secret_key: `${key}_admin`,
        target_url: target_url
    }
}

export async function CreateRandomUrl(prisma: PrismaClient, target_url: string) {
    let url = CreateObjectUrl(target_url);
    while (await GetUrl(prisma, url.key)) {
        url = CreateObjectUrl(target_url);
    }
    return await prisma.url.create({data: url});
}

export async function CreateCustomUrl(prisma: PrismaClient, key: string, target_url: string) {
    return await prisma.url.create({data:
        CreateObjectUrl(CreateCustomKey(key), target_url)
    });
}


export async function GetUrl(prisma: PrismaClient, key: string) {
    return await prisma.url.findUnique({where: {
        key: key
    }});
}

export async function UpdateKey(prisma: PrismaClient, key: string, newKey: string) {
    const url = GetUrl(prisma, key);
    if (!url) return null;
    const updatedUrl = await prisma.url.update({
        where: {
            key: key,
        },
        data: {
            key: CreateCustomKey(newKey),
        },
    });
    return updatedUrl;
}