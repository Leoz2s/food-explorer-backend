class OrderRepositoryInMemory {
  async createOrder({user_id, description}) {
    return 1;
  };

  async indexOrders({userRole, user_id}) {
    return [{id: 1, user_id: 1, description: "This is a test order.", status: "pending"}, {id: 2, user_id: 1, description: "This is a test order.", status: "preparing"}];
  };

  async fetchOrder({id}) {
    if(id) {
      return {id: 1, user_id: 1, description: "This is a test order.", status: "pending"};
    } else { return };
  };

  async updateOrderStatus({status, order}) {
    if(status && order) {
      return {id: 1, user_id: 1, description: "Order updated test.", status: "preparing"};
    } else { return 4 + createErrorWithNonexistentVariable };
  };
};

module.exports = OrderRepositoryInMemory;