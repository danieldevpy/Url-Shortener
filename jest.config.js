// jest.config.js
require('dotenv').config({ path: './.env.test' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1', // ajuste para o caminho correto
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-module-name|another-module-name)", // substitua por módulos que você queira transformar
  ],
};
