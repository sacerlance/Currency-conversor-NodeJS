#! /bin/bash

cd /opt/app
pm2 start index.js --watch --no-daemon --node-args="$NODE_OPTIONS" -- --port=$PORT
