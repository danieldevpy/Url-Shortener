import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { CreateUrl, GetUrl } from '@/controller/url';  // Importa as funções que criam e recuperam URLs
import { PrismaClient } from '@prisma/client';  // Importa o PrismaClient para interação com o banco de dados

const prisma = new PrismaClient();

// Limpa a tabela de URLs antes de executar os testes
beforeAll(async () => {
    await prisma.url.deleteMany();  // Remove todas as URLs para garantir um ambiente limpo
});

// Desconecta o Prisma após a execução dos testes
afterAll(async () => {
    await prisma.$disconnect();  // Desconecta o Prisma para liberar a conexão com o banco
});

// Descrição dos testes relacionados a URLs
describe('url tests', () => {

    // Testa a criação de uma URL válida
    test('test url create', async () => {
        const target_url = 'https://teste.com/';  // Define a URL que será criada
        const url = await CreateUrl(prisma, target_url);  // Chama a função CreateUrl para criar a URL
        expect(url.target_url).toBe(target_url);  // Verifica se a URL retornada é igual à URL alvo
    });

    // Testa a criação de uma URL e a recuperação dela pelo seu key
    test('test url create e get', async () => {
        const target_url = 'https://teste.com/';  // Define a URL que será criada
        const create_url = await CreateUrl(prisma, target_url);  // Cria a URL
        expect(create_url.target_url).toBe(target_url);  // Verifica se a URL criada está correta
        
        const get_url = await GetUrl(prisma, create_url.key);  // Recupera a URL usando a chave (key)
        expect(get_url).not.toBeNull();  // Verifica se a URL foi encontrada (não é nula)
    });

    // Testa a recuperação de uma URL que não existe
    test('test url get not exits', async () => {
        const get_url = await GetUrl(prisma, 'xxxxx');  // Tenta recuperar uma URL com uma chave que não existe
        expect(get_url).toBeNull();  // Verifica se o resultado é nulo (indicando que a URL não foi encontrada)
    });

    // Testa a criação de URLs inválidas
    test('create url invalid', async () => {
        // Verifica se criar uma URL com "http" lança um erro
        await expect(CreateUrl(prisma, 'http://teste.com')).rejects.toThrow(Error);  
        
        // Verifica se criar uma URL sem o esquema "http" ou "https" lança um erro específico
        await expect(CreateUrl(prisma, 'teste.com')).rejects.toThrow("Url destino não permitida.");
    });
});
