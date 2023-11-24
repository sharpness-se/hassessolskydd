cd client
npm install
npm run build

cd ..
cd server
./gradlew build

cd ..
java -jar server/build/libs/hassessolskydd-0.0.1-SNAPSHOT.jar