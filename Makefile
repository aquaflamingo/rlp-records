project=rlprecords

up:
	make -j 4 -C . web.start hh.node server.pyup ipfs.start
###############################################################
# CLIENT
###############################################################
web.start:
	@cd webclient; yarn start

###############################################################
# CHAIN
###############################################################
hh.node:
	@cd blockchain && yarn start:node

hh.compile:
	@pushd blockchain; yarn compile; popd

hh.deploy:
	@pushd blockchain; yarn deploy; popd

ipfs.start:
	@echo "Running IPFS daemon in --offline mode"
	@./ipfsd.sh

ipfs.clean:
	@./ipfsclean.sh
	@echo "Done"

###############################################################
# SERVER
###############################################################

server.pyup:
	@cd api && . ./venv/bin/activate && python manage.py runserver

server.pyshell:
	@cd api && . ./venv/bin/activate && python manage.py shell

db.pyshell:
	@cd api && . ./venv/bin/activate && python manage.py dbshell

db.pyflush:
	@cd api && . ./venv/bin/activate && python manage.py sqlflush

db.pynew_migration:
	@cd api && . ./venv/bin/activate && python manage.py makemigrations

db.pymigrate:
	@cd api && . ./venv/bin/activate && python manage.py migrate

###################################################################
# CONTAINERZ
###################################################################

server.up:
	@docker-compose -f ./api/docker-compose.yml -p ${project} up

server.build:
	@docker-compose -f ./api/docker-compose.yml -p ${project} build --no-cache

server.clean:
	@docker-compose -p ${project} -f ./api/docker-compose.yml down -v --rmi local --remove-orphans

db.new_migration:
	@docker-compose -p ${project} exec api python manage.py makemigrations

db.migrate:
	@docker-compose -p ${project} exec api python manage.py migrate

db.loadfixtures: 
	@docker-compose -p ${project} exec api python manage.py loaddata ${NAME}

db.flush:
	@docker-compose -p ${project} exec api python manage.py sqlflush
