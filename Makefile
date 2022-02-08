start:
		bash ./set_localtunnel.sh
		sudo chown -R codespace .
		docker-compose up --build