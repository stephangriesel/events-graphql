const express = require('express');
const bodypParser = require('body-parser');
const graphqlHttp = require('express-graphql'); // export valid middleware function
const { buildSchema } = require('graphql');

const app = express();

app.use(bodypParser.json());

// graphql one endpoint where all requests are sent
// specify middleware function created above (graphqlHttp)
// create schema 
// query fetch data
// mutations change data (crud)
app.use('/graphql', graphqlHttp({
    schema: buildSchema(` 
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }
        schema { 
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Coding', 'Going to movies', 'Swimming'];
        },
        createEvent: (args) => {
            const eventName = args.name
            return eventName;
        }
    },
    graphiql: true
}));

app.listen(3000);