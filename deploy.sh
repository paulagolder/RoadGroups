#!/bin/bash

FILE="$(date '+%Y-%m-%d')serverupload_jsroadgroups.tar"

DIR="./"

tar cf "$FILE" "index.html"

tar --append --file="$FILE"  "css"
tar --append --file="$FILE"  "js"
tar --append --file="$FILE"  "data"
tar --append --file="$FILE"  "images"

gzip "$FILE"
