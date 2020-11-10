a) Assumptions :
 I have used postman for checking if everything is working,  and for search function I have 
assumed that user will search by only one field .
b) Approach :
I have made various routes for get , post , put and delete 
for displaying the todos I have used a get signal
for adding todo to the database I have used post signal 
for update I have used put signal 
for delete I have used delete signal
c)
CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  state BOOLEAN
  priority INT
  creationdate TIMESTAMP
);

d)
1 - unzip file 
2 - open terminal in the folder where the source code is stored
3 - run npm install command in terminal
