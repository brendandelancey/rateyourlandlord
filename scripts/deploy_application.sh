#!/bin/bash

# navigate into current working directory

cd /home/ubuntu/rateyourlandlord

# install node modules
sudo git fetch origin back-end/deploy
sudo git reset --hard origin/back-end/deploy

sudo git pull origin back-end/deploy

sudo npm install

# cd client

# npm install

# sudo npm run build

# cd ..

sudo systemctl restart nginx

#start our node app in the background using pm2

cd server

sudo pm2 kill

sudo pm2 start app.js --watch
