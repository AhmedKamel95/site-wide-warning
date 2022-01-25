start:
		npm i -g localtunnel
		lt -p 8000 --subdomain site-wide-warning &
		docker-compose up --build