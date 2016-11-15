#!/bin/bash

mkdir -p ~/composer
pushd ~/composer
    echo "composer URL is :: ${COMPOSER_URL}"
    wget -qq -O composer.tar.gz ${COMPOSER_URL}
    tar -xzf composer.tar.gz
    echo " I am in `pwd`"
    ls -ll
    pushd package
        #setting default user for tests
        mkdir -p nedb-data/data
        echo '{"username":"composer","password":"composer","_id":"e1as6HwZ4wGTjzmM"}' > nedb-data/data/users.txt
        #start the composer
        nohup node server.js & > serverlogs.log
    popd
popd

