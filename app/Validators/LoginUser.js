'use strict'

class LoginUser {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': "Woah now, brain damaged child malester! You forgot the {{ field }}. Don't slip like dat again or it'll be you next. We're watching you."
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = LoginUser
