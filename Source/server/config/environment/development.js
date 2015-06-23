'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://" + process.env.DB_PORT_27017_TCP_ADDR + ":" + process.env.DB_PORT_27017_TCP_PORT + "/test"
  },

  seedDB: true
};
