const SessionsRepositoryInMemory = require("../../repositories/repositoriesInMemory/SessionsRepositoryInMemory");
const SessionsCreateService = require("../SessionCreateService");
const AppError = require("../../utils/AppError");

describe("Create session tests.", () => {
  let sessionsRepositoryInMemory;
  let sessionsCreateService;
  let credentials;

  beforeEach(() => {
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory;
    sessionsCreateService = new SessionsCreateService(sessionsRepositoryInMemory);
  });

  it("Bad request: Wrong e-mail. Session not created.", async () => {
    credentials = {email: "random-test-email-098@email.com", password: "123456"}
    const {email, password} = credentials;

    await expect(sessionsCreateService.execute({email, password})).rejects.toEqual(new AppError("E-mail e/ou senha incorretos.", 401));
  });

  it("Bad request: Wrong password. Session not created.", async () => {
    credentials = {email: "test@email.com", password: "abcdef"};
    const {email, password} = credentials;
    
    await expect(sessionsCreateService.execute({email, password})).rejects.toEqual(new AppError("E-mail e/ou senha incorretos.", 401));
  });

  it("Session created.", async () => {
    credentials = {email: "test@email.com", password: "123456"};
    const {email, password} = credentials;

    const [user, token] = await sessionsCreateService.execute({email, password});
    expect(user).toBeDefined();
    expect(token).toBeDefined();
  });
});