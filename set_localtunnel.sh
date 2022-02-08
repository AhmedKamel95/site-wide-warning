#!/bin/bash
# This file sets the BASE_URL for the client to use 
# sets it to the address given by localtunnel 
npm i -g localtunnel
lt -p 8000 > ./lt/tunnel &
sleep 1 
tunnel_url=`cat ./lt/tunnel | cut -d " " -f 4-`
echo -e "SKIP_PREFLIGHT_CHECK=true\nREACT_APP_BASE_URL=$tunnel_url" > ./client/.env