const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, { args }) => {
            return User.findOne({ _id: args._id });
        },

        bookCount: async () => {
            const allBooks = Book.findAll();
            const bookCount = allBooks.length
            return bookCount
        },
        savedBooks: async (parent, { args }) => {
            const user = User.findOne({ _id: args._id });
            const savedBooks = user.savedBooks
            return savedBooks
        }


    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { _id, args }) => {
            const user = await User.create(...args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { args }) => {
            const updatedUser = await User.findOneAndUpdate({ _id: user._id },
                { $addToSet: { savedBooks: { ...args } } },
                { new: true });
            return updatedUser;
        },
        removeBook: async (parent, { bookId }) => {
            const updatedUser = await User.findOneAndUpdate({ _id: user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true });
            return updatedUser;
        },
    },
};

module.exports = resolvers;