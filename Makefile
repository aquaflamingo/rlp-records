PROJECT=rlp_records

web.start:
	@cd webclient; yarn start

server.mongoup:
	@docker-compose -f ./webserver/docker-compose.yml up mongo 

server.start:
	@cd webserver && yarn start

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
