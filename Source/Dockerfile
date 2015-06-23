FROM node:0.10-onbuild
RUN git config --global url."https://".insteadOf git://
RUN npm install -g bower
RUN npm install
RUN bower --allow-root install
ENV NODE_ENV test
EXPOSE 9000
CMD ["npm", "start"]
