const Event = require('../../models/event');
const { transformEvent } = require('./merge');


module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args, req) => { // << protect resolvers
      if (!req.isAuth) { // <<
        throw new Error("Try again"); // <<
      } // <<
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5cac21dbb8156f69450b2116'
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById('5cac21dbb8156f69450b2116');
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
  
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };