#!/bin/sh
rimraf ./build && tsc && node build/index.js