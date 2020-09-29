'use strict'

class CreateUser {
  get rules () {
    return {
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }

  get messages () {
    return {
      'required': "I'm sorry, this is a forced complience. You must give us a {{ field }}.",
      'unique': "Ha... looser. Someone thought of your idea of a {{ field }} before you."
    } 
  }

  async fails (error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateUser
