//config/stripe.js
'use strict'

module.exports = {
  key_publishable: process.env.STRIPE_PUBLIC_KEY,
  key_secret: process.env.STRIPE_SECRET_KEY,
  url_success: process.env.APP_URL + "/pay/success",
  url_error: process.env.APP_URL + "/pay/error"
}