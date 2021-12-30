# Employee Management System

Note: this is a repository of Employee Management System backend. the repository of the Frontend is available here: https://github.com/fenil29/employee-management-system-frontend-react

-------------

Website: https://employee-management-fk.netlify.com

-------------

- Employee Management system is a web application that enables users to create,store and manage Employee Records
- The application also provides facilities of a payroll system and leave application
- It is a management system that helps to manage employees and also the company’s different task and project
- Employee management system can manage and store details like employees personal info and also details of different department of the company and different branches of the organization

-------------

This web application contains three account access:
- Admin
- HR
- Employee

All three accounts contain different privileges and authentication.

-------------
Technology used :
- REACT JS
- NODE JS 
- EXPRESS
- MONGO DB

-------------

The different part or module of this project is as follows:
- Login Page
- Admin Dashboard
- HR Dashboard
- Employee Dashboard
- Authentication and authorization(user verification)
- Database(MongoDB)
- Mobile-Friendly UI

-------------

## How to run this project in a local development machine
* Make sure you install node modules in both frontend and backend using `npm install` command
* create .env file in your backend project 
Example of .env file (this file is present with the name .envexample):
```
PORT=4000
DATABASEURL=mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
JWTKEY=set_your_jwt_key
```
(note: Here I am using mondo DB atlas which provides a free cloud-based database so you can paste the URL provided by the atlas or you can install your own database)
More Information about the MongoDB connection string : https://docs.mongodb.com/manual/reference/connection-string/
* run both projects with the `npm start` command


