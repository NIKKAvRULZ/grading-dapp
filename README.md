# Trusted Grading Oracle: Blockchain-Based Academic Verification

**Status:** Phase 2 Complete (MVP Deployed on Sepolia Testnet)  
**Author:** [Your Name]  
**Institution:** SLIIT (BSc Hons in Information Technology - Software Engineering)

## 📌 Project Overview
This project addresses the vulnerability of centralized academic databases. Currently, university grades stored in SQL databases are susceptible to unauthorized modification, server failure, or administrative manipulation.

The **Trusted Grading Oracle** is a Decentralized Application (DApp) that moves the "Root of Trust" from a central server to the Ethereum Blockchain. It allows authorized lecturers to cryptographically sign and store grades as immutable records that are publicly verifiable but practically tamper-proof.

## ✅ Completed Features (Phase 1 & 2)
The current version represents the **Minimum Viable Product (MVP)**, demonstrating the core "Write" and "Read" pipeline:

* **Immutable Grade Storage:** A custom Solidity Smart Contract (`SimpleGrading.sol`) allows for the permanent storage of Student IDs, Course IDs, and Scores.
* **Cryptographic Ownership:** Grades are linked to the wallet address of the submitting lecturer, ensuring accountability.
* **Decentralized Frontend:** A React-based interface (built with Vite) that connects directly to the blockchain via Ethers.js.
* **Web3 Wallet Integration:** Seamless integration with MetaMask for transaction signing and gas fee management.
* **Public Verification:** Any stakeholder (student, employer, auditor) can verify a grade by querying the blockchain without needing university admin access.

## 🛠 Tech Stack
* **Blockchain Network:** Ethereum Sepolia Testnet
* **Smart Contract:** Solidity (v0.8.0)
* **Frontend:** React.js + Vite
* **Blockchain Interaction:** Ethers.js (v6)
* **Development Environment:** Remix IDE (Contract) & VS Code (Frontend)

## ⚙️ Smart Contract Details
The "Engine" of this application is deployed live on the public testnet.

* **Contract Address:** `0x74AdfE524739932A54F92C33fBb0B30d1f9CB099`
* **Network:** Sepolia
* **Explorer Link:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x74AdfE524739932A54F92C33fBb0B30d1f9CB099)

## 🚀 How to Run Locally

### Prerequisites
1.  Node.js installed.
2.  MetaMask browser extension installed.
3.  Sepolia Testnet ETH (from a faucet).

### Installation
1.  Clone the repository:
    ```bash
    git clone [your-repo-link]
    cd grading-dapp
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the local host link (usually `http://localhost:5173`) and connect your MetaMask wallet.

## 🔮 Roadmap: What's to Come (Phase 3 & 4)
While the current system proves **Immutability**, the next phases focus on **Consensus** and **Privacy**.

### Phase 3: The Decentralized Reviewer Network (DON)
* **Objective:** Remove individual lecturer bias.
* **Mechanism:** Grades will not be finalized immediately. Instead, they will enter a "Proposed" state. A random subset of anonymous reviewers (other lecturers/top students) must vote to "Approve" the grade.
* **Smart Contract Upgrade:** Implementation of a voting/consensus logic (e.g., 2-of-3 signatures required).

### Phase 4: Privacy & Scalability
* **Zero-Knowledge Proofs (ZKP):** Allow students to prove they passed a course without revealing their exact score or identity publicly.
* **IPFS Integration:** Off-chain storage for heavy evidence files (assignment PDFs, exam papers) with only the cryptographic hash stored on-chain to save gas costs.
