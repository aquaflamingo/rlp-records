const { expect } = require("chai");

describe("Token contract", function () {
  it("Return a Record", async function () {
		 const recordFactory = await hre.ethers.getContractFactory("Record");
    const record = await recordFactory.deploy();

    await record.deployed();
    expect(await record.name()).to.equal("Record");
    expect(await record.symbol()).to.equal("RLP");
  });
});
