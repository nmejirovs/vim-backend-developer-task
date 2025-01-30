# Instructions to run VIM home assignment (aka "User Notifications Manager")

## Notes for running the project
"User Notifications Manager" should listen on port 8080, please care that the port will be available

## Running with docker-compose.yml in project root folder

### Running on Windows *
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
To install dependencies, run the command: npm install

To start the project, run the command: npm start

## API documentation
After running the project, detailed api documentation can be viewed on URL : http://localhost:8080/api/docs

### Authorization
For request that requires authorization, "Authorization" header  with bearer token "onlyvim2024" should be added to request: <br />
"Authorization: Bearer onlyvim2024"

### API important endpoints
**API endpoints should be available on root url, e.g., endpoint user available on URL http://localhost:8080/user**

1. /user-preferences
   - method: POST
   - purpose: Add user.
   - requires authorization
   - Errors: input validation errors
   - request body example (Email must be provided, email and phone must be unique): 
      ```json
        {
          "email": "test@gmail.com",
          "telephone": "+972541234567",
          "preferences": {
            "email": true,
            "sms": true
        }
      ```
   - Testing request:
      ```bash
        curl -X POST http://localhost:8080/user-preferences \
        -H "Authorization: Bearer onlyvim2024" \
        -H "Content-Type: application/json" \
        -d '{
          "email": "test@gmail.com",
          "telephone": "+972541234567",
          "preferences": {
            "email": true,
            "sms": true
        }'
      ```

2. /user-preferences
   - method: Put
   - purpose: Update user prferences.
   - requires authorization
   - Errors: user not found, input validation errors
   - request body example (All field are required): 
      ```json
        {
          "email": "test@gmail.com",
          "preferences": {
            "email": true,
            "sms": true
        }
      ```
   - Testing request:
      ```bash
        curl -X POST http://localhost:8080/user-preferences \
        -H "Authorization: Bearer onlyvim2024" \
        -H "Content-Type: application/json" \
        -d '{
          "email": "test@gmail.com",
          "preferences": {
            "email": true,
            "sms": true
        }'
      ```

3. /notification
   - method: POST
   - Purpose: Send notification by user preference.
   - Errors: user not found, input validation errors
   - request body example (At least one of fields email or userId must be provided): 
      ```json
        {
          "email": "test@gmail.com",
          "message": "test test"
        }
      ```
      or
      ```json
        {
          "userId": 1,
          "message": "test test"
        }
      ```
   - Testing request:
      ```bash
        curl -X POST http://localhost:8080/notification \
        -H "Authorization: Bearer onlyvim2024" \
        -H "Content-Type: application/json" \
        -d '{
          "email": "test@gmail.com",
          "message": "test test"
        }'
      ```
      or
      ```bash
        curl -X POST http://localhost:8080/notification \
        -H "Authorization: Bearer onlyvim2024" \
        -H "Content-Type: application/json" \
        -d '{
          "userId": 1,
          "message": "test test"
        }'
      ```