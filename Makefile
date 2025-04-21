help:
	@echo "Targets:"
	@echo "    make start"
	@echo "    make down"
	@echo "    make pull"
	@echo "    make build"
	@echo "    make migration"
	@echo "    make production"

start:
	docker-compose up -d

down:
	docker-compose down

pull:
	docker-compose pull

build:
	docker-compose build

migration:
	alembic upgrade head

production:
	docker-compose -f docker-compose.prod.yml up --build

server:
	npm run dev -- --port 3000