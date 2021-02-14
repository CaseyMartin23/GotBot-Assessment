FROM node AS build-image
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build --prod

FROM nginx
COPY --from=build-image /usr/src/app/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build-image /usr/src/app/dist/agent-ui /usr/share/nginx/html