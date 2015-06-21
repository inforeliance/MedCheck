#!/bin/sh
cd /var/www/MedCheck/Source/
npm update
npm install
bower install
grunt build