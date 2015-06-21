#!/bin/sh
/var/www/MedCheck/Source/npm update
/var/www/MedCheck/Source/npm install
/var/www/MedCheck/Source/bower install
/var/www/MedCheck/Source/grunt build