#!/bin/sh
npm run build
rm -rf ../../osa4/blogilista/build
cp -r build ../../osa4/blogilista/