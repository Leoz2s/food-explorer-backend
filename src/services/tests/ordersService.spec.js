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

  it("Success to create order.", async () => {
    await expect( ordersService.create({user_id: 1, description: "Order description"}) ).resolves.toBe(1);
  });

  it("Success to index orders.", async () => {
    const orders = await ordersService.index({user_id: 1, userRole: "customer"});
    await expect(orders[0]).toHaveProperty("id");
  });

  it("Bad request: Attempt to update a nonexistent order.", async () => {
    await expect( ordersService.update({id: undefined, status: "preparing"}) ).rejects.toEqual(new AppError("O pedido não existe.", 401));
  });
  it("Failure: Problem when updating order.", async () => {
    await expect( ordersService.update({id: 1, status: undefined}) ).rejects.toEqual(new AppError("Não foi possível atualizar o pedido.", 400));
  });
  it("Success to update order.", async () => {
    const updatedOrder = await ordersService.update({id: 1, status: "preparing"});
    expect(updatedOrder).toHaveProperty("id");
  });
});