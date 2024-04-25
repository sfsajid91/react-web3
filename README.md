# React Web3 App

This is a basic React Web3 app that allows you to interact with the Ethereum blockchain using the Ethers.js library. It showcases how to connect to an Ethereum network, retrieve account information, send transactions, and interact with smart contracts.

## Features

-   Connect to an Ethereum network
-   Retrieve account information
-   Send transactions
-   Interact with smart contracts

## Prerequisites

Before running the app, make sure you have the following installed:

-   Node.js
-   npm or yarn or pnpm

## Getting Started

1. Clone this repository:

    ```bash
    git clone https://github.com/sfsajid91/react-web3.git
    ```

2. Install the dependencies:

    ```bash
    cd react-web3
    cd client && pnpm i
    ```

    ```bash
    cd react-web3
    cd smart_contract && pnpm i
    ```

3. Generate the contract artifacts:

    ```bash
    cd smart_contract && pnpm compile
    ```

4. Start the development server:

    ```bash
    cd client && pnpm dev
    ```

5. Open your browser and navigate to `http://localhost:5173` to see the app in action.

## Configuration

To connect to an Ethereum network, you need to provide the following configuration in the `.env` file:

```
VITE_CONTRACT_ADDRESS=your-contract-address
VITE_EXPLORER_URL="https://sepolia.etherscan.io"
VITE_CHAIN_ID="11155111"
VITE_GIPHY_API_KEY="your-giphy-api-key"
```

## Technology Used

The app uses the following technologies:

-   React.js
-   Ethers.js
-   Node.js
-   Ethereum blockchain
-   Solidity
-   Tailwind CSS
-   Hardhat
-   Redux
-   Vite

## Footer

You can customize the app by adding your own likings or other features to the codebase. Feel free to explore and experiment!

## Contributing

If you find any issues or have suggestions for improvement, please feel free to contribute to this project. You can submit a pull request or open an issue on the [GitHub repository](https://github.com/sfsajid91/react-web3).
