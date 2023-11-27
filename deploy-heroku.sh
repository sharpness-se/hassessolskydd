npm run build -w client
./gradlew server:build
git commit -m "new build"
git push
git push heroku master