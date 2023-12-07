## Deployment
    *Currently A bug exists which will cause tests to fail if the database on heroku is not in its initial state.
    *To push a new build the database on heroku must be reset.

    #Prepare your local environment
        - Login to heroku by typing "heroku login"
        - Check that you have a heroku remote by typing "git remote -v"
            - If not, type "heroku git:remote -a hasses-be"
    
    #Deploy
        To deploy a new build to heroku run these commands in a bash terminal or on Windows choose to open the file as a git-bash file if prompted: 
          - *heroku login (login to heroku)
          - ./deploy-heroku.sh (If Denied Permissions: "chmod +x deploy-heroku.sh" then retry)
  
        This script will:
          - Run npm build and move the contents of the build folder to the static folder inside the backend.
          - Git commit the changes to the static folder to github.
          - Push the changes to Heroku.

## Local Environment
    #Frontend
        * Currently localhost:3000 is not whitelisted in the java backend so any contact with the backend will be denied by CORS
        * Locally only #2 works at the moment
  
        1. To test changes before git commit:
             - Save files
             - "npm start" (This will open http://localhost:3000)
  
        2. To test frontend changes served from the backend:
             - Check docker desktop is running and that the database container is up ("docker-compose up" in the project root if its not)
             - Save files
             - "npm run build" in the client folder (This will build and run copy-files.js which will populate the static folder in the backend)
             - Start the backend and navigate to http://localhost:8080