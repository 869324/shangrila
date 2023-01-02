# How to run

## Requirements

1. Mysql 8.0.\*
2. NodeJs 16.15.0

## Database

1. Create a database in MySQL and name it "shangrila_db"
2. Run the sql script in the database folder using the created database --> "shangrila_db"

## Backend

1. Open the server folder in any IDE/editor that supports JavaScript; preferably VsCode
2. Change the database credentials in the .env file to match those of your database
3. Open terminal in the server folder and run these commands one after the other:

```
npm ci
```

```
node index.js
```

## Frontend

1. Open the client folder in terminal
2. Run these commands one after the other:

```
npm i -g sass
```

```
npm ci
```

```
npm start
```
