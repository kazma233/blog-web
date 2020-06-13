FROM nginx:1.19.0-alpine

COPY ./dist /
COPY blog-web-nginx.conf /etc/nginx/nginx.conf

