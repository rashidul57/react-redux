This is a sample scraping application built using React, Redux, Socket.io, node.js, MongoDB, Redis.

It contains simple login and then allows to provide search key and location that is required for the corresponding websites scraping. Using socket.io it show update/progress in ui

## How to run the application
1. Make sure you have installed MongoDB and Redis and node.js

2. add the following data in mongodb with database name 'scraping' and collection name 'users'
```
{
    "_id" : ObjectId("5a5e3040da00cf1293a3b2e6"),
    "fullName" : "Rashidul Islam",
    "firstName" : "Rashidul",
    "lastName" : "Islam",
    "password" : "$2a$10$0FZJ3rV91mGuyTYiQfLPCubiL3ybggMMUhWUu7lORbk4n4K1JsHjC",  // newyork952
    "email" : "rashid@sentinellabs.io"
}
```

3. install required modules:
```
$ npm install
```

4. build front end
```
$ npm run build
```

5. run the application
```
$ node app
```

6. run the application in
```
https://localhost:3000
```
