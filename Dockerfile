# Build app

FROM node:16 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN cp /keys.js /app/src/API_KEYS.js && INLINE_RUNTIME_CHUNK=false npm run build

# Deploy app
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
