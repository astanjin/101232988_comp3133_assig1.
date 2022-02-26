const express = require('express')
const mongoose = require('mongoose');
const { graphqlHTTP } = require("express-graphql")
const schema = require("./gql/schema")
const dotenv = require('dotenv');
const app = express();
//config env
dotenv.config();

//mongoDB Atlas Connection String
const url = process.env.MONGODB_URL;

//Connect to mongoDB Atlas
const connect = mongoose.connect(url, 
{ 
      useNewUrlParser: true,
      useUnifiedTopology: true
});

connect.then((db) => {
      console.log(' DB Connected correctly to server!');
}, (err) => {
      console.log(err);
});
const { authentication } = require("./middleware/is-auth")

app.use(authentication)

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)


app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
  );






