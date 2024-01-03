ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

WORKDIR /srv/app

RUN set -eux; \
	apk add --no-cache --virtual .build-deps \
		g++ \
		gcc \
		git \
		make \
        python3 \
	;

RUN npm -g install npm@latest

USER node

EXPOSE ${FRONT_PORT}

CMD ["npm", "run", "start"]
