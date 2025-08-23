# Welcome to Web Servers

Any server worth its salt can handle many requests at the same time. In TypeScript, we use asynchronous functions and the event loop to handle many requests concurrently. 

One of Chirpy's servers is processing requests unbelievably slowly. 
It's processing every request using `async/await`. 
Wrap all the requests in a single promise using `Promise.all` to fix the bug.