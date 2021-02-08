//config/stripe.js
'use strict'

const Env = use('Env')

module.exports = {
  key_publishable: Env.get('STRIPE_PUBLIC_KEY'),
  key_secret: Env.get('STRIPE_SECRET_KEY'),
  url_success: Env.get('APP_URL') + "/pay/success",
  url_error: Env.get('APP_URL') + "/pay/error"
}