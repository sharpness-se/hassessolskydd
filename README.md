## Deployment
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
    #Backend
        1. Start Docker-desktop and start the database image
            - make sure docker desktop is running
            - start image hassessolskydd
            * if you dont have an image for hassesssolskyd Open terminal in the project root and use command "docker-compose up" 
         
        2. Navigate to /server/src/main/java/se/sharpness/hassessolskydd in vscode and click on hassessolskyddApplication.java and press the play button at the top right
    
    #Frontend
        1. Check backend is running in a terminal (vscode or terminal or by visiting http://localhost:8080)
    
        2. From the root go to /client in a terminal and use command:   
             - npm start
  
        3. Navigate to http://localhost:3000 in a browser if one doesnt open automatically. Making changes in the frontend code will automatically update in the browser.
  
        *To test frontend changes served from the backend:
             - Check docker desktop is running and that the database container is up ("docker-compose up" in the project root if its not)
             - Save files
             - "npm run build" in the client folder (This will build and run copy-files.js which will populate the static folder in the backend)
             - Start or Restart the backend and navigate to http://localhost:8080

## Test Environment
    #Frontend: Cypress
      - Cypress tests are automatically run during every push request through a workflow and github actions
  
      - Locally Cypress test can be viewed in /client/cypress/e2e
  
        1. To run tests locally from the root use command:
            - cd Client"
            - npx cypress open (in the terminal) 
            - click on E2E
            - choose a browser on which to run tests.
        
            * Note if a lot of tests fail, try running npm run build in the client folder to rebuild the backend, then restart the backend, and run the tests again.
