//config/stripe.js
'use strict'

module.exports = {
  key_publishable: 'pk_test_51IF0rZGmBT1pM9j5DkeplMrDcGutoFNi7y8kW4x89gRewqUB4vJ7SwV7Ed9f4TXyYqn9RPIj1jSD62KwZeHl88iV00DitogTfd',
  key_secret: 'sk_test_51IF0rZGmBT1pM9j5Z6zNjvTKhv7qD4G1rnESqtJ7sAofgsxHkBXQmqaJqibLnFRIYarVOGkWv2IRcFjKwyueOxwX001xoRAUhd',
  url_success: process.env.APP_URL + "/pay/success",
  url_error: process.env.APP_URL + "/pay/error"
}