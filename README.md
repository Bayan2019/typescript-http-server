# Learn HTTP Servers in TypeScript

Chirpy is a social network similar to Twitter.

## Servers

A web server is just a computer that serves data over a network, typically the Internet. 
Servers run software that listens for incoming requests from clients. 
When a request is received, the server responds with the requested data.

### Async TypeScript

JavaScript servers are typically single-threaded. 
A Node.js server (often using the Express framework) only uses one CPU core at a time. 
It can still handle many requests at once by using an async event loop. 
That just means whenever a request has to wait on I/O (like to a database), the server puts it on pause and does something else for a bit.

Here's a simple example of an asynchronous operation in TypeScript:
```ts
async function fetchUserData(userId: number): Promise<User> {
  const res = await fetch(`https://api.example.com/user/${userId}`);
  return res.json();
}
```
https://www.boot.dev/lessons/b529b2c7-d5ec-47bb-9c6c-a63e8a7e507d

### Setup

After installing `nvm`, add a `.nvmrc` file to the root of your project directory that contains a snippet of text:
```sh
21.7.0
```
This allows you to simply type `nvm use` in your CLI while in the root of your project to activate the correct version of node! 
You may get an installation command to run if you don't yet have that version of node, but it's just another one-liner.

```sh
npm install typescript
```

### Build

1. To create a new Node.js project run
    ```sh
    npm init -y
    ```
2. Add TypeScript along with types for `node`
    ```sh
    npm install -D typescript @types/node
    ```
3. Configure TypeScript by creating a `tsconfig.json` file.
4. Configure the `package.json` in the root of your project
6. Add the express library along with its types to your project
    ```sh
    npm i express
    npm i -D @types/express
    ```
9. Run your server
    ```sh
    npm run dev
    ```

### Fileservers

A fileserver is a kind of simple web server that serves static files from the host machine. 
Fileservers are often used to serve static assets for a website, things like:

- HTML
- CSS
- JavaScript
- Images

### Workflow Tips

Servers are interesting because they're always running. 
A lot of the code we've written in Boot.dev up to this point has acted more like a command line tool: it runs, does its thing, and then exits.

Servers are different. 
They run forever, waiting for requests to come in, processing them, sending responses, and then waiting for the next request. 
If they didn't work this way, websites and apps would be down and unavailable all the time!

### Custom Handlers

An HTTP handler in Express is typically a function with the following signature:
```ts
(req: Request, res: Response) => Promise<void>;
```
To handle an incoming HTTP request, all a handler function requires is the request object and a response object in order to communicate back to the client.

### Request, Response

All handlers in express take a `Request` and a `Response`.

The `Request` argument is fairly obvious: it contains all the information about the incoming request, such as the HTTP method, path, headers, and body.

The `Response` is less intuitive in my opinion. 
The response is an argument, not a return type. 
Instead of returning a value all at once from the handler function, we write the response to the `Response` object.

## Routing

### Middleware

Middleware is a way to wrap a handler with additional functionality. 
It is a common pattern in web applications that allows us to write DRY code. 

Middleware in Express has the following function signature:
```ts
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
```
* `req`: The request object.
* `res`: The response object.
* `next`: A function that, when called, will pass control to the next middleware in the chain.

You can register middleware on an application level using the express app's `.use` method.
```ts
app.use(middlewareLogging);
```
You can also apply it to specific routes by passing it as an argument to the route's handler.
```ts
app.get("/users", middlewareLogging, handlerGetUsers);
```
In fact, you can use as many middlewares as you like:
```ts
app.get('/users', middlewareLogging, middlewareAuth, ...,  handlerGetUsers);
```

### API Config

It's frequently useful to have a way to store and access state in our handlers. 
For example, we might want to keep track of the number of requests we've received, or we may want to pass around credentials to an API.

## Architecture

### Monoliths and Decoupling

#### Monolithic

A monolith is a single, large program that contains all the functionality for both the front-end and the back-end of an application. 

#### Decoupled

A "decoupled" architecture is one where the front-end and back-end are separated into different codebases. 
For example, the front-end might be hosted by a static file server on one domain, and the back-end might be hosted on a subdomain by a different server.

### Deployment Options

## JSON

### HTTP Clients

### JSON

#### Decode JSON Request Body
It's very common for `POST` requests to send JSON data in the request body.

We can manually read this body using Node.js streams. Here’s a quick overview of the process:

1. Initialize a string buffer – this will accumulate the incoming JSON data.
2. Listen for 'data' events – Each time a chunk of data arrives, append it to your string buffer.
3. Listen for 'end' events – Once there’s no more data coming in, parse your accumulated string as JSON.
```ts
async function handler(req: Request, res: Response) {
  let body = ""; // 1. Initialize

  // 2. Listen for data events
  req.on("data", (chunk) => {
    body += chunk;
  });

  // 3. Listen for end events
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      // now you can use `parsedBody` as a JavaScript object
      // ...
    } catch (error) {
      res.status(400).send("Invalid JSON");
    }
  });
}
```

#### Encode JSON Response Body

Encoding the JSON response is a much simpler process. 
You just need to stringify the JavaScript object and use the `res.send()` method.
```ts
async function handler(req: Request, res: Response) {
  type responseData = {
    createdAt: string;
    ID: number;
  };

  const respBody: responseData = {
    createdAt: new Date().toISOString(),
    ID: 123,
  };

  res.header("Content-Type", "application/json");
  const body = JSON.stringify(respBody);
  res.status(200).send(body);
}
```

### JSON Middleware

Manually parsing the request body with streams is pretty tedious. 
Luckily, Express has convenient built-in middleware to parse JSON request bodies. 
All you need is:
```ts
import express from "express";

