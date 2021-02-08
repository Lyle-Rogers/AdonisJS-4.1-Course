//app/Controllers/Http/StripeController.js
'use strict'

const Config = use('Config')

// Configure the Stripe with our secret key
const Stripe = use('stripe')(Config.get('stripe.key_secret'))

class StripeController {
  // Returns the publishable key
  getKeyPublishable () {
    return Config.get('stripe.key_publishable')
  }

  // Returns the URL to process a successful payment
  getSuccessURL () {
    return Config.get('stripe.url_success')
  }

  // Returns the URL to process a failed payment or other errors
  getErrorURL () {
    return Config.get('stripe.url_error')
  }

  // "Promise" function to create a payment session in the Stripe API.
  createSession ( payment ) {
    return new Promise( ( resolve, reject ) => {
      Stripe.checkout.sessions.create( payment, function( err, session ) {
        if ( err ) {
          reject(err);
        }
        else {
          resolve(session);
        }
      });
    });
  }

  // "Promise" function to obtain a payment session in the Stripe API.
  getSession ( sessionId ) {
    return new Promise( ( resolve, reject ) => {
      Stripe.checkout.sessions.retrieve( sessionId, function(err, session) {
          if ( err ) {
            reject(err);
          }
          else {
            resolve(session);
          }
        }
      );
    });
  }
}
module.exports = StripeController
