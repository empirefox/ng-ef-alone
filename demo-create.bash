#!/bin/sh

if [ -z "$1" ]; then
  echo -n "Example:\n$0 ef-module\n"
else
  ng g module demo/ef-$1 --routing && ng g component demo/ef-$1/ --spec=false
fi