const app = express();

// Built-in JSON body parsing middleware
app.use(express.json());
```
Express will automatically:

* Check if the `Content-Type` header is set to `application/json`
* Parse the request into `req.body`.
* Handle errors for malformed JSON.

```ts
async function handler(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  // req.body is automatically parsed
  const params: parameters = req.body;
  // ...
}
```

### The Profane

## Error Handling

### Error-Handling Middleware

Express allows you to capture and handle errors using special middleware. 
An error-handling middleware function has four parameters: `(err, req, res, next)`.

1. **Synchronous** errors (thrown in your route handlers) automatically skip normal middleware and go straight to this error handler.
2. **Asynchronous** errors (in `async` functions) must be caught or passed to `next(err)` so they can also be handled here.

When an error reaches your error handler, you can respond with a 500 status code or any other status you choose.
```ts
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("Uh oh, spaghetti-o");
  res.status(500).json({
    error: "Boots has fallen",
  });
}

app.use(errorHandler);
```

In Express 4, unhandled `async` errors don’t automatically go to the error handler. 
You can work around this by using `try/catch` in async route handlers.
```ts
app.post("/api", async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (err) {
    next(err); // Pass the error to Express
  }
});
```
Or you can use promises with `.catch(next)`.
```ts
app.post("/api", (req, res, next) => {
  Promise.resolve(handler(req, res)).catch(next);
});
```

### Custom Errors

One of the few times when inheritance is a good idea is when creating custom error classes. 
By extending the built-in `Error` class, we can create custom error types that are easy to identify and handle within our application.

Here's a simple example of a NotFoundError class
```ts
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}
```
In the error handler, we can check the error type and handle it accordingly.
```ts
function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof NotFoundError) {
    res.status(404).send("Not Found");
  } else {
    res.status(500).send("Internal Server Error");
  }
}
```

## Storage

Arguably the most important part of your typical web application is the storage of data.

When you're building a web server, any data you store in memory (in your program's variables) is lost when the server is restarted. 
Any important data needs to be saved to disk via the file system.

### Option 1: Raw Files

We could take our user's data, serialize it to JSON, and save it to disk in `.json` files (or any other format for that matter). 
It's simple, and will even work for small applications. 
Trouble is, it will run into problems fast:

* **Concurrency**: If two requests try to write to the same file at the same time, you'll get overwritten data.
* **Scalability**: It's not efficient to read and write large files to disk for every request.
* **Complexity**: You'll have to write a lot of code to manage the files, and the chances of bugs are high.

### Option 2: a Database

At the end of the day, a database technology like MySQL, PostgreSQL, or MongoDB "just" writes files to disk. 
The difference is that they also come with all the fancy code and algorithms that make managing those files efficient and safe. 
In the case of a SQL database, the files are abstracted away from us entirely. 
You just write SQL queries and let the DB handle the rest.

### Drizzle ORM

Drizzle is a ORM and migration tool written in TypeScript. 
Its API and syntax is very similar to SQL, making it a perfect fit for this project (we wanna stay close to the raw SQL).
```ts
npm i drizzle-orm postgres
npm i -D drizzle-kit
```

A migration is just a set of changes to your database table.
 You can have as many migrations as needed as your requirements change over time. 
 For example, one migration might create a new table, one might delete a column, and one might add 2 new columns.

An "up" migration moves the state of the database from its current schema to the schema that you want. 
So, to get a "blank" database to the state it needs to be ready to run your application, you run all the "up" migrations.

If something breaks, you can run one of the "down" migrations to revert the database to a previous state. 
"Down" migrations are also used if you need to reset a local testing database to a known state.

Test your connection string by running psql, for example:
```ts
psql "postgres://wagslane:@localhost:5432/chirpy"
```

### Automatic Migrations

So we can generate migrations based on our schema, and we can use these migrations to update our database. 
Doing this manually is fine for now, but as our project grows, we'll want to automate this process.

### Database Review

It's very standard to use database software to store web server data on disk. 
Sometimes that database runs on the same host machine as your server (like we're doing on your local machine), but it's also common to have a separate database server that your server connects to over the network.

### Collections and Singletons

## Authentication

Authentication is the process of verifying who a user is. 
If you don't have a secure authentication system, your back-end systems will be open to attack!

Imagine if I could make an HTTP request to the YouTube API and upload a video to your channel. 
YouTube's authentication system prevents this from happening by verifying that I am who I say I am.

### Authentication With Passwords

Passwords are a common way to authenticate users.

There are 2 really important things to consider when storing passwords:

* **Storing passwords in plain text is awful**. If someone gets access to your database, they will be able to see all of your users' passwords. If you store passwords in plain text, you are giving away your users' passwords to anyone who gets access to your database.
* **Password strength matters**. If you allow users to choose weak passwords, they will be more likely to reuse the same password on other websites. If someone gets access to your database, they will be able to log in to your users' other accounts.

**Hashing** is a one-way function. It takes a string as input and produces a string as output. The output string is called a hash.

For now, just know that hashing is a way to store passwords in a way that prevents them from being read by anyone who gets access to your database, but still allows us to compare passwords when a user logs in.

### Types of Authentication

Here are a few of the most common authentication methods you'll see in the wild:

Password + ID (username, email, etc.)
3rd Party Authentication ("Sign in with Google", "Sign in with GitHub", etc)
Magic Links
API Keys


## Authorization

## Webhooks

## Documentation