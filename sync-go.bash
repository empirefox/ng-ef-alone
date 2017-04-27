#!/bin/sh

gen-ts-trans
gen-go-const-ts
gen-go-tag-apis -o src/app/demo/core/api/api.ts -i ${GOPATH}/src/github.com/empirefox/bongine/api/api.go
sed -i "s|ng-ef-sand/xlang|../../../../../lib/xlang|g" ./src/app/demo/core/api/go-consts/pipe/*.ts

# @swimlane/ngx-datatable angular2-json-schema-form angular-tree-component file:../bongin-base countdown \
# feathers feathers-memory feathers-reactive ng-lazyload-image ng2-ef-widgets ngx-rating \
# qrcanvas simple-line-icons spark-md5 sort-keys timeago.js

# @types/countdown @types/swiper

# demo:
# module=error ng g module ./demo/ef-$module --routing && ng g component ./demo/ef-$module/ --spec=false