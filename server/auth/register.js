const firebase = require('./firebase');
const User = require('./user');

const createUser = async (email, password) => {
    try {
        const userRecord = await firebase.auth().createUser({
            email: email,
            password: password
        });
        const newUser = new User({
            firebaseUID: userRecord.uid,
            email: email
        });
        await newUser.save();
        console.log('Successfully created new user:', userRecord.uid);
        return userRecord.uid;
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
};

module.exports = createUser;
