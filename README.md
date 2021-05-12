# email-blast-script

<img src="https://img.shields.io/github/license/sidharrth2002/email-blast-script">

> Sidharrth Nagappan, in 2020

> *This repository is open to pull requests.*

Written to blast emails to a list of addresses in a csv file. This simple script will automate large email campaigns. To bypass SMTP limits and increase security, it uses OAuth2 authentication and pooling. You can run this script on a server and not have to worry about the login being blocked because of location.

In order to use this script right out of the box, you first need to populate the `/env` file with this information.
```
SENDER_NAME = 
SENDER_ADDRESS = 
CLIENTID = 
CLIENTSECRET = 
REFRESH_TOKEN = 
ACCESS_TOKEN = 
```
The Sender Name and Address are self-explanatory. However, to obtain the Client ID, secret and the tokens, you have to create an application in your Developer Console, create a Client ID and then head over to the developer playground. After clicking the settings icon, add the Client ID and Secret that the console gave you. Choose the Gmail API in the list of applications on the left and click authorize.

<img width="700" alt="Screenshot 2021-04-07 at 4 39 44 PM" src="https://user-images.githubusercontent.com/53941721/113836889-def3cf00-97bf-11eb-908b-f3d76f1fe7a5.png">

Afterwhich, click the button that says "Get Tokens". Copy the tokens and add them to the `.env` file.

Populate your mailing list, template your email in HTML and run the following commands.

```
npm install
```

```
node app.js
```

This starter app can be expanded to run on a server, through an API. For large scale use (hundreds of recipients), consider renting your own server or buying your own email server first to prevent IP blacklisting. This script will be sufficient for regular use.

Future releases will include:
1. Custom Templating of Emails Through EJS
2. An option to save emails in a database (most likely Postgres) after sending them to prevent the accumulation of HTML files
