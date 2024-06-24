class UsersValidatedRepositoryInMemory {
  async checkUser({user}) {
    if(user) {
      return {id: user.id, name: "Test user", email: "", password: "", role: ""};
    } else { return };
  };
};

module.exports = UsersValidatedRepositoryInMemory;