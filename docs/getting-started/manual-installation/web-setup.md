---
sidebar_position: 2
---

# Setting up the web app
## Initial Setup
1. Upload the source code into your server (using `git clone` is the recommended path)
2. At the root directory, create a new `.env` file (you can use the provided `.env.example` as a starting point). There, you need to set the URL endpoint to your API instance.
````sh
VITE_MYFIN_BASE_API_URL=https://api.querty.xyz/; # PUT YOUR API INSTANCE BASE URL HERE
````
3. Install the dependencies
````sh
npm install
````
4. Build the app
````sh
npm run build
````
5. Make the necessary web server changes to set a custom document root for the domain:
````
<PROJECT_ROOT>/dist
````

## Updating
1. Update the project files
````sh
git pull
````
2. Install the dependencies
````sh
npm install
````
3. Build the app
````sh
npm run build
````
