project=rlprecords

server.up:
	@docker-compose -f docker-compose.yml -p ${project} up

db.new_migration:
	@python manage.py makemigrations

db.migrate:
	@python manage.py migrate

db.loadfixtures: 
	@python manage.py loaddata ${NAME}


