import { CreateRandomKey, CreateCustomKey } from '@/controller/keygen';
import {describe, expect, test} from '@jest/globals';

describe('keygen tests', () => {
    test('test key-gen aleatorie default', () => {
      const key = CreateRandomKey();
      expect(key).toHaveLength(5);
    });
    test('test key-gen aleatorie with 7passwords', () => {
      const key = CreateRandomKey(7);
      expect(key).toHaveLength(7);
    });
    test('test key-gen custom correct', () => {
      const key = "Encurta";
      expect(CreateCustomKey(key)).toBe(key);
    });
    test('test key-gen custom failed size < 5', () => {
      expect(()=> CreateCustomKey("xxxx")).toThrow(Error);
      expect(()=> CreateCustomKey("xxxx")).toThrow("Tamanho incompativel.");
    });
    test('test key-gen custom failed size > 10', () => {
      expect(()=> CreateCustomKey("xxxxxxxxxxx")).toThrow(Error);
      expect(()=> CreateCustomKey("Tamanho incompativel.")).toThrow(Error);
    });
    test('test key-gen custom failed is not alpha', () => {
      expect(()=> CreateCustomKey("encurta1")).toThrow(Error);
      expect(()=> CreateCustomKey("encurta1")).toThrow("Apenas caracters alpha.");
      expect(()=> CreateCustomKey("encurta@")).toThrow(Error);
      expect(()=> CreateCustomKey("encurta@")).toThrow("Apenas caracters alpha.");
      expect(()=> CreateCustomKey("encurta\t")).toThrow(Error);
      expect(()=> CreateCustomKey("encurta\t")).toThrow("Apenas caracters alpha.");
    })
  });