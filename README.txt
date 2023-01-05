Chess Opening Practice
This project is a web application that allows users to practice chess openings and save them for later reference. It consists of a frontend that is built with HTML, CSS, and JavaScript, and a backend that is built with Node.js and a PostgreSQL database.

Features
Practice chess openings by moving the pieces on a chessboard
Save chess openings for later reference
View a list of saved chess openings

Getting Started
Clone the repository: git clone https://github.com/collinpotts/capstone.git
Install the dependencies: 
cd capstone
npm install

Set up a PostgreSQL database and update the CONNECTION_STRING in the .env file with the connection details for your database.
Seed the database with the default chess positions: using an application like postman send a request to the /seed endpoint

Start the server: using nodemon

Visit http://localhost:4004 in your browser to use the application. or input the server port you have entered

Files
index.html: The HTML file for the frontend of the application.
styles.css: The CSS file for styling the frontend of the application.
app.js: The JavaScript file for the frontend of the application. It contains code for rendering the chessboard and handling user interactions with the chessboard and other elements on the front endpoint
while also making calls to the backend when certain elements are interacted with.
server.js: The JavaScript file for the backend of the application. It contains code for setting up the server and defining routes for interacting with the database.
controller.js: The JavaScript file for the backend of the application. It contains code for interacting with the database, including functions for seeding the database, adding chess openings, and retrieving chess openings.



Technologies Used
HTML
CSS
JavaScript
Node.js
Express.js
Sequelize
PostgreSQL

Bugs:
If you put a chess piece on another piece on the board it overlaps it
if you put a position on the board and flip the board it does not have the pieces correctly placed because it just flips the board vertically in css
The application allows the user to save multiple openings with the same name to the database causing issues with overlapping of the pieces when rendered on the board


Future Improvements
Allow users to delete saved chess openings
Add a feature for analyzing the chess positions of a saved opening
Add user authentication so that users can save their openings and access them from any device
Add support for other chess variants, such as chess960
Add full logic for the piece movement and allow the capture of other pieces

