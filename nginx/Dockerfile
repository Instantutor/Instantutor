FROM nginx:alpine

# Remove default files
RUN rm /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf