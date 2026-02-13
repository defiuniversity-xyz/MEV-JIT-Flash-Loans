# I Built an Interactive Web App That Teaches Flash Loans, MEV & JIT Liquidity — Here's What's Inside

Most people learn DeFi by reading threads or watching YouTube. That's fine for the basics. But when you're trying to actually understand *how* a flash loan executes inside the EVM, or *why* JIT liquidity is slowly hollowing out Uniswap V3 pools — you need to **see it happen**.

So I built **DeFi Academy** — a single-page interactive web app that turns dense DeFi research into hands-on simulations you can click through, toggle, and experiment with.

No wallet connection. No sign-up. Just scroll and learn.

---

## What It Covers

The app walks you through a structured 13-section curriculum — starting from the fundamentals and building up to the strategies that professional searchers and market makers actually use today.

### Flash Loans (Sections 1–6)

- **EVM Atomicity** — Toggle between a successful and reverted transaction to see *why* flash loans are possible. The key insight: the blockchain literally pretends the loan never happened if you can't repay.
- **Flash Loan Lifecycle** — Step through all 5 phases: Initiation → Optimistic Transfer → Callback → Strategy → Repayment. Each step shows which entity holds the funds and what happens if things go wrong.
- **Arbitrage Calculator** — Plug in your own numbers: borrow amount, prices on two exchanges, flash loan fee. Watch the profit/loss update in real-time. If you're unprofitable, it shows "Transaction Reverts" — just like on-chain.
- **Oracle Manipulation Simulator** — Walk through a 5-step attack: borrow → pump token price → exploit lending protocol → dump → repay. Watch the price chart move and the protocol status shift from "Healthy" to "Drained."
- **Attack Timeline** — Interactive timeline covering bZx ($350K), Mango Markets ($116M), Euler Finance ($197M), and emerging 2025–2026 vectors like cross-chain latency exploits and read-only reentrancy.
- **Protocol Comparison** — Compare Aave, Uniswap, Balancer, dYdX, and MakerDAO side-by-side. Fees, liquidity sources, mechanisms — with a compare mode to pin two protocols next to each other.

### MEV & JIT Liquidity (Sections 7–13)

- **MEV Supply Chain** — Animated flow diagram showing Users → Searchers → Builders → Relayers → Validators. Click each node to learn what they do and how they extract value.
- **V2 vs V3 Liquidity** — Drag a slider to concentrate liquidity and watch capital efficiency improve from 17% to 90%+. See exactly why V3 is 4000x more efficient — and why that creates the JIT vulnerability.
- **JIT Liquidity Visualizer** — Watch the 3-transaction attack play out: Mint → Victim Swap → Burn. A pie chart shows fee distribution shifting from 100% passive LP to 85% JIT bot in real-time.
- **The JIT Paradox** — Toggle JIT on/off and see the systemic impact. With JIT active: whales get 0.139% better execution, but passive LPs lose 85% of their fee revenue, and the pool becomes "hollow" for retail traders.
- **Sandwich Attack Simulator** — Step through a front-run → victim trade → back-run sequence. See the ETH price move with each transaction and the searcher's profit calculated.
- **Cross-Chain Gap** — Visual showing why flash loans can't cross chains (bridge delay breaks atomicity), plus the Intent-based solution where Solvers fill instantly.
- **Security Checklist** — Reentrancy guards, access control, TWAP oracles, circuit breakers — with the actual EIP-3156 Solidity code and syntax highlighting.

---

## Key Numbers From the Research

These are baked into the app's interactive elements:

- **$2 trillion** in flash loan volume in 2024 alone
- **269x** — the average liquidity multiplier a JIT bot needs (for a $1M swap, deploy $269M)
- **0.007%** — average ROI per JIT attack (razor-thin margins, industrial scale)
- **85%** — fee revenue stolen from passive LPs on JIT blocks
- **92%** — share of all JIT profit captured by a single bot address
- **0.05%** — Aave V3 flash loan fee (Balancer charges 0%)

---

## Why I Built This

Reading a 30-page research paper on MEV is one thing. Actually *seeing* how a sandwich attack manipulates the price bar, or *toggling* JIT on and off to watch LP revenue collapse — that's when it clicks.

DeFi is getting more complex every cycle. The gap between "I know what a flash loan is" and "I understand how the MEV supply chain actually works" is where alpha lives. This app is designed to close that gap.

---

## Tech Details (For the Builders)

- React 18 + Vite + Tailwind CSS + Framer Motion
- 12 interactive elements, 13 sections, zero backend
- Dark-themed with scroll-triggered animations
- Code-split with lazy loading (111KB initial gzip)
- All content sourced from peer-reviewed DeFi research (2024–2026)

---

**The app is live on the repo.** Clone it, run `npm install && npm run dev` inside the `spa/` folder, and start exploring.

Drop a comment if you want me to add any specific strategies or protocols to the simulator. Thinking about adding a liquidation cascade visualizer next.

LFG 🔥
