######################################################################################################
List of Useful Commands, Feel Free to Add More
Version: 1.1
######################################################################################################
//----------------------------------------------------------------------------------------------------
Docker:

Build:
	docker build --tag backend-docker .
	docker build --tag frontend-docker .

Run:
	docker run -p 5000:5000 backend-docker
	docker run -p 3000:3000 frontend-docker

Docker Compose Run:
	docker compose up

Useful commands:
	docker container ls
	docker stop [CONTAINER ID]
	docker images
	docker image rm -f [IMAGE TAG]

//----------------------------------------------------------------------------------------------------
Deployment:

Install Elastic Beanstalk CLI from Linux Machine (Virtual Box VM reccomended):
https://github.com/aws/aws-elastic-beanstalk-cli-setup

Initialize Project:
	eb init

Deploy Project:
	eb deploy

SSH into Project:
Donwload keypair from AWS console
	eb ssh

//----------------------------------------------------------------------------------------------------
Backending:

Packages needed to install for backending:
Initialize a package JSON file
	npm init

Install dependencies:
	npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request

Install depth dependencies
	npm i -D nodemon concurrently

//---------------------

Run Server:
	npm run server

To run the backending directly, tpying
	node server.js

//----------------------------------------------------------------------------------------------------
Frontending (Folder 'client'):

Before run code, need to install:
Create a react app to a folder 'client'
	npx create-react-app client
	// If you are in Folder Instantutor you may need to change the name of folder because of conflict
More tools
	npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment antd

//---------------------

To run front page and connect to database (Do it in Folder instatutor)
	npm run dev

To run front page only (Need to cd client)
	npm start

//----------------------------------------------------------------------------------------------------

Git commands: (different from github)
Understanding the current file situation:
	git status
	
Getting the updated file:
	git pull

Add all files to Git:
	git add .

Commit to Git
	git commit -m 'Commit Message'
