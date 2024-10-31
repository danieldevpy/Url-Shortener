# image
FROM node:22

# folder work
WORKDIR /app

# copy files
COPY package*.json tailwind.config.ts tsconfig.json .env .eslintrc.json ./
COPY jest.config.js next-env.d.ts next.config.ts postcss.config.mjs ./
COPY src ./src/
COPY prisma ./prisma/

# setup
RUN npm install
RUN npm run build

#start
CMD ["npm", "run", "start"]
