# Weather Dashboard
  ![GitHub repo size](https://img.shields.io/github/repo-size/Linus41/Bestimator?style=for-the-badge) ![GitHub code size](https://img.shields.io/github/languages/code-size/Linus41/Bestimator?color=gold&style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/Linus41/Bestimator?color=green&style=for-the-badge) ![GitHub top language](https://img.shields.io/github/languages/top/Linus41/Bestimator?color=red&style=for-the-badge)

---

## Description:
Are you the __best__ at __estimating__? With BESTimator, test to see how good you are at guessing the exact quantity, height, weight, etc. of something based on a picture. Users can create an account with a unique username and password, play five questions daily, instantly see the rank and accuracy of their estimates, improve their scores to climb the leaderboard, and compete with others to see who is the __BESTimator__!

---

## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [Resources](#resources)
* [Tests](#tests)
* [Contributors](#questions)
* [Future Development](#future-development)

---

## Installation:
none required

---

## Usage:
go to application: https://the-bestimator.herokuapp.com/

---

## Resources:
* Design:
  * [Bulma CSS Framework](https://bulma.io/documentation/overview/start/)
  * [Font Awesome](https://fontawesome.com/)
* Libraries
  * [jQuery](https://jquery.com/)
* Dependencies:
  * [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  * [concurrently](https://www.npmjs.com/package/concurrently)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [express](https://www.npmjs.com/package/express)
  * [express-handlebars](https://www.npmjs.com/package/express-handlebars)
  * [express-session](https://www.npmjs.com/package/express-session)
  * [morgan](https://www.npmjs.com/package/morgan)
  * [mysql2](https://www.npmjs.com/package/mysql2)
  * [passport](https://www.npmjs.com/package/passport)
  * [passport-local](https://www.npmjs.com/package/passport-local)
  * [sequelize](https://www.npmjs.com/package/sequelize)
* Development Dependencies:
  * [cypress](https://www.npmjs.com/package/cypress)
  * [eslint](https://www.npmjs.com/package/eslint)
  * [prettier](https://www.npmjs.com/package/prettier)
  * [Insomnia REST Client](https://insomnia.rest/)
* Deployment:
  * [Heroku](https://www.heroku.com/home)
  * [JawsDB](https://www.jawsdb.com/)

---

## Tests:
The cypress tests can be viewed by cloning this repository to your local machine, installing all dependencies, and invoking the test module with `npm run cypress`. This application has tests for the following:
* integration tests
  * _canary test
  * login test
  * signup test
* page layout tests
  * game page
  * leaderboard page
  * player page

---

## Contributors: 
* Julian Secomb (https://github.com/jsecomb)
* Linus Schief (https://github.com/Linus41)
* Chyna Davis (https://github.com/CrainDavis)
* Veronica Torres (https://github.com/Drapeto)

---

## Future Development:
* signup page: notify user if their username is already being used by someone else
* login page: notify user if their username/password are either incorrect or do not exist
* allow users to update/delete their account
* prevent user from being able to access the game page if they have already played that day