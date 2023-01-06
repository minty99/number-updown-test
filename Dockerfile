FROM node:18.12-alpine

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build
ENV NODE_ENV production

EXPOSE 3000
CMD npx serve -s build
