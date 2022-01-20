start:
		docker-compose up --build
		npm i -g localtunnel
		lt -p 8000 --subdomain site-wide-warning