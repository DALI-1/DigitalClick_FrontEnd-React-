![Dclick](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/e19fcd63-e06f-44b3-b9d2-1c70c881694e)

## Introduction

This project entails the creation of a website designed for Digital Click, aimed at facilitating comprehensive management of the company's virtual machines and their associated hardware configurations. The website enables the company to efficiently monitor each virtual machine, its clients, and their rental status, including payment deadlines. In essence, it serves as a CRUD (Create, Read, Update, Delete) application that enhances the company's business tracking capabilities.

## Tools

The project's front-end was developed using React JS in conjunction with the MDB React UI. On the backend, the website was constructed using the Laravel framework.

## Setting up the Front-end

1. Start first by installing Node JS [`Node Download Link`](https://nodejs.org/en/download/current)
   And then download or clone the git repo, after doing so simply install the dependencies.
```bash
npm install
```
Once you've installed the necessary dependencies, proceed by starting the development server

```bash
npm start
```

## Setting up the Back-end

To get started with the project, follow these steps:

1. **Installing XAAMP**:
   - First, download and install XAAMP from [here](https://www.apachefriends.org/download.html). This will include PHP, PHPMYADMIN, MYSQL. Make sure to include PHP's path as an environment variable so it becomes accessible through the terminal and keep MYSQL's port to 3306.

2. **Installing Composer**:
   - Composer is PHP's dependency manager, you need to install that in order for PHP to be able to read your composer.json and composer.lock files and download the dependencies for your project, so make sure first that PHP is installed globally via:
     ```bash
     php -v
     ```
   - Once that is sorted out, download and install Composer from [here](https://getcomposer.org/download/). (It shouldn't ask you for PHP's path if you configured PHP properly in your environment).

3. **Installing dependencies**:
   - Now after getting Composer installed, go to the 'server' folder, open it with VS code and then run the following command to install the dependencies:
     ```bash
     composer install
     ```
   - Once everything is set, your project's dependencies should be installed.

4. **Configure .env**:
   - Create a .env file inside the 'server' folder and add the following configuration to it:
     ```bash
     APP_NAME=digitalclick
       APP_ENV=local
       APP_KEY=
       APP_DEBUG=true
       APP_URL=http://localhost
       
       LOG_CHANNEL=stack
       LOG_DEPRECATIONS_CHANNEL=null
       LOG_LEVEL=debug
       
       DB_CONNECTION=mysql
       DB_HOST=localhost
       DB_PORT=3306
       DB_DATABASE=digitalclickDB
       DB_USERNAME="root"
       DB_PASSWORD=
       
       BROADCAST_DRIVER=log
       CACHE_DRIVER=file
       FILESYSTEM_DISK=local
       QUEUE_CONNECTION=sync
       SESSION_DRIVER=file
       SESSION_LIFETIME=120
       
       MEMCACHED_HOST=127.0.0.1
       
       REDIS_HOST=127.0.0.1
       REDIS_PASSWORD=null
       REDIS_PORT=6379
       
       MAIL_MAILER=smtp
       MAIL_HOST=mailhog
       MAIL_PORT=1025
       MAIL_USERNAME=null
       MAIL_PASSWORD=null
       MAIL_ENCRYPTION=null
       MAIL_FROM_ADDRESS="hello@example.com"
       MAIL_FROM_NAME="${APP_NAME}"
       
       AWS_ACCESS_KEY_ID=
       AWS_SECRET_ACCESS_KEY=
       AWS_DEFAULT_REGION=us-east-1
       AWS_BUCKET=
       AWS_USE_PATH_STYLE_ENDPOINT=false
       
       PUSHER_APP_ID=
       PUSHER_APP_KEY=
       PUSHER_APP_SECRET=
       PUSHER_HOST=
       PUSHER_PORT=443
       PUSHER_SCHEME=https
       PUSHER_APP_CLUSTER=mt1
       
       VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
       VITE_PUSHER_HOST="${PUSHER_HOST}"
       VITE_PUSHER_PORT="${PUSHER_PORT}"
       VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
       VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
     ```
   - After creating the .env file, feel free to edit it, change your DB name, DB port, and other settings. Now you need to change the `APP_KEY` so that it uses this key to encrypt the session. Use the following command to generate an app encryption key:
     ```bash
     php artisan key:generate
     ```
     This command will generate a value for you.

5. **Migration**:
   - Once that's sorted, simply use this command to start a migration which will create all the tables and columns in the DB:
     ```bash
     php artisan migrate
     ```
   - Once the migration finishes, you can start the Laravel project with this command:
     ```bash
     php artisan serve
     ```
## Pictures

<details>
<summary>Authentification</summary>
   
   
![Screenshot 2023-11-06 210630](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/03a212c3-5f01-432b-ba8f-3ca9ce1e561d)
   
![Screenshot 2023-11-06 210649](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/e17b4e35-ad7b-456f-a4df-2e685d9a796a)

</details>

<details>
<summary>Presentation</summary>
   
![Screenshot 2023-11-06 210423](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/0de1c0b1-6041-410e-8ae6-358ce8cdf069)
   
![Screenshot 2023-11-06 210536](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/e3963a54-f800-437c-9d89-41493e1d0b17)
   
![Screenshot 2023-11-06 210553](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/125cdc66-1624-4a87-a8bd-6903d9750c48)

![Screenshot 2023-11-06 210611](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/a122b733-2f82-41e6-928a-32f76bc92a03)

</details>

<details>
<summary>Products</summary>
   
![Screenshot 2023-11-06 210715](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/ad8e3122-3a5f-4ecc-b32f-bca768a1b671)
   
![Screenshot 2023-11-06 211810](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/94874b8a-380e-44be-8b63-6665c4dc9925)
   

</details>

<details>
<summary>Control Center</summary>
   
![Screenshot 2023-11-06 210751](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/7735aa68-b4ed-4b23-84de-fd6177aa6487)
   
![Screenshot 2023-11-06 210813](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/22cb0d6f-9746-48b8-b0d7-78508e99b3a2)
   
![Screenshot 2023-11-06 210905](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/92983891-b50e-4004-a39f-32af33894285)
   
![Screenshot 2023-11-06 210931](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/df9853df-eacb-46da-b1c4-13f2aaf2aec9)
   
![Screenshot 2023-11-06 211004](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/a1664f1c-d42c-4022-b440-31e20d4b41ea)
   
![Screenshot 2023-11-06 211204](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/faa50977-a3fa-43a6-9fa7-5f7a18964b82)

![Screenshot 2023-11-06 211220](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/d0be11dd-087b-4477-b19e-7c78d984c5a8)
![Screenshot 2023-11-06 211239](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/abadacca-5440-4712-a3fa-aae2c11b63e9)

![Screenshot 2023-11-06 211351](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/e9fcdfbb-7f40-442e-80a3-22d5aad74f23)

![Screenshot 2023-11-06 211515](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/b356904b-0b2f-47c7-88fc-2af49f5a6673)


</details>



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
