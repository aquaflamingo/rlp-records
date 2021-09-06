project=rlprecords

server.up:
	@docker-compose -f docker-compose.yml -p ${project} up

server.build:
	@docker-compose -f docker-compose.yml -p ${project} build --no-cache

server.clean:
	@docker-compose -p ${project} down -v --rmi local --remove-orphans

db.new_migration:
	@docker-compose -p ${project} exec python manage.py makemigrations

db.migrate:
	@docker-compose -p ${project} exec python manage.py migrate

db.loadfixtures: 
	@docker-compose -p ${project} exec python manage.py loaddata ${NAME}


