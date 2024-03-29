
# MERN App for Selling Old Products in my college

This is a web application built using the MERN stack (MongoDB, Express, React, and Node.js) that allows users to sell their old products. The backend is built using Express and Mongoose, while the frontend is built using React and Chakra UI.


# Getting Started
To get started with this project, you'll need to have the following installed:

* Node.js (v12 or higher)
* MongoDB
Once you have these dependencies installed, follow these steps to set up the project:

1. Clone this repository: git clone https://github.com/noobcoder6602/bounse.git
2. Install backend dependencies: 
```bash
cd backend
```
``` bash
 npm install
```
3. Install frontend dependencies: 
``` bash
cd ../frontend
``` 
``` bash
npm install
```
4. Start the backend server: 
``` bash
cd ../backend 
```
``` bash
nodemon server.js
```
5. Start the frontend server:
``` bash
cd ../frontend 
```
``` bash
npm start
```
  
  The backend server will start running on http://localhost:5000 and the frontend server will start running on http://localhost:3000. You can access the web application by visiting http://localhost:3000 in your web browser.

# Folder Structure
The project's folder structure is as follows:

* backend: contains the backend code written in Express and Mongoose
    * config: contains configuration files for the server
    * controllers: contains configuration files for the server
    * middlewares: contains Mongoose models for the database
    * models: contains Mongoose models for the database
    * routes: contains route handlers for the server
* frontend: contains the frontend code written in React and Chakra UI
    * public: contains static files used by the frontend
    * src: contains the source code for the frontend
    * src/components: contains reusable React components
    * src/config: contains utility functions used by the frontend
    * src/context: contains utility functions used by the frontend
    * src/pages: contains the React components for each page of the web application
* package.json: contains dependencies and scripts for the backend
* frontend/package.json: contains dependencies and scripts for the frontend

# Technologies Used
This project uses the following technologies:

* ReactJS: a JavaScript library used to build the frontend user interface
* Chakra UI: a React component library used to style the frontend user interface
* ExpressJS: a Node.js web application framework used to build the backend server
* MongoDB: a NoSQL database used to store data for the web application
* Mongoose: an object data modeling (ODM) library for MongoDB used to interact with the database

# Contributing
If you would like to contribute to this project, please follow these steps:

  &nbsp;&nbsp;&nbsp;&nbsp;1. Fork this repository.
  
  &nbsp;&nbsp;&nbsp;&nbsp;2. Create a new branch for your changes: git checkout -b your-branch-name
  
  &nbsp;&nbsp;&nbsp;&nbsp;3. Make your changes and commit them: git commit -am "Add your commit message here"
  
  &nbsp;&nbsp;&nbsp;&nbsp;4. Push your changes to your forked repository: git push origin your-branch-name
  
  &nbsp;&nbsp;&nbsp;&nbsp;5. Open a pull request on this repository.