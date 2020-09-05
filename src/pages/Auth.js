class Auth {
  constructor() {
    this.authenticated = false;
  }

  // no further authentication is required for prototype
  login(cb) {
    this.authenticated = true;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
