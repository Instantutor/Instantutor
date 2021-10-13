#!/bin/sh

echo "Building Front End..."
set -xe

ln -sf `ls -dr /opt/elasticbeanstalk/node-install/node-* | head -1`/bin/node /bin/node
ln -sf `ls -dr /opt/elasticbeanstalk/node-install/node-* | head -1`/bin/npm /bin/npm

cd client
npm ci
npm run build
echo "Finished Building Front End..."
