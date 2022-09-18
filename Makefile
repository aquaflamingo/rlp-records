project=rlprecords

up:
	make -j 5 -C . web.start blockchain.node server.py.up ipfs.start blockchain.deploy

###############################################################
# CLIENT
###############################################################
web.start:
	@cd webclient; yarn start

web.fmt:
	@cd webclient; yarn fmt

###############################################################
# CHAIN
###############################################################
blockchain.node:
	@cd blockchain && yarn start:node

blockchain.compile:
	@pushd blockchain; yarn compile; popd

blockchain.deploy:
	@pushd blockchain; yarn deploy; popd

ipfs.start:
	@echo "Running IPFS daemon in --offline mode"
	@./ipfsd.sh

ipfs.clean:
	@./ipfsclean.sh
	@echo "Done"

###############################################################
# Local development server
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
