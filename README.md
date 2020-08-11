# Simple App to create, read, update and delete links.

This application allows users to sign in / sign up through the Local strategy, also have session support. Users can create, read, update and delete links. The App was implemented with Nodejs, Express, MySQL, AJAX and Javascript (jquery).

## INSTALATION

1. prepare database, see ./database folder
2. install the required modules, in main folder write: npm install 

## RUN PROJECT

npm start - to run the whole project 
npm run dev - to run the whole project in development mode

## STRUCTURE
    - database: only information to create the databaset  
    - src : whole app
        - controllers: make requests to the database (authentication, links, types)
        - lib: 
            - auth: check if the user is authenticated
            - helpers to encrypt passwords and compare them
            - passport: Local authentication strategy (login/register)
        - public: client side (html and jquery to show data)
        - routes: handles requests made by the client (call the authentication process, call 
                the controllers)   
        - database: connection to the database
        - index: file that handles whole app
        - server: server configurations


## DESCRIPTION

**Actions:**

- User can create an account using local auth
- User can sign in using existing local account
- User can create/read/update/delete links he/she has created

**The creation of an account or the login in the application locally:** 

- User fill a form to sign in / sign up
- User sends data (requests data from the server - HTTP)
- If data is ok, user is signed in / signed up and a session is created
- server send the requested data 

**The checkAuthentication function is responsible for protecting routes, on the server side. In case the user is not authenticated, it will not be possible to access the private views (links).**

## TO IMPLEMENT

- add testing
- stylize pages
- try with jwt