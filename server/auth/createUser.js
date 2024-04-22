const admin = require('firebase-admin');
const serviceAccount = require('./geoguru-8d3c8-firebase-adminsdk-rwi9f-8ba21f3358.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().createUser({
  email: 'example@gmail.com',
  password: 'password123'
})
  .then((userRecord) => {
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.error('Error creating new user:', error);
  });