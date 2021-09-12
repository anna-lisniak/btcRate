## Installation

- Go to [Docker](https://www.docker.com/get-started) and download an app

- In the terminal run:
```bash
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

- Go to [Nodejs](https://nodejs.org/en/) and install lattes LTS version

- Install project dependencies
```bash
$ npm install
```

## Running the application

```bash
$ npm run start
```
- Open http://localhost:8081

</br>

### How it works

Every time when user tries to log in - the event is sent to rabbitmq with type 'debug' and an object with user's email and password.

When user logged in succsessfully - the event is sent to rabbitmq with type 'info' and object with text information and user token.

When user try to login but user's email doesn't exist or password is invalid - the event is sent to rabbitmq with type 'error' and an object with text information and user's email and password. Also this object will be printed in the stdout. 