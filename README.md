## Deployment
    #Prepare your local environment
        - Login to heroku by typing "heroku login"
        - Check that you have a heroku remote by typing "git remote -v"
            - If not, type "heroku git:remote -a hasse-be"
    
    #Deploy
        To deploy to a new build to heroku run the command: 
          - *heroku login (login to heroku)
          - ./deploy-heroku.sh 
  
        ...in a bash terminal or on Windows choose to open the file as a git-bash file if prompted.

        This script will:
          - Run npm build and move the contents of the build folder to the static folder inside the backend.
          - Git commit the changes to the static folder to github.
          - Push the changes to Heroku.
