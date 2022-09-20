# RLP Records 
Alright so here's a fun idea: 

> An audio registry system that uses acoustic fingerprinting algorithms to create a fingerprint for a given digital audio file's content and then writes that fingerprint and associated identifying metadata data to a file stored within an immutable distributed file system (IPFS) that is linked to a non-fungible token within a separate immutable digital ledger (ETH). 

## Demo
https://user-images.githubusercontent.com/16901597/191325144-3d705515-124b-40a9-98ab-ce6c1cb4b035.mp4

## How It Works
This is a prototype but you can see the flow of creating a record in the figure below.

There are three areas of the RLP Records app: the RecordKit, RecordPress and RecordStack.

* RecordKit is responsible for drafting Records to release
* RecordPress is responsible for uploading and creating NFTs for Record drafts
* RecordStack is where a user can see all their Records

![](./docs/creating-records-in-rlp-records.png)

You can read more about [the idea here too](./docs/the-idea.md)!

## Getting Started
RLP Records concept is composed of three parts:

1. [webclient](./webclient/README.md): React Frontend Client 
2. [blockchain](./blockchain/README.md): ETH Hardhat Solidity Project
3. [lib/contracts](./lib/contracts/README.md) Shared Contract Artifacts NPM Package
4. [api](./api/README.md): Django Backend API

Each of these projects are compartmentalized and can be developed individually with an accompanied `README.md` in each folder. 

You will need to follow the setup instructions in each folder in order to get started, and then you can run the root `Makefile` containing all the commands you need to run it. 

### Requirements
- python & pip
- docker
- node, npm, yarn
- hardhat 
- ipfs (specifically for `--offline` development)
