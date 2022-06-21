#!/bin/bash
cp dev.conf /etc/nginx.conf/nginx.conf
sudo certbot --nginx -d dev.instantutorrpi.com
sudo systemctl restart nginx
