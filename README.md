## Deployment
    #Prepare your local environment
        - Login to heroku by typing "heroku login"
        - Check that you have a heroku remote by typing "git remote -v"
            - If not, type "heroku git:remote -a hasses-be"
    
    #Deploy
        To deploy to a new build to heroku run the command: 
          - *heroku login (login to heroku)
          - ./deploy-heroku.sh 
  
        ...in a bash terminal or on Windows choose to open the file as a git-bash file if prompted.

        This script will:
          - Run npm build and move the contents of the build folder to the static folder inside the backend.
          - Git commit the changes to the static folder to github.
          - Push the changes to Heroku.

## Local Environment
    #Frontend

        To test changes before git commit:
          - Save files
          - "npm start" (This will open http://localhost:3000)
  
        To test frontend changes served from the backend:
          - Check docker desktop is running and that the database container is up ("docker-compose up" in the project root if its not)
          - Save files
          - "npm run build" in the client folder (This will build and run copy-files.js which will populate the static folder in the backend)
          - Start the backend and navigate to http://localhost:8080