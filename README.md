# Assignment 3

Forked from ChengSashankh/quick-api-server

## Set up

- Clone this repo, cd into the repository and run `npm i`
- [ Optional ] If required change the port number in config/settings.json
- [ Optional ] If you intend to set up some header validation, add them into auth/validate.js
- `npm start` will start the server on the configured port
- Look for the postman collection to get a sample request

## Developing

- To enable router level header validation, add `"validate": true` to config/settings.json
- To add an endpoint, use the routers in routes/user.js and routes/admin.js to add your endpoints.
- Add your computate / processing code to compute/

## Endpoints

Just starting to list out what we might need

Authentication:
    - Sign up 
    - Sign in using social media
    - Reset password

For manipulating a trip:

    - Create or delete a trip:
    - POST /api/v1/trip/create
    - POST /api/v1/trip/delete

Edit members of trip:

    - POST /api/v1/trip/add
    - POST /api/v1/trip/remove

For manipulating locations in a trip:

    - GET  /api/v1/trip/places
    - POST /api/v1/trip/addplace
    - POST /api/v1/trip/removeplace
    - POST /api/v1/trip/rightswipe
    - POST /api/v1/trip/leftswipe
    - POST /api/v1/trip/superlike

For getting locations from library:
    - /api/v1/locations?city="singapore"






