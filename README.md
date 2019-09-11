# API Server Template

Ever needed to set up your own API Server, but put it off because even with node.js it takes some work? Use this boilerplate API Server to speed up your proof of concept with a simple server.

## Scope - What this is and isn't

This is a template meant to speed up a proof-of-concept or a hack. This isn't meant to be secure / compliant with production standards ( coming soon )

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

## Example use cases

This repository was

- used to develop [Find and Seek](https://devpost.com/software/find-and-seek-n0ejt9) for a hackathon. API server exposed through public IP ( running on EC2 ) for a demo.

- used for [clip](https://github.com/ChengSashankh/clip), a personal project requiring a centralized API server to handle multi-platform collaborative clipboard. 