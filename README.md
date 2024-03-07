# FlytbaseBackend

Private repo for flytbase take home project.

## Start the Application:

1. Clone the project.
2. Install Node and Mongodb in your local.
3. Run npm install to install node modules.
4. Make an .env file and store a variable named JWT_SECRET_KEY = 'your secret key'.
5. For running the app.js file, use node app.js.
6. If you want to use nodemon instead of the above for starting the project, use npm run serve.

# Testing

### Create User: post:: http://localhost:8080/createUser

body:
{
"username":"user_01",
"password":"password5656",
"userId":1
}

response:
{
"message": "User created successfully"
}

### Login User: post:: http://localhost:8080/loginUser

body:
{
"username":"user_01",
"password":"password5656",
userId:1
}

response:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTk3MmEyM2E3OGMwNzE0NGE5Y2E3OCIsInVzZXJuYW1lIjoidXNlcl8wMSIsImlhdCI6MTcwOTc5ODM0MywiZXhwIjoxNzA5ODA5MTQzfQ.joF0Th-gZzVCImEG4bFFCnbp7cGggZxZo-aG9cNFkTc"
}

### Create Site: post::http://localhost:8080/site/create

body:
{
"sitename":"site_01",
"siteId":1,
"lattitude":242.5765373,
"longitude":23.57675688
}

response:
{
"message": "Creation successfull",
"createdObj": {
"sitename": "site_01",
"siteId": 1,
"lattitude": 242.5765373,
"longitude": 23.57675688,
"createdAt": "2024-03-07T08:02:43.101Z",
"updatedAt": "2024-03-07T08:02:43.101Z",
"\_id": "65e9754a49ebbb9866f84a50",
"\_\_v": 0
}
}

### Create Drone : post:: http://localhost:8080/drone/create

body:
{
"droneId":1,
"name":"drone_01"
}

response:
{
"message": "Creation successfull",
"createdObj": {
"droneId": 1,
"deletedBy": null,
"deletedOn": null,
"name": "drone_01",
"createdAt": "2024-03-07T08:20:27.387Z",
"updatedAt": "2024-03-07T08:20:27.387Z",
"\_id": "65e97974ed0f77a68d811797",
"\_\_v": 0
}
}

### Create Mission : post:: http://localhost:8080/mission/create

body:
{
"missionId":1,
"alt":"23km",
"speed":"534",
"name":"mission_im",
"categoryId":1

}
response:
{
"message": "Creation successfull",
"createdObj": {
"missionId": 1,
"categoryId": 1,
"alt": "23km",
"speed": "534",
"name": "mission_im",
"waypoints": [],
"createdAt": "2024-03-07T08:20:27.393Z",
"updatedAt": "2024-03-07T08:20:27.393Z",
"\_id": "65e97a0aed0f77a68d81179a",
"\_\_v": 0
}
}

### Create Category: post::http://localhost:8080/category/create

body:
{
"categoryId":1,
"name":"category_01"

}
response:
{
"message": "Creation successfull",
"createdObj": {
"name": "category_01",
"categoryId": 1,
"createdAt": "2024-03-07T08:20:27.399Z",
"updatedAt": "2024-03-07T08:20:27.399Z",
"\_id": "65e97a6ded0f77a68d81179d",
"\_\_v": 0
}
}
