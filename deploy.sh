#!/bin/bash

cp /var/env/zennbot-client/.env .env

yarn
yarn build
