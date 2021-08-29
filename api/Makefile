project=rlp_records_api

server.up:
	@python manage.py runserver

db.new_migration:
	@python manage.py makemigrations

db.migrate:
	@python manage.py migrate

db.loadfixtures: 
	@python manage.py loaddata ${NAME}

