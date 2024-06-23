const OrderRepositoryInMemory = require("../../repositories/repositoriesInMemory/OrderRepositoryInMemory");
const OrdersService = require("../OrdersService");
const AppError = require("../../utils/AppError");

describe("", () => {
  let orderRepositoryInMemory;
  let ordersService;
  beforeEach(() => {
    orderRepositoryInMemory = new OrderRepositoryInMemory;
    ordersService = new OrdersService(orderRepositoryInMemory);
  });

  it("", async () => {

  });
});