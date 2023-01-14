# Library-challenge

Hello there.

### How do I get set up? ###
* npm install
* Create your mysql database on your favourite provider
* Replicate the schema with './database/main-schema.sql'
* Create an .env file at root with the following variables:
    - DATABASE_HOST_NAME: Your db host, or by default -> localhost
    - DATABASE_USER: Your db user, or by default -> root
    - DATABASE_PASSWORD: Your db password, or by default -> password
    - JWT_SECRET_KEY: A secret combination of characters for your jwt validation, example -> supersecretkey
* npm run dev

### How do I use this? ###
* run the project
* go to http://localhost:8080/api/docs/ for a full list of available endpoints

### Troubleshoot ###
* Client does not support authentication protocol...
    - run in mysql ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
