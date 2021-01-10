#!/usr/bin/env bash

yarn build &&
cd docs && 
git init &&
git add -A &&
git commit -m $1 || git commit -m "v1.x" &&
git remote add origin git@gitee.com:cai4633/my-vue-account-demo.git &&
git push -u origin master -f &&
cd -