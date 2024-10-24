import { NextApiRequest, NextApiResponse } from 'next';
import { GetUrl, CreateUrl } from '@/controller/url';
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
            return res.status(200).json(await CreateUrl(prisma, target_url, key));
        } catch (e) {
            return res.status(400).json({"error": String(e)});
        } finally {
            await prisma.$disconnect();
        }
    }
}
