const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql'); // export valid middleware function
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Event = require('./models/event');
const User = require('./models/user')

const app = express();


app.use(bodyParser.json());

// graphql one endpoint where all requests are sent
// specify middleware function created above (graphqlHttp)
// create schema 
// query fetch data
// mutations change data (crud)
app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(` 

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        schema { 
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            events: () => {
                return Event
                .find()
                .populate('creator')
                    .then(events => {
                        return events.map(event => {
                            return { 
                                ...event._doc, 
                                _id: event.id, // keep note of shorter way defined here, longer query event._doc._id.toString()
                            creator: {
                                ...event._doc.creator._doc,
                                _id: event._doc.creator.id
                            }
                            }; 
                        })
                    })
                    .catch(err => {
                        throw err;
                    })
            },
            createEvent: args => {
                const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: '5ca8abea43cf926f66e0754f'
                });
                let createdEvent;
                return event
                    .save()
                    .then(result => {
                        createdEvent = { ...result._doc, _id: result._doc._id.toString() }
                        return User.findById('5ca8abea43cf926f66e0754f')                        
                    })
                    .then(user => {
                        if (!user) {
                            throw new Error('User not found');
                        }
                        user.createdEvents.push(event);
                        return user.save();
                    })
                    .then(result => {
                        return createdEvent;
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            },
            createUser: args => {
                return User.findOne({ email: args.userInput.email }).then(user => {
                    if (user) {
                        throw new Error('User exists')
                    }
                    return bcrypt
                        .hash(args.userInput.password, 12)
                })
                    .then(hashedPassword => {
                        const user = new User({
                            email: args.userInput.email,
                            password: hashedPassword
                        });
                        return user.save();
                    })
                    .then(result => {
                        return { ...result._doc, password: null, _id: result.id }
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        },
        graphiql: true
    }));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9fsds.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})

