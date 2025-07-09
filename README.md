# Connect Career Future

An AI-powered blockchain-integrated job platform enabling users to post and discover jobs securely using Phantom wallet, smart matching, and skill extraction from resumes.

## 🌐 Live Demo

* **Frontend**: [https://connect-career-future.vercel.app](https://connect-career-future.vercel.app)
* **Backend**: [https://connect-career-future-production.up.railway.app](https://connect-career-future-production.up.railway.app)

---

## 🚀 Features

### ✅ Blockchain Integration (Module 3)

* Phantom wallet connection
* 0.01 SOL fee transaction to admin before job posting
* Transaction verified on Solana Devnet

### ✅ AI-Powered Enhancements (Module 4)

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
```

---

## 📈 GTM & Monetization Strategy

### 🎯 Target Users

* College grads, professionals (22–35 yrs)
* Startups, SMEs hiring tech talent

### 📅 3-Month Roadmap

1. Launch on Product Hunt + LinkedIn (Week 1–2)
2. Partner with university TPOs and coding bootcamps (Week 3–6)
3. Discord community, resume feedback loops (Week 7–12)

### 💰 Budget: ₹5,000

* ₹2,000 – LinkedIn Ads (targeted by skills & location)
* ₹1,500 – Creator shoutouts (YouTube/Instagram)
* ₹1,000 – Discord promotions, meme campaigns
* ₹500 – Resume contest rewards (Amazon/Flipkart)

### 💸 Revenue Streams

1. ₹150/month premium resume boost (visibility, analytics)
2. ₹500 one-time token payment for job highlight (on Solana)

---

## 📄 License

MIT

---

> Built with ❤️ using AI, Web3, and open source.
