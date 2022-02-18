project=rlprecords

install.scratch:
	make -j 3 -C . install.python install.web install.blockchain

install.python:
	@cd api && python3 -m venv venv && . ./venv/bin/activate 

install.web:
	@cd lib/contracts && yarn link
	@cd webclient && yarn link @rlprecords/contracts && yarn

install.blockchain:
	@cd blockchain && yarn

up:
	make -j 5 -C . web.start hh.node server.py.up ipfs.start hh.deploy
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
server.py.up:
	@cd api && . ./venv/bin/activate && python manage.py runserver

server.py.shell:
	@cd api && . ./venv/bin/activate && python manage.py shell

db.py.drop:
	@cd api && . ./venv/bin/activate && python manage.py flush

db.py.shell:
	@cd api && . ./venv/bin/activate && python manage.py dbshell

db.py.flush:
	@cd api && . ./venv/bin/activate && python manage.py sqlflush

db.py.new_migration:
	@cd api && . ./venv/bin/activate && python manage.py makemigrations

db.py.migrate:
	@cd api && . ./venv/bin/activate && python manage.py migrate

db.py.loadfixtures: 
	@cd api && . ./venv/bin/activate && python manage.py loaddata ${NAME}

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

db.drop:
	@docker-compose -p ${project} exec api python manage.py flush

db.flush:
	@docker-compose -p ${project} exec api python manage.py sqlflush
