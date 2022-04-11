#!/bin/bash

#########################################################
#                Script from Dorm Design                #
#########################################################

if docker ps | `grep "instantutor-server" > /dev/null `
then
    echo "[Instantutor] Instance already running. Closing."
    sudo docker-compose down
fi

# if [ -f .env ]
# then
#   echo "[Instantutor] .env file found."
# else
#   echo "[Instantutor] Cannot deploy without .env file."
#   exit 1
# fi

echo "[Instantutor] Starting server."
sudo docker-compose up --build
# sudo docker-compose --env-file ./.env up --build -d