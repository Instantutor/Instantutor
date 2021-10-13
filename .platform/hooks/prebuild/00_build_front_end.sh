#!/bin/sh

echo "BuildingFront End..."
cd client
npm ci
npm run build
