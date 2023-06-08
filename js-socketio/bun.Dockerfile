FROM oven/bun:0.6.5

ADD . /app
WORKDIR /app

RUN bun install

CMD ["bun", "run", "index.js"]