#!/bin/sh
git branch -d gh-pages
git checkout -b gh-pages

echo "building and bundling..."
npm install
npm run build
npm run rollup

echo "cleaning up files..."
rm -rf node_modules
rm .gitignore
rm -rf src
rm -rf build-scripts

echo "ready to deploy to gh-pages"
git add .
git commit -m "deploy to gh-pages"
git push --set-upstream origin gh-pages --force
git checkout master
