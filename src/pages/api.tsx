import { NextApiRequest, NextApiResponse } from 'next';
import { GetUrl, CreateCustomUrl, CreateRandomUrl, UpdateKey } from '@/controller/url';
import { PrismaClient } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    
    if (req.method === 'GET') {
        const { key } = req.query;
        
        if (key) {
            res.status(200).json(await GetUrl(prisma, key as string));
        } else {
            res.status(400).json({"error": "Não encontrado."});
        }
        
        return await prisma.$disconnect();
    } 
    
    else if (req.method === 'POST') {
        const { key, target_url } = req.body;
        if (!target_url) return res.status(400).json({"error": "xxx"});
        
        try {
            if (!key) return res.status(200).json(await CreateRandomUrl(prisma, target_url));
            return res.status(200).json(await CreateCustomUrl(prisma, target_url, key));
        } catch (e) {
            return res.status(400).json({"error": String(e)});
        } finally {
            await prisma.$disconnect();
        }
    }

    else if (req.method === 'PUT') {
        const { key, new_key } = req.body;
        if (!key || !new_key) return res.status(400).json({"error": "xxx"});
        try {
            return res.status(200).json(await UpdateKey(prisma, key, new_key));
        } catch (e) {
            if (e instanceof Error) {
                return res.status(400).json({ "error": e.message });
            }
            return res.status(400).json({ "error": "Erro desconhecido" });
        }
    }
}
