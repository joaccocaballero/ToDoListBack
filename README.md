# To Do List!

A Tasks Manager App that allows you to organize your pending tasks, visualize them sorted according to\
its respective priority rendering the most important tasks at the top of the list, and the least important 
tasks at the bottom. Besides, it permits the user to keep track of their completion status. 

  - **App deployed at:** https://tdl-front.vercel.app/
  * **Backend Services:** https://joacoservices-com.onrender.com

## How to run this project locally
This project uses PostgreSQL as database, a .env.example.txt file is provided in order to set database connection parameters. Once done, rename that file to '.env' and 
then, run the following commands:

  ```
  npm install
  npx sequelize-cli db:migrate
  node app.js
  ```
Backend services will be running at http://localhost:8080/

 
