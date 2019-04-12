const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql'); // export valid middleware function
const mongoose = require('mongoose');
const app = express();

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index'); // rootresolver import
const isAuth = require('./middleware/is-auth')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

app.use(isAuth);



// graphql one endpoint where all requests are sent
// specify middleware function created above (graphqlHttp)
// create schema 
// query fetch data
// mutations change data (crud)
app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    }));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9fsds.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`).then(() => {
    app.listen(8000);
}).catch(err => {
    console.log(err);
})

