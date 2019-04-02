const express = require('express');
const bodypParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();

app.use(bodypParser.json());

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