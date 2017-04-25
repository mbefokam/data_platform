# data_platform
pull the full list of all behavioral health facilities in NYC into a new platform

Installation: 
1 – Download and Install node from https://nodejs.org/en/download/
2- Install MySQL Database to your local or use your favorite platform as a service
3 – Create a MySQL Database and Upgrade the configuration file from config -> config.json
4 - Create Table in the Database base on the data model
5 – From the C:\ directory of your local environment run: npm install -g express
6 - From The folder directory on cmd run: npm install 
    This is going to install all the module require for this application.
7- From the folder directory on cmd start you application with npm start.
API Resources:
To load the data from the City Data Storage to your Database 
GET : /api/data
To get all Health Facilities from the database 
GET : /api/health/facilities
To get all Active Health Facilities from the database 
GET : /api/health/facilities/active
