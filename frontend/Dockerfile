FROM node:alpine as bld

WORKDIR '/frontend'

COPY ./package.json /frontend

RUN npm install

COPY . .

RUN npm run build

FROM nginx as prd

COPY --from=bld /frontend/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
