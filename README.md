# note-taker

## Description 

This [repository](mattdack.github.io/note-taker) contains the files that generate a webpage that is hosted at https://dac-note-taker.herokuapp.com/. The webpage allows users to store notes and is accessible from multiple devices. The webpage utilizes express servers and the FS standard library package to get, update, and delete from database files.

## Screenschot of website
<img src = "./public/assets/images/Website-Mock-Up.png">


## Installation

After cloning this repository, users should open the server.js file in an integrated terminal. Initialize the node package manager with the command 'npm init -y'. Install the necessary node packages and their dependencies with the command 'npm install'. The repository git ignore prevents the upload of these packages and dependencies due to size. After those two commands, the application is accessible with the command 'node index.js' which will initialize the server.

## Usage 

Please follow the installation directions above before attempting to use the application. After initilizing the server, you can open the webpage in your browser at http://localhost:3000/ . There are additional pages at the above url with appended /notes or /api/notes.

## Credits

 Matthew Dacanay created the server side code for this application. Front-end files were provided by Trilogy in conjunction with the University of Washington. Technical concepts and public resources were referred to as needed. You can find other projects by Matthew at his [github page](github.com/mattdack).