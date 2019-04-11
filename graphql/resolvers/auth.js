const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('User exists')
      }
      const hashedPassword = await bcrypt
        .hash(args.userInput.password, 12)

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      })

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id }
    } catch (err) {
      throw err;
    };
  },
  login: async ({ email, password}) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('Try again, confirm email & password');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Try again, confirm email & password');
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, 'supercalifragilisticexpialidocious', {
      expiresIn: '1h' // change to 20min
    });
    return{userId: user.id, token: token, tokenExpiration: 1 }
  }
};