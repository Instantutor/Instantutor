#!/bin/bash
cp dev.conf /etc/nginx.conf/nginx.conf
sudo certbot --nginx -d instantutorrpi.com -d www.instantutorrpi.com
sudo systemctl restart nginx
