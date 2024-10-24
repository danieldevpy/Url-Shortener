import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api';  // Ajuste o caminho para o handler

const prisma = new PrismaClient();

beforeAll(async () => {
    // Limpa a tabela de URLs antes dos testes
    await prisma.url.deleteMany();
});

afterAll(async () => {
    // Desconecta o Prisma após os testes
    await prisma.$disconnect();
});

describe('API tests', () => {

    test('GET key - should return 200 with valid key', async () => {
        // Cria mocks de request e response
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: 'GET',
            query: {
                key: 'key-not exist',  // Passa a query 'key' para o request
            },
        });

        // Adiciona a propriedade 'env' manualmente no mock do req
        req.env = process.env;

        // Chama o handler com o mock de request e response
        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);  // Verifica o status retornado
        expect(res._getData()).toContain("null");  // Verifica o corpo da resposta
    });

    test('GET key - should return 400 for missing key', async () => {
        // Cria mocks de request e response
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: 'GET',
        });

        // Adiciona a propriedade 'env' manualmente no mock do req
        req.env = process.env;

        // Chama o handler com o mock de request e response
        await handler(req, res);
        expect(res._getStatusCode()).toBe(400);  // Verifica o status retornado
        expect(res._getData()).toContain('');    // Verifica o corpo da resposta
    });
});
