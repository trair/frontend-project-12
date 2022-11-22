start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

install:
	npm ci

build:
	npm run build
	npm run start