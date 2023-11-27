cd client && npm run build && cd ..
git add server/src/main/resources/static
git commit -m "new build"
git push
git push heroku main
