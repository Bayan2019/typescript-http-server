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