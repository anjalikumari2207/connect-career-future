# Connect Career Future

An AI-powered blockchain-integrated job platform enabling users to post and discover jobs securely using Phantom wallet, smart matching, and skill extraction from resumes.

## 🌐 Live Demo

* **Frontend**: [https://connect-career-future.vercel.app](https://connect-career-future.vercel.app)
* **Backend**: [https://connect-career-future-production.up.railway.app](https://connect-career-future-production.up.railway.app)

---

## 🚀 Features

### ✅ Blockchain Integration 

* Phantom wallet connection
* 0.01 SOL fee transaction to admin before job posting
* Transaction verified on Solana Devnet

### ✅ AI-Powered Enhancements 

* Resume Skill Extraction (text + PDF/.docx upload)
* Smart Job ↔ Candidate Matching using NLP + Cosine Similarity
* Resume Optimizer, Network Insights, Career Path (UI-ready)

### ✅ Job Platform Core

* Post, apply, and save jobs
* MongoDB backend with Express
* React + Vite frontend using shadcn/ui
* Authentication with JWT

---

## 🧠 AI/ML Integration

**Skill Extraction**

* Tokenization + keyword detection using `natural`

**Job Matching**

* Cosine similarity between resume tokens and job description

**File Upload**

* Extract text from PDF using `pdf-parse`
* Extract text from DOCX using `mammoth`

---

## 💻 Tech Stack

* Frontend: React + Vite + Tailwind + shadcn/ui
* Backend: Node.js + Express + MongoDB + Mongoose
* AI: natural + cosine-similarity
* Blockchain: Solana Web3.js, Phantom Wallet

---

## 📦 Setup Instructions

### 🔧 Prerequisites

* Node.js v18+
* MongoDB (local or MongoDB Atlas)
* Phantom Wallet (Devnet)

### 1. Clone the Repo

```bash
git clone https://github.com/anjalikumari2207/connect-career-future.git
cd connect-career-future
```

### 2. Setup Backend (server)

```bash
cd server
npm install
```

* Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/connect-career
JWT_SECRET=your_jwt_secret
ADMIN_WALLET=12c9CS6jPkKTGhAb1Wi7DQsnpJn9PX2uu54n1EgwzPvV
```

* Start backend:

```bash
npm run start
```

### 3. Setup Frontend (client)

```bash
cd ../client
npm install
```

* Update `src/api/axios.ts`:

```ts
const instance = axios.create({
  baseURL: "https://connect-career-future-production.up.railway.app/api",
});
```

* Start frontend:

```bash
npm run dev
```

---

## 🧪 Testing

* Connect Phantom Wallet (Devnet)
* Post a job (pay 0.01 SOL)
* Upload a resume (PDF or DOCX)
* Match job descriptions with resume

---

## 💼 Admin Wallet

```txt
Devnet Wallet: 12c9CS6jPkKTGhAb1Wi7DQsnpJn9PX2uu54n1EgwzPvV
---

## 📄 License

MIT

---

> Built with ❤️ using AI, Web3, and open source.
