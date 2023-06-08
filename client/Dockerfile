FROM node:18.16-bullseye-slim AS build
ENV NODE_ENV=development
WORKDIR /app

RUN npm i -g pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch
ADD . /app

RUN pnpm install -r --offline
RUN pnpm build

FROM node:18.16-bullseye-slim AS production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

CMD ["/bin/bash"]
