#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

echo "Navigate to backend folder!"
cd ../backend

echo "Installing Dependencies..."
npm install --yes

echo "starting backend server..."

echo "PM2 Reload"
pm2 reload 0

echo "Deployment Finished!"