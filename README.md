# Activist Agenda Web Application
The purpose of this app is to centralize data in terms of the political activism. This includes information about local protests, recent news, recent legislations that are being voted on, supplies needed, ways to donate, and other information that is relevant to a certain movement. Future implications of this application could include anything that will aid political activism of any future movements as well. This application was inspired by the Black Lives Matter Movement.

## Features

* User Sign Up
* User Login
* Creating and viewing "update" (donation links, petition links, statuses, etc.)
* Creating and viewing protests
* News Data Aggregation
* Showing support to a protest/petition/donation

## List of API Keys

Details here and step-by-step file/line for API key replacement.
- API for GeoCoding: OpenCage
- MailGun API key is set inside `activist-agenda/src/mailgun.js` at line 3 using a Heroku config var.

## Environmental Variables

All API keys are set using Heroku environment variables or config vars. These can be accessed in the code using  `process.env.VAR_NAME` . New variables can be set or edited under the “Reveal Config Vars” section in the settings.

Current Config Vars:
`BASE_URL`
`MONGO_URI`
`MG_API`
`MAP_API`
`NEWS_API`


## Running Local Build
1. `npm run install-all`
2. `cd activist-agenda;npm run build`
3. Start mongodb service
4. `cd ..;npm run server`
