const express = require('express');
const bodypParser = require('body-parser');
const graphqlHttp = require('express-graphql'); // export valid middleware function
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use(bodypParser.json());

// graphql one endpoint where all requests are sent
// specify middleware function created above (graphqlHttp)
// create schema 
// query fetch data
// mutations change data (crud)
app.use('/graphql', graphqlHttp({
    schema: buildSchema(` 

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema { 
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
            _id: Math.random().toString(),
            title: args.title,
            description: args.description,
            price: +args.description, // The + operator returns the numeric representation of the object. The + and - operators also have unary versions, where they operate only on one variable. When used in this fashion, + returns the number representation of the object, while - returns its negative counterpart.
            date: new Date().toISOString()
        };
        events.push(event);
        }
    },
    graphiql: true
}));

app.listen(3000);