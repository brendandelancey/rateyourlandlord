#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo chmod -R 777 /home/ubuntu/rateyourlandlord

# navigate into current working directory

cd /home/ubuntu/rateyourlandlord

# install node modules

npm install

# start our node app in the background using pm2

sudo pm2 start ‘npm start.’