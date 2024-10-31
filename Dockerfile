# image
FROM node:22

# folder work
WORKDIR /app

# copy files
RUN echo 'DATABASE_URL="file:./test.db"' > .env
COPY package*.json tailwind.config.ts tsconfig.json .eslintrc.json ./
COPY jest.config.js next.config.ts postcss.config.mjs ./
COPY src ./src/
COPY prisma ./prisma/

# setup
RUN npm install
RUN npm run build

#start
CMD ["npm", "run", "start"]
