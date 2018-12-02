const server = require("../server/server");

describe(`Server`, () => {
  it(`should require a port to start`, async done => {
    let serv = await server.start({
      repo: {}
    });

    serv.should.be.rejectedWith(/port/);
  });
});
