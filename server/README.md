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
       APP_KEY=base64:bDvyPLaGEaaEaCfzaQsIp/rr7CHyb4v1q0DYWdafVdk=
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
   
![Screenshot 2023-11-07 013227](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/1165bd42-e4ac-4880-8c2c-f256e5f9695e)

![Screenshot 2023-11-07 013245](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/904ec7a4-5d1c-40ab-b995-698f6843f435)

</details>

<details>
<summary>Presentation</summary>
   
![Screenshot 2023-11-07 013336](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/e65f64aa-8d03-4ce9-9071-2e3ba63d7d11)

![Screenshot 2023-11-07 013355](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/eca8bb54-63d3-4a9e-a7f0-20f59a833d2e)

</details>

<details>
<summary>Manage Servers</summary>
   
   ![Screenshot 2023-11-07 013736](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/648c857b-28ca-4f62-bad2-dfc2652c559d)

![Screenshot 2023-11-07 014655](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/29d86c9d-c5b2-4138-9a34-81b1bbf391e3)

![Screenshot 2023-11-07 015010](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/94e12927-8057-49ab-a1d1-78be03fa579c)

![Screenshot 2023-11-07 014717](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/b0502770-4594-4373-ac2a-1cd41eff99be)
   
![Screenshot 2023-11-07 014751](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/5eb79438-5650-46e6-bfe7-0ea70990a683)

![Screenshot 2023-11-07 014836](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/db24282c-9ac3-4480-899e-5bd3bb2198bd)

![Screenshot 2023-11-07 014945](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/02b0af4d-c9db-4f8b-a1b7-e816761df227)

</details>

<details>
<summary>Manage Clients</summary>
   
![Screenshot 2023-11-07 014123](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/73c5bb41-7a09-4079-a1cf-c1c5b3be5c49)

![Screenshot 2023-11-07 015027](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/1426de09-0aac-4aed-84d4-122b0029a175)


</details>

<details>
<summary> Manage Contracts, Profiles</summary>
   
![Screenshot 2023-11-07 015131](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/06f76058-c13a-4b9c-aded-c1872c90c537)
   

![Screenshot 2023-11-07 015327](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/d0d738b6-b12e-4317-9376-35d925244ef6)

![Screenshot 2023-11-07 014418](https://github.com/DALI-1/DigitalClick_FrontEnd-React-/assets/99611104/45b760c6-0427-4870-919d-d76fa1a921b1)

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
