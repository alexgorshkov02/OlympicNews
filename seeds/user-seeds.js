const { User } = require('../models');

const userdata = [
  {
    username: 'testuser1',
    password: 'password123'
  },
  {
    username: 'testuser2',
    password: 'password123'
  },
  {
    username: 'testuser3',
    password: 'password123'
  },
  {
    username: 'testuser4',
    password: 'password123'
  },
  {
    username: 'testuser5',
    password: 'password123'
  },
  {
    username: 'testuser6',
    password: 'password123'
  },
  {
    username: 'testuser7',
    password: 'password123'
  },
 
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;