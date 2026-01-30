# 🎓 Trusted Grading Oracle: Blockchain-Based Academic Verification

![Project Banner](assets/banner-placeholder.png)
**Status:** Phase 2 Complete (MVP Deployed on Sepolia Testnet)  
**Author:** [Your Name]  
**Institution:** SLIIT (BSc Hons in Information Technology - Software Engineering)  
**Research Component:** Seamless LMS Integration

---

## 📺 Demo Preview
![Application Demo](assets/demo.gif)
*Figure 1: Real-time interaction between the React Frontend and the Sepolia Blockchain.*

---

## 📌 Project Overview
This project addresses the vulnerability of centralized academic databases. Currently, university grades stored in SQL databases are susceptible to unauthorized modification, server failure, or administrative manipulation.

The **Trusted Grading Oracle** is a Decentralized Application (DApp) that moves the "Root of Trust" from a central server to the Ethereum Blockchain. It allows authorized lecturers to cryptographically sign and store grades as immutable records that are publicly verifiable but practically tamper-proof.

### 🏗 High-Level Architecture
![System Architecture](assets/architecture.png)

---

## 🧩 My Research Component: Seamless LMS Integration
This project is part of a 4-member research group. My specific contribution focuses on the **Middleware Bridge** that connects standard Web2 Learning Management Systems (like Moodle/Canvas) to the Web3 Blockchain, ensuring seamless user experience without requiring lecturers to understand crypto-wallets.

![LMS Integration Logic](assets/my-component.png)
*Figure 2: The logic flow for the Seamless LMS Integration module.*

---

## ✅ Completed Features (Phase 1 & 2)
The current version represents the **Minimum Viable Product (MVP)**:

* **Immutable Grade Storage:** A custom Solidity Smart Contract (`SimpleGrading.sol`) allows for the permanent storage of Student IDs, Course IDs, and Scores.
* **Cryptographic Ownership:** Grades are linked to the wallet address of the submitting lecturer, ensuring accountability.
* **Decentralized Frontend:** A React-based interface (built with Vite) that connects directly to the blockchain via Ethers.js.
* **Web3 Wallet Integration:** Seamless integration with MetaMask for transaction signing and gas fee management.
* **Public Verification:** Any stakeholder (student, employer, auditor) can verify a grade by querying the blockchain without needing university admin access.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Blockchain** | ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=flat&logo=Ethereum&logoColor=white) | Sepolia Testnet |
| **Smart Contract** | ![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=flat&logo=solidity&logoColor=white) | v0.8.0 |
| **Frontend** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) | React + Vite |
| **Web3 Library** | ![Ethers](https://img.shields.io/badge/ethers.js-darkblue?style=flat&logo=ethereum&logoColor=white) | Ethers.js v6 |
| **Tools** | ![VS Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=flat&logo=visual-studio-code&logoColor=white) | Remix IDE & VS Code |

---

## ⚙️ Smart Contract Details
The "Engine" of this application is deployed live on the public testnet.

* **Contract Address:** `0x74AdfE524739932A54F92C33fBb0B30d1f9CB099`
* **Network:** Sepolia
* **Explorer:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x74AdfE524739932A54F92C33fBb0B30d1f9CB099)

---

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

---

## 🔮 Roadmap: What's to Come

### Phase 3: The Decentralized Reviewer Network (DON)
* **Objective:** Remove individual lecturer bias.
* **Mechanism:** Grades will not be finalized immediately. Instead, they will enter a "Proposed" state. A random subset of anonymous reviewers (other lecturers/top students) must vote to "Approve" the grade.

### Phase 4: Privacy & Scalability
* **Zero-Knowledge Proofs (ZKP):** Allow students to prove they passed a course without revealing their exact score or identity publicly.
* **IPFS Integration:** Off-chain storage for heavy evidence files (assignment PDFs, exam papers).
