//app/Controllers/Http/ShopController.js
'use strict'

const Helpers = use('Helpers')

const StripeController = use('App/Controllers/Http/StripeController')
const Stripe = new StripeController()

// We define the "book" object as a global variable
const book = {
  sku: 'P001',
  title: 'Build Apps with Adonis.JS',
  image: 'http://www.victorvr.com/img/resources/Book-P001.png',
  description: 'Building Node.JS Applications with Javascript.',
  author: 'Victor Valencia Rico',
  price: 5,
  currency: 'USD'
}

class ShopController {
  // Displays the main book
  async shop ({ view, request }) {
    const sessionId = request.input('sessionId')
    return view.render('shop', {book: book, sessionId: sessionId} )
  }

  // Make the payment in the Stripe API.
  async tryPay({ response }) {
    const success_url = Stripe.getSuccessURL()
    const error_url = Stripe.getErrorURL()
    // Create the 'payment' object
    const payment = {
      payment_method_types: ['card'],
      line_items: [{
        name: book.sku + ' - ' + book.title,
        description: book.description,
        images: [book.image],
        amount: book.price + '00',
        currency: book.currency,
        quantity: 1,
      }],
      success_url: success_url + '?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: error_url,
    }
    
    await Stripe.createSession( payment )
    // The payment session was created successfully
    .then( ( session ) => {
      return response.redirect('/pay/checkout' + '?sessionId=' + session.id);
    })
    // The payment session failed
    .catch( ( err ) => {
      return response.redirect(error_url + '?name=' + err.type + '&message=' + err.raw.message);
    });
  }

  // Checkout the payment in the Stripe API.
  async payCheckout ({ view, request }) {
    const sessionId = request.input('sessionId')
    return view.render('checkout', {
      sessionId: sessionId,
      keyPublishable: Stripe.getKeyPublishable()
    })
  }

  // Displays the notification of a successful payment
  async paySuccess ({ request, response, session }) {
    const sessionId = request.input('sessionId')
    session.flash({
      sessionId: sessionId,
      notification_class: 'alert-success',
      notification_icon: 'fa-check',
      notification_message: 'Thanks for you purchase! ' + sessionId
    })
    response.redirect('/shop/?sessionId=' + sessionId);
  }

  // Displays the notification of a failed payment or other errors
  async payError ({ request, response, session }) {
    const name = request.input('name')
    const message = request.input('message')
    session.flash({
      notification_class: 'alert-danger',
      notification_icon: 'fa-times-circle',
      notification_message: 'Payment error! ' + name + ': ' + message
    })
    response.redirect('/shop');
  }
  
  // Verify the payment before starting the download. This will through an error if in test mode.
  async download ({ response, request }) {
    const sessionId = request.input('sessionId')
    await Stripe.getSession( sessionId )
    // The payment session exists
    .then( ( session ) => {
      const item = session.display_items[0].custom
      // Download book
      const name = item.name + '.pdf'
      const source = Helpers.resourcesPath('/files/Book-' + item.name.substr(0, 4) + '.pdf')
      response.attachment(source, name)
    })
    // The payment session does not exist
    .catch( ( err ) => {
      //Show Error
      // response.send('ERROR: ' + err.type + ' => ' + err.raw.message) This is the error handler that is suposed to be here, but when ever the error is thrown it sais err.raw.message is undifined. But this one works. So your not fucked now. Your welcome.
      response.send('ERROR' + ': ' + 'You have not paid for this item yet so fuck off.')
    });
  }
}
module.exports = ShopController
