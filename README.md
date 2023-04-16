![Logo](https://i.imgur.com/X68jnoA.png)

#

It can be hard to choose someone to hire for a particular task. This project is made to allow users to like and post comments for a particular business in the skilled trades market which in turn can be used for others to make better informed decisions.

## ✒️Authors

- Brendon Leaman - [@bleaman](https://www.github.com/bleaman)

## 👤Link

https://skill-seeker.com

## 🖥️Tech Stack

**Client:** React, Sass

**Server:** Node, Express, MySQL

## 🖥️ Run Locally -- Server

- Clone the project

```bash
  git clone git@github.com:bleaman/BrainStation-Capstone-Server.git
```

- Go to the project directory

```bash
  cd my-project
```

- Install dependencies

```bash
  npm install
```

- Create .env file - Fill in with your information

```bash
PORT = 9950
DB_LOCAL_DBNAME = capstone_db
DB_LOCAL_USER = MYSQL_USER_NAME_GOES_HERE
DB_LOCAL_PASSWORD = MYSQL_PASSWORD_GOES_HERE
SECRET = SECRET_KEY_FOR_JWT_TOKENS_EXAMPLE:_KEY
MAILER_EMAIL = EMAIL_FOR_PASSWORD_MAILER_TO_USE
MAILER_PASSWORD = PASSWORD_FOR_PASSWORD_MAILER_TO_USE
MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_SECURE=true
```

- Create mySQL database

```bash
  CREATE DATABASE capstone_db;
```

- Run migration and seed files

```bash
  knex migrate:latest
  knex seed:run
```

- Start the server

```bash
  npm run server
```

## 🖥️ Run Locally -- Client

- Clone the project

```bash
  git clone git@github.com:bleaman/BrainStation-Capstone-Client.git
```

- Go to the project directory

```bash
  cd my-project
```

- Install dependencies

```bash
  npm install
```

- Start the server

```bash
  npm start
```

## 🚀 Future Tasks

- Build in invoicing and a payment system (square).

- Add images table to MySQL database and allow users to post multiple images for the same business AKA a portfolio.

## ⭐Acknowledgements

[![MIT License](https://slack-imgs.com/?c=1&o1=gu&url=https%3A%2F%2Femoji.slack-edge.com%2FT03B2JCEX2P%2Fbrainstation%2F91e311699e7a383e.png)](https://choosealicense.com/licenses/mit/)

[![MIT License](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKy9RHFwS_0sWbgtgowx1iLBL3jR-grbuhA&usqp=CAU)](https://choosealicense.com/licenses/mit/)

[![MIT License](https://slack-imgs.com/?c=1&o1=gu&url=https%3A%2F%2Femoji.slack-edge.com%2FT03B2JCEX2P%2Fanimations%2F677486832e608558.png)](https://choosealicense.com/licenses/mit/)

[![MIT License](https://slack-imgs.com/?c=1&o1=gu&url=https%3A%2F%2Femoji.slack-edge.com%2FT03B2JCEX2P%2Fgigachad%2F73adba462949b1ce.png)](https://choosealicense.com/licenses/mit/)

[![MIT License](https://slack-imgs.com/?c=1&o1=gu&url=https%3A%2F%2Femoji.slack-edge.com%2FT03B2JCEX2P%2Fmohan_muruge%2Fe63a400c5b6456d1.png)](https://choosealicense.com/licenses/mit/)
