# Redshift Group project
## Team 1
___

## Brief

Our customer works at the National Investigation Unit and has been building a relationship with a third party provider to get access to some data.
The provider is referred to as Redshift. Redshift specialises in gathering call records, financial transactions and automatic number plate recognition (ANPR) sightings. 
The data comes in the form of many large .csv files. This data needs to be protected with restricted access, and this access needs to be audited. 

### Scenario 1 - A suspect has been detained
An investigator has detained a suspect. They need to know the background information about this person. 
This should include:
- Biographical information
- Associates
- Financial transactions
- Whereabouts

### Scenario 2 - An incident has occurred
The team are investigating an incident that has occurred at a partuicular location. They need to work out who was in the area at the particular point in time. 

### Scenario 3 - Suspect flees the scene
An officer has spotted a suspect fleeing the scene of an incident in a car. They have reported back with the car's number plate. 
The investigators now need to search on car registration to work out.
- Who the suspect was?
- Where else have they been?

### MVP
After speaking with out product owner (PO) he told us the MVP was scenario 1 and 2, but it would be great to see scenario 3 as well. 
The page needs to look professional as well as be streamlined and simple to use. 
A stretch goal was user login and authentication using a username and password, ideally this would be stored as cookies so that it logs a user off after a defined time. For Scenario 2, an option to add a radius for the location would also be good. 

___
## Planning and design phase

We were provided with the following information:

We created a risk assessment to ensure we were prepared for any issues that could arise during the 
![Risk Assessment](riskAssessment.PNG)
*figure 1: risk assessment showing the different problems that could arise diring the course of the project*



*figure xxx: risk assessment*
*figure XXX: Jira board*
*figure XXX: AWS setup and RDS*
*figure XXX: Pandas scripts used for cleaning up the data*
*figure XXX: Snapshot of the git network graph*
### Backend
As a group we discussed the different options for technology to use for the back end, and it was decided that using the MERN stack was a better option than using a Spring boot Java framework for the backend and React for the front end. 

### Frontend
We determined the best way to implement the front end was by using React. But before we started coding anything we worked together and with our Product Owner (PO) to produce a wireframe so that we could refer back to it in development. One brief from the PO was to have the website look sleek and professional, so we tried to ensure this with the wireframe. .
*figure XXX: The wireframe used for website design*

___
## Database and network 
___
### AWS
This project used a cloud based database, we used a micro RDS database server on AWS (Amazon web services) with XXX GB storage. 
The RDS is in a public subnet within a VPC that is accessed via the internet gateway. To improve security only our personal IP addresses have access to the database. This would need to be changed if the service was being rolled out to a wider audience. 

*figure xxx: Diagram showing the cloud architecture used*
### Jenkins

___
## Code 
___
This project is implemented using an adapted MERN stack, using mySQL instead of MongoDB as the data was relational. 

### Backend
The backend for this project was written with Express. Initially the required npm packages were installed and then an Express app made. 

    npm install .......
    npm make express app ....... 

The backend consisted of routes for each page required as well as a server.js file where the bulk of the logic took place. This was also where the passport logging in and authentication logic was located. 

The routes files are a combined service and controller file and contain routing information and the SQL queries. The SQL queries were run using the sequelize package.  

### Frontend
The Frontend for this project was written using the JavaScript framework React. This allowed us to build a single page application, which improves browser rendering speeds. 

Once we had the basic logic sorted we worked towards making our website design fit the wireframe we had planned initially. There was a fair amount of website evolution as can be seen from figure xxx.

*figure xxx: Evolution of the website*

## React - bootstrap
The react-bootstrap CSS library was used to style the website, and using this meant that we could make the website look both professional and user friendly. 

## Axios
For our HTTP requests we used axios, a promise-based HTTP client. Axios has a simple syntax to and works well for what we are looking for. 

___
## Testing
___

### Backend testing
For testing the backend we used....

### Frontend testing
For testing the frontend we used ...


___
## Stretch Goals
___

___
## Acknowledgements
___
Without the help of Jordan Harrison and Reece Elder from QA this project would not have gotten off the ground along with all the work from our fantastic team members.

* Katie Diggory
* Helen Gardener
* Christopher Jones
* Daniel Robinson
* Humairaa Saleh
* Joshua Willmott


