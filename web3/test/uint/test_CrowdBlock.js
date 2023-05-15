const { expect } = require("chai");

describe("CrowdFunding", function () {
  let crowdFunding;
  let owner;
  let donator;

  beforeEach(async () => {
    [owner, donator] = await ethers.getSigners();

    const CrowdFundingFactory = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFundingFactory.deploy();
    await crowdFunding.deployed();
  });

  it("should create a new campaign", async function () {
    const title = "Test Campaign";
    const description = "Test Campaign Description";
    const target = ethers.utils.parseEther("10");
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const image = "https://example.com/image.jpg";

    await crowdFunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );

    const campaign = await crowdFunding.campaigns(0);

    expect(campaign.owner).to.equal(owner.address);
    expect(campaign.title).to.equal(title);
    expect(campaign.description).to.equal(description);
    expect(campaign.target).to.equal(target);
    expect(campaign.deadline).to.equal(deadline);
    expect(campaign.amountCollected).to.equal(0);
    expect(campaign.image).to.equal(image);
    expect(await crowdFunding.numberOfCampaigns()).to.equal(1);
  });

  it("should donate to a campaign", async function () {
    const title = "Test Campaign";
    const description = "Test Campaign Description";
    const target = ethers.utils.parseEther("10");
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const image = "https://example.com/image.jpg";

    await crowdFunding.createCampaign(
      owner.address,
      title,
      description,
      target,
      deadline,
      image
    );

    const campaign = await crowdFunding.campaigns(0);

    const donationAmount = ethers.utils.parseEther("5");
    await crowdFunding.donateToCampaign(0, { value: donationAmount });

    const [donators, donations] = await crowdFunding.getDonators(0);

    expect(donators[0]).to.equal(donator.address);
    expect(donations[0]).to.equal(donationAmount);
    expect(campaign.amountCollected).to.equal(donationAmount);
  });
});
