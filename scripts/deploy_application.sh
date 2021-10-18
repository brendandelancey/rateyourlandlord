#!/bin/bash

cd /home/ubuntu/rateyourlandlord

# install node modules
sudo git pull origin master

sudo npm install

cd client

npm install

npm run build

cd ..

sudo systemctl restart nginx

# start our node app in the background using pm2

sudo pm2 restart all