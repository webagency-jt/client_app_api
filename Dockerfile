# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Define default env variables
ENV PORT 3000
ENV URL ''
ENV DATABASE_URL ''
ENV DATABASE_NAME ''
ENV ORIGINS ''
ENV SENTRY_DSN ''
ENV ENV=PROD
ENV LOGGER true
ENV JWT_TOKEN ''
ENV SALT_ROUND 10

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# build
RUN bun run build

# # copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist/index.js .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE $PORT
ENTRYPOINT [ "bun", "run", "index.js" ]
