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

## Routing

## Architecture

## JSON

## Error Handling

## Storage

## Authentication

## Authorization

## Webhooks

## Documentation