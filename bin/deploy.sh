docker start 98a &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build -t fang/node-web-app . &&
docker run --name app --network=host -p 3000:3000 -d fang/node-web-app &&
echo 'OK!'

