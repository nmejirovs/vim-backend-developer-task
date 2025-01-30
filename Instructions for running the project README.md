# Instructions to run VIM home assignment

## Services

## Usage of docker-compose.yml in project root folder

### Running on Windows
Please uncomment line "#platform: linux/arm64/v8" in "notification-service"  section

### Runing the project
Please run next command from project root folder (there docker-compose.yml file is located) to build and run containers: docker-compose up -d

### Stopping the project 
Please run next command from project root folder (there docker-compose.yml file is located) to stop containers: docker-compose stop

### Clean up the environment
Please run next command from project root folder (there docker-compose.yml file is located) to remove containers: docker-compose rm

Please remove unused image "vim-backend-developer-task-vim-home-assignment" image from docker images to cleanup space with command: docker image rm vim-backend-developer-task-vim-home-assignment:latest


## Running the project mannually
### Running "notification-service"
Project depends on "Notification service"
To run the service please use the command: docker-compose up -d notification-service

### Running the project
To install dependencies run the command: npm install
To start the project run the command: npm start

## Api documentation
After running the project, api documentation can be viewed on URL : http://localhost:8080/api


## Testing the project 

### Adding user 
curl -X POST http://localhost:8080/user-preference \
-H "Authorization: Bearer onlyvim2024" \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "preferences": { "email": true, "sms": true }
}'


### Sending notification
curl -X POST http://localhost:8080/notification \
-H "Authorization: Bearer onlyvim2024" \
-H "Content-Type: application/json" \
-d '{
  "userId": 1,
  "message": "Hello, this is a notification!"
}'
