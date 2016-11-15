#!/usr/bin/env bash

set -e

# pull
echo "Pulling from origin"

git pull

git add -A

echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."

git commit -a -m "$MESSAGE"

git push
