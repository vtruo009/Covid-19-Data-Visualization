# Covid-19 Data Visualization

This web application presents Covid-19 confirmed, death, and recovery statistics sourced from Kaggle using charts. Additionally, application allows for data comparison using the filter function.

## Technologies Used

* Bootstrap to style UI
* VueJS to build frontend
* NodeJS to build backend

## Features
These are examples of some features and functionalities of the application. Please see [short demo video](https://youtu.be/Sg8RhUlW_f4) for more.

* Compare cases by county
![Comparing Orange vs. Los Angeles, California cases](/Images/Compare%20by%20County.png)

* Compare cases by gender
![Comparing Male vs. Female cases](/Images/Compare%20by%20Gender.png)

* Number of cases outside of United States
![Presenting confirmed number of cases in Queensland, Australia](/Images/Number%20of%20Cases%20Outside%20of%20US.png)

## Steps to Run Project

1. At the root directory run:
```
    npm install
```

2. Enter the client directory and install client dependencies:

```
    cd client
    npm install
```

3. Go back to the root directory. Enter server directory and install server dependencies:

```
    cd server
    npm install
```

4. Go back to the root directory and run the entire project, both client and server. Note both server will be running concurrently

```
    npm start
```

## Note:
- Client runs on localhost:5000
- Server runs on localhost:8080
