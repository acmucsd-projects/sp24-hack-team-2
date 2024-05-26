const express = require('express');
const router = express.Router();
const User = require('../database_schema/userSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = {
    name: 'ACM Hack',
    email: 'hack@acmucsd.org'
  }
  res.status(200).json({ user });
});

router.delete('/delete-trip', async (req, res) => {
  const {userID, trip} = req.body

  try {
    const user = await User.findOne( { firebaseUID: userID } )

    if(!user) {
      res.status(404).send('User not found')
    }

    user.trips = user.trips.filter(entry => entry.tripID !== trip);

    await user.save()

    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

router.post('/add-trip', async (req, res) => {
  const { userID, trip } = req.body

  try {
    const user = await User.findOne( { firebaseUID: userID } )

    if(!user) {
      res.status(404).send('User not found')
    }

    user.trips = user.trips.push(trip)
    await user.save()

    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

module.exports = router;
