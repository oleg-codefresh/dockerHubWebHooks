FROM node

COPY ./package.json /src/package.json
RUN npm install
COPY ./ /src

WORKDIR /src
CMD ["node", "./bin/www" ]
