#!/bin/sh
cd /var/www/MedCheck/Source/
npm update
npm install
bower install
grunt build
cd /var/www/MedCheck/Source/dist/server
(grunt serve:dist >> /home/ubuntu/gruntlog/nodelog.log &)