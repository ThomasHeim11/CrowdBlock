#CrowdFunding Smart Contract
This repository contains a Solidity smart contract for managing crowdfunding campaigns on the Ethereum blockchain. The contract allows users to create campaigns, accept donations, and retrieve information about campaigns and their donors.

Features
Create new crowdfunding campaigns with details such as owner, title, description, target amount, deadline, and associated image.
Accept donations to a specific campaign.
Retrieve a list of donators and their respective donations for a campaign.
Get the list of all existing crowdfunding campaigns.
Smart Contract Details
Solidity version: ^0.8.9
License: UNLICENSED (SPDX-License-Identifier: UNLICENSED)
Usage
Install the required dependencies for Solidity development.
Deploy the CrowdFunding smart contract to an Ethereum network of your choice.
Interact with the contract using a compatible Ethereum wallet or by making calls to the contract functions programmatically.
Create campaigns using the createCampaign function, specifying the campaign details.
Accept donations to a campaign by calling the donateToCampaign function and providing the campaign ID and the desired amount to donate.
Retrieve information about a campaign's donators and their donations using the getDonators function.
Get the list of all campaigns and their details using the getCampaigns function.
Feel free to explore and modify the smart contract according to your specific requirements.

License
This project is licensed under the UNLICENSED license. Refer to the LICENSE file for more information.
