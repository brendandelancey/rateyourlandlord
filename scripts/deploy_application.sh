#!/bin/bash

# navigate into current working directory

cd /home/ubuntu/rateyourlandlord

# install node modules
sudo git fetch origin deploy
sudo git reset --hard origin/deploy

sudo git pull origin deploy

sudo npm install

cd client

npm install

sudo npm run build

cd ..

sudo systemctl restart nginx

#start our node app in the background using pm2

sudo pm2 restart all