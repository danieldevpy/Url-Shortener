import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {CreateUrl } from '@/controller/url';
import { PrismaClient } from '@prisma/client'

beforeAll(async () => {
    const prisma = new PrismaClient()
    await prisma.url.deleteMany();
});

describe('url tests', () => {
    test('test url create', async() => {
        const target_url = 'https://teste.com/'
        const url = await CreateUrl({
            target_url: target_url,
        })
        expect(url.target_url).toBe(target_url);
    })

})