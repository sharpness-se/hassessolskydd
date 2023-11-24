heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-java

cd client
npm install
npm run build

cd ..
cd server
./gradlew build

cd ..
java -jar server/build/libs/hassessolskydd-0.0.1-SNAPSHOT.jar