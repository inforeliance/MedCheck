#!/bin/sh
cd /var/www/MedCheck/Source/
npm update
npm install
bower install
grunt build
cd /var/www/MedCheck/Source/dist/server
nodejs app.js