class UserRepositoryInMemory {
  users = [];

  async createUser({name, email, hashedPassword, role}) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name, email, hashedPassword, role,
    };

    this.users.push(user);

    return user;
  };

  async findUserByEmail({email}) {
    const user = this.users.find(user => user.email === email);
    if(user) {
      return [user];
    } else {
      return [];
    };
  };
};

module.exports = UserRepositoryInMemory;