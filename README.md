# Ratatoskr

___

## Motivation:
Ratatoskr is a telegram bot that helps users with managing hashtags in telegram public/group.\
With Ratatoskr no-one needs to memorize any tags that are used in his projects.\
Easy management should improve public/group quality

___

## Description:
Upon interaction, bot sends an interactive telegram menu that contains all tag lists.
Easy to select and manage.
After selecting the desired tags, the user can fast-forward post with carefully selected tags to public/group.

___

## To install and run application locally:

#### Clone project and install dependencies:
1.`git clone https://github.com/k10wl/ratatoskr-bbot`  
2.`cd ratatoskr_bot`  
3.`yarn`

#### Populate .env files with required info.
Server application require `.env` file to work, set it up before launching application. 
Server contains `.env-example` file.
To correctly setup project environmental variables, copy example file
and populate it with real data.

#### Information about available actions and scripts:

| Action                                                 | Script            |
|--------------------------------------------------------|-------------------|
| Launch Ratatoskr                                       | `yarn start`      |
| Launch Ratatoskr in development mode using `nodemon`   | `yarn dev`        |
| Run unit tests                                         | `yarn test`       |
| Check for errors and enforce code style using `ESLint` | `yarn eslint-fix` |
