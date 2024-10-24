import { PrismaClient } from '@prisma/client'
import { CreateRandomKey } from './keygen'



function newUrl(target_url: string, key?: string) {
    const padrao = /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/.*)?$/;
    if (!padrao.test(target_url)) throw new Error("Url destino não permitida.")
    if (!key) key = CreateRandomKey();
    return {
        key: key,
        secret_key: `${key}_admin`,
        target_url: target_url,
    }
}

export async function CreateUrl(props: {
    target_url: string,
    key?: string,
})
{
    const prisma = new PrismaClient()
    if(!props.key){
        while (true){
            try{
                return await prisma.url.create({data: newUrl(props.target_url, props.key)});
            }finally{
                await prisma.$disconnect();
            }
        }
    }
    try{
        return await prisma.url.create({data: newUrl(props.target_url, props.key)});
    }catch{
        throw new Error("Essa chave já existe!")
    }finally{
        await prisma.$disconnect();
    }
}

export async function DeleteUrl() {

}