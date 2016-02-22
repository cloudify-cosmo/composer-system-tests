#!/usr/bin/env bash

set -e


echo "read configuration"

source /etc/ENVIRONMENT_VARIABLES.sh || echo "no environment variables file.. skipping.. "

source /vagrant/dev/ENVIRONMENT_VARIABLES.sh || echo "no dev environment variables file.. skipping.. "

echo "install git"
sudo yum install -y git wget

export PROJECT_NAME="composer-system-tests"
export GIT_DEST="`pwd`/${PROJECT_NAME}"
export GIT_URL="https://$GITHUB_USER:$GITHUB_TOKEN@github.com/guy-mograbi-at-gigaspaces/${PROJECT_NAME}.git"

echoerr() { echo "$@" 1>&2; }


echo "install nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
echo "this is nvm dir $NVM_DIR"
source ~/.nvm/nvm.sh
## guy - I don't know why but without this it won't work. version here does not matter.
nvm install 4.2.1 &> /dev/null

#### stuff for phantomjs.. :(
if [ ! -f /usr/lib64/libfreetype.so.6 ] || [ ! -f /usr/lib64/libfontconfig.so.1 ];then
    echo "fixing centos image : installing libfreetype.so.6 for phantomjs"
    sudo yum install freetype fontconfig -y
else
    echo "libfreetype is present.. moving on.."
fi

if [ ! -f /usr/bin/bzip2 ]; then
    sudo yum install -y bzip2
else
    echo "bzip2 exists. skipping..."
fi

if [ ! -f /usr/bin/java ]; then
    echo "installing java"
    sudo yum install -y java-1.7.0-openjdk &> /dev/null
#    sudo apt-get install -y openjdk-7-jre-headless
else
    echo "java already installed"
fi


#### end of stuff for phantomjs

git clone ${GIT_URL} ${GIT_DEST}
echo "clone finished"

pushd ${GIT_DEST}
    echo "building ${GIT_REFERENCE}"
    git checkout ${GIT_REFERENCE}
    echo "installing nodejs"
    ( nvm install &> /dev/null ) || echo "unable to install using nvm"

    echo "installing build-helper"
    npm -g install guy-mograbi-at-gigaspaces/cloudify-ui-build-helper
#    echo "creating build tag"
#    create-and-push-build-tag
    source get-artifacts-files

    COMPOSER_URL="${CLOUDIFY_COMPOSER_UNSTABLE_URL}" /vagrant/install_composer.sh

    npm install &> /dev/null
    npm install -g grunt-cli phantomjs &> /dev/null

    echo "TEST_TYPE is : $TEST_TYPE"
    echo "BROWSER_TYPE is : $BROWSER_TYPE"

    if [ "$TEST_TYPE" = "" ]; then
        echoerr "need to define TEST_TYPE!"
        exit 1
    fi


    export PROTRACTOR_BASE_URL="http://localhost:3000"
    grunt ${TEST_TYPE}

#    export S3_FOLDER="`get-unstable-s3-folder`"
#    echo "running install_prereq"
#    npm run install_prereq
#    npm run build_and_publish
popd

