'use strict'

const User = use('App/Models/User')

class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(request.only(['username', 'email', 'password']));

    await auth.login(user);

    return response.redirect('/');
  }

  async login({ request, auth, response, session }) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect('/');
    } catch (error) {
      session.flash({loginError: 'Login, failed. Attempt to life, failed. People like you, failed. The computer will now have a meltdown seizure. Please sit back and relax while our viruses and malware take there course.'});
      return response.redirect('back');
    }
  }
}

module.exports = UserController
