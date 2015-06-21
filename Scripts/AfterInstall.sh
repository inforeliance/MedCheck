#!/bin/sh
chown ubuntu /var/www/MedCheck/ -R 
cd /var/www/MedCheck/Source/
npm update
npm install
bower install
grunt build