#!/bin/bash
# This file sets the BASE_URL for the client to use 
# Assumes that the port is public for the client app to work 

if [[ ! -z "${CODESPACE_NAME}" ]]; then # if using codespace
    BASE_URL="https://${CODESPACE_NAME}-8000.githubpreview.dev"
    echo "SKIP_PREFLIGHT_CHECK=true" >./client/.env
    echo "REACT_APP_BASE_URL=$BASE_URL" >> ./client/.env
fi