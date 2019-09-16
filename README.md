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

## Endpoints

REST is designed around resources. Resources can be objects, data or services. Here are the resources in our app:

On each of these, we want to support functionality in nested fashion. 

/api/v1

    - /user
        (Not sure yet what functionality is needed under this)
    - /trips
        - /members 
        - /vote
        - /itinerary
        - /locations
            - /top
            - /votes
    - /places
        - /store
        - /search






