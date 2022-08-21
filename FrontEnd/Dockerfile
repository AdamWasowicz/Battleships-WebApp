FROM node:17-alpine3.14 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY webpack/webpack.config.prod.js ./
COPY . ./

#Set URL to REST API
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

#Build with webpack
RUN npm run buildWebpack

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]