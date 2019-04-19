# **Its Over 9000! API**

Predicts the strength of a chess board position using neural networks.

# **Maintainers**

[@ArthurLeonard](https://github.com/ArthurLeonard)


# **Deployed Backend**

- https://its-over-nine-thousand.herokuapp.com/


#### Production

- [Express](https://www.npmjs.com/package/express): `Fast, unopinionated, minimalist web framework for Node.js`
- [Body parser](https://www.npmjs.com/package/body-parser): `Parse incoming request bodies in a middleware before your handlers`
- [Bcryptjs](https://www.npmjs.com/package/body-parser): `Allows you to store passwords securely in your database`
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): `Generate and verify json web tokens to maintain a stateless api`
- [Knex](https://www.npmjs.com/package/knex): `Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use`
- [Pg](https://www.npmjs.com/package/pg): `Non-blocking PostgreSQL client for Node.js.`
- [Sqlite3](https://www.npmjs.com/package/sqlite3): `Asynchronous, non-blocking SQLite3 bindings for Node.js.`
- [Cors](https://www.npmjs.com/package/cors): `CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS`
- [Helmet](https://www.npmjs.com/package/helmet): `Helmet helps you secure your Express apps by setting various HTTP headers`
- [Dotenv](https://www.npmjs.com/package/dotenv): `Dotenv is a zero-dependency module that loads environment variables from a .env file`

#### Developer

- [Nodemon](https://www.npmjs.com/package/nodemon): `nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected`

# **Setup**

(# <--- signifies comment)

In your terminal run:

```
# Install dependencies
npm install

# Starts express server using nodemon
npm run server
```

# **Table of Contents**

- [Test User Accounts](#test-user-accounts)
- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [Auth Routes](#auth-routes)
     - [Login User](#login)
     - [Register User](#register)
     - [Update Password](#updatepassword)
     - [Remove Account](#removeaccount)
- [Seeker Routes](#seeker-routes)
     - [Get Seeker](#get-seeker)
     - [Add Seeker](#add-seeker)
     - [Update Seeker](#update-seeker)
     - [Delete Seeker](#delete-seeker)




## **REGISTER**

### **Registers a user**

_Method Url:_ `/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       	| type   | required | description    |
| ---------- 	| ------ | -------- | -------------- |
| `username`    | String | Yes      | Must be unique |
| `password` 	| String | Yes      |                |

_example:_

```

{
  "username": "fanny"
  "password": "squeers",
}

```

#### Response

##### 201 (Created)

> If you successfully register a user the endpoint will return an HTTP response with a status code `201` and a body as below.

_example:_

```
`Welcome, fanny. You have successfully registered. Please Login to continue`
```

##### 400 (Bad Request)

> If you are missing a email or password for registration, the endpoint will return an HTTP response with a status code `400` and a body as below.

_example:_

```
`You must provide both a username and a password. Please try again.`
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{	
	error: err, 
	message: 'Something went wrong while registering. Please try again later'
}

```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       	| type   | required | description                                                        |
| ---------- 	| ------ | -------- | ------------------------------------------------------------------ |
| `username`    | String | Yes      | Must match a registered username           	                  |
| `password` 	| String | Yes      | Must match a password in the database corresponding to username above |

_example:_

```

{
  "username": "fanny"
  "password": "squeers",
}

```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
	message: 'Username and password match.',		
     	token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MDwiaWF0I1NjUxLCJleHAuOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXnE",
}

```

##### 400 (Bad Request)

> If you are missing a email or password for login, the endpoint will return an HTTP response with a status code `400` and a body as below.

_example:_

```

{
  "message": 'Please enter both a username and a password' 
}

```

##### 401 (Unauthorized)

> If login fails, the endpoint will return an HTTP response with a status code `401` which indicates the usernmae and or password combination is not valid.

_example:_

```

{
  message: 'Invalid Credentials. Please try again.'
}

```

##### 500 (Bad Request)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while logging in"
}

```

# SEEKER ROUTES

## **GET SEEKER**

### **Get seeker profile by user id**

_Method Url:_ `/api/seekers/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the user profile is found in the database, the endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "id": 1,
  "userId": 1,
  "firstName": "John",
  "lastName": "Dough",
  "profilePicture": "",
  "month": 2,
  "day": 4,
  "year": 1994,
  "country": "US",
  "state": "California",
  "city": "San Francisco",
  "zipcode": 93552
}

```

#### 404 (Not Found)

> If the provided `userId` doesn't have a profile, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```

{
  "message": "Sorry, but that profile doesn't exist"
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while getting that profile"
}

```

## **ADD SEEKER**

### **Add a seeker**

_Method Url:_ `/api/seekers`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |
