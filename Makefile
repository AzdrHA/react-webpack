start:
	@docker compose up

stop:
	@docker compose down

restart:
	@docker compose restart

build:
	@docker compose build

install:
	@docker compose run --rm react npm install

sh:
	@docker compose run --rm react sh
