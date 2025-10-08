---
sidebar_position: 1
---

# Setting up the API
## Initial Setup
1. Upload the api source code into your server (using `git clone` is the recommended path)

````sh
git clone https://github.com/afaneca/myfin-api
````

2. Create an `.env` file in the root directory with the following structure (you can use `.env.example` as a starting point):
````sh
# DB
DB_NAME=XYZ # a new DB will be created with this name if it doesn't exist already
DB_USER=XYZ
DB_PW=XYZ
DB_HOST=localhost
DB_PORT=1234
DATABASE_URL="mysql://${DB_USER}:${DB_PW}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

# EMAIL (Optional, used for the password recovery flow)
SMTP_HOST="XYZ"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="XYZ"
SMTP_PASSWORD="XYZ"
SMTP_FROM="xyz@xyz.com"

# CUSTOM OPTIONS
LOGGING="false" # THINK TWICE ABOUT ENABLING IN PROD
BYPASS_SESSION_CHECK="false" # DO NOT ENABLE IN PROD
ENABLE_USER_SIGNUP=true
PORT=3001 # optional; defines the port where the app will be running (defaults to `3001`)
````
3. Install the required dependencies:
```sh
npm ci
```
4. Generate the DB schema:
````sh
npm run db:deploy
````
5. Run the NodeJS project:
````sh
npm run start
````

You can also run the project through tools like `pm2`, using `/dist/server.js` (after compiling the code) as the entry point for the app.

:::caution

You need to make sure the api endpoint is **publicly accessible** over the internet, so that it can be used by the web and mobile apps.

:::

Now, you're ready to setup and connect your api instance to the frontend of your choosing (you can find the android app [here](https://github.com/afaneca/myfin-android) and the web app [here](https://github.com/afaneca/myfin))!

## Updating
1. Replace the old version of the project files withe the updates ones:
````sh
git pull
````
2. Update the dependencies
````sh
npm ci
````
3. Update the DB schema:
````sh
npm run db:deploy
````
4. Restart/reload the app

## Troubleshooting
### Migrating from 4.8.0 and earlier
If you're migrating from a pre-5.0.0 version of the platform, you can keep all your data, by reusing the same DB schema. All you got to do is replace the command in step 5) with this two:
````sh
npx prisma db push --accept-data-loss
````
````sh
npx prisma migrate resolve --applied 0_init
````