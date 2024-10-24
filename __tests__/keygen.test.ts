import { CreateRandomKey, CreateCustomKey } from '@/controller/keygen';
import { describe, expect, test } from '@jest/globals';

describe('keygen tests', () => {

    // Testa a geração de uma chave aleatória com tamanho padrão de 5 caracteres
    test('test key-gen aleatoria default', () => {
        const key = CreateRandomKey();  // Gera uma chave com o tamanho padrão
        expect(key).toHaveLength(5);    // Verifica se o comprimento da chave é 5
    });

    // Testa a geração de uma chave aleatória com um comprimento específico de 7 caracteres
    test('test key-gen aleatoria with 7 characters', () => {
        const key = CreateRandomKey(7);  // Gera uma chave com 7 caracteres
        expect(key).toHaveLength(7);     // Verifica se o comprimento da chave é 7
    });

    // Testa a criação de uma chave customizada que segue os requisitos corretos
    test('test key-gen custom correct', () => {
        const key = "Encurta";  // Define uma chave customizada válida
        expect(CreateCustomKey(key)).toBe(key);  // Verifica se a chave gerada é a mesma que foi passada
    });

    // Testa falha na criação de chave customizada quando o tamanho é menor que 5 caracteres
    test('test key-gen custom failed size < 5', () => {
        expect(() => CreateCustomKey("xxxx")).toThrow(Error);  // Verifica se lança erro
        expect(() => CreateCustomKey("xxxx")).toThrow("Tamanho incompativel.");  // Verifica se lança o erro correto
    });

    // Testa falha na criação de chave customizada quando o tamanho é maior que 10 caracteres
    test('test key-gen custom failed size > 10', () => {
        expect(() => CreateCustomKey("xxxxxxxxxxx")).toThrow(Error);  // Verifica se lança erro
        expect(() => CreateCustomKey("Tamanho incompativel.")).toThrow(Error);  // Verifica se lança o erro correto
    });

    // Testa falha na criação de chave customizada quando a chave contém caracteres não alfabéticos
    test('test key-gen custom failed is not alpha', () => {
        expect(() => CreateCustomKey("encurta1")).toThrow(Error);  // Verifica se lança erro ao usar números
        expect(() => CreateCustomKey("encurta1")).toThrow("Apenas caracteres alpha.");  // Verifica se a mensagem de erro é a correta

        expect(() => CreateCustomKey("encurta@")).toThrow(Error);  // Verifica se lança erro ao usar símbolos
        expect(() => CreateCustomKey("encurta@")).toThrow("Apenas caracteres alpha.");  // Verifica se a mensagem de erro é a correta

        expect(() => CreateCustomKey("encurta\t")).toThrow(Error);  // Verifica se lança erro ao usar tabulação
        expect(() => CreateCustomKey("encurta\t")).toThrow("Apenas caracteres alpha.");  // Verifica se a mensagem de erro é a correta
    });
});
