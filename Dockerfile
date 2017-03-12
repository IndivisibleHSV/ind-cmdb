FROM node:6

RUN mkdir -p /home/node && \
    chown node.node /home/node && \
    mkdir -p /usr/src/app && \
    chown -R node:node /usr/src/app && \
    wget -O /usr/local/bin/dumb-init \
      https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 && \
    chmod +x /usr/local/bin/dumb-init

USER node
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

ENTRYPOINT [ "/usr/local/bin/dumb-init", "--"]
CMD [ "/usr/src/app/start.sh" ]
LABEL indivisblehsv.name=ind-cmdb
