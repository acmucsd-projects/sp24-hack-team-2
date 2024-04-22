const firebase = require('./firebase');

const createUser = async (email, password) => {
  try {
    const userRecord = await firebase.auth().createUser({
      email: email,
      password: password
    });
    console.log('Successfully created new user:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
};

module.exports = createUser;