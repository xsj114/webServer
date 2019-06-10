#!/bin/sh
cd /Users/xushijie/Desktop/webServer/node/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
