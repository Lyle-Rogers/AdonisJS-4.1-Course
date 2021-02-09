//config/stripe.js
'use strict'

module.exports = {
  key_publishable: process.env.get('STRIPE_PUBLIC_KEY'),
  key_secret: process.env.get('STRIPE_SECRET_KEY'),
  url_success: process.env.get('APP_URL') + "/pay/success",
  url_error: process.env.get('APP_URL') + "/pay/error"
}