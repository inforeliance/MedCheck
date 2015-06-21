#!/bin/sh
su - ubuntu
cd /var/www/MedCheck/Source
npm update && npm install && bower install && grunt build