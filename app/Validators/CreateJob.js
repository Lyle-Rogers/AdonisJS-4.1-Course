'use strict'

class CreateJob {
  get rules () {
    return {
      title: 'required',
      link: 'required'
    }
  }

  get messages() {
    return {
      'required': 'Hold on, stop and drop what your doing, and think for a bit. What if your mom died... Huh? What would you do then... Huh? Well then stop doing stupid shit and give me a {{ feild }} or she just might!'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateJob
