class SessionsRepositoryInMemory {
  async fetchUser({email}) {
    if(email === "test@email.com") {
      return { 
        id: 0, 
        name: "Test user", 
        email, 
        password: "$2a$08$ARo9ZcL5/C2OmPY2NQ7r6OtllZcOPtwVEPKE/qoM8Jp5ZzENJuikW",
        role: "customer" 
      };
    } else { return };
  };
};

module.exports = SessionsRepositoryInMemory;