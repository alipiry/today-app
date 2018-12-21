# today-app
A todo list app written with React Native for iOS

## Running

Clone the project and change your current working dir to it:
```bash
  git clone git@github.com:alipiry/today-app.git
  cd today-app/
```

First of all `cd client/` and then run:
```bash
  yarn
```

Then `cd server/` and do the same thing:
```bash
  yarn
```

Create your mysql database on your machine and name it `today` with following config:
```bash
  username:root
  password:root
  host:127.0.0.1
```

Finally run both client and server:

in the `client/`, run:
```bash
  npm run start
```

in the `server/`, run:
```bash
  npm run dev
```

Now in `client/` simply run:
```bash
  react-native run-ios
```

> Note: If you got problem with server side, you must push some dummy data to data base!
