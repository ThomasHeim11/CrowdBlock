// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title CrowdFunding
 * @author Thomas Heim
 * @notice A smart contract for managing crowdfunding campaigns.
 * @dev This contract allows users to create and donate to crowdfunding campaigns.
 * It stores information about the campaign, including the owner, title, description,
 * target amount, deadline, amount collected so far, and image.
 */

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    /**
     * @notice Creates a new crowdfunding campaign.
     * @param _owner The address of the campaign owner.
     * @param _title The title of the campaign.
     * @param _description The description of the campaign.
     * @param _target The target amount to be raised.
     * @param _deadline The deadline for the campaign.
     * @param _image The image associated with the campaign.
     * @return The ID of the newly created campaign.
     */
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /**
     * @notice Donates to a crowdfunding campaign.
     * @param _id The ID of the campaign to donate to.
     */
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    /**
     * @notice Gets the list of donators and their respective donations for a campaign.
     * @param _id The ID of the campaign to get the list for.
     * @return The list of donators and their respective donations.
     */
    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    /**
     * @notice Gets the list of all crowdfunding campaigns.
     * @return The list of all crowdfunding campaigns.
     */
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
