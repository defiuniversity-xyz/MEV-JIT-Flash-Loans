# DeFi Academy — Interactive Learning SPA

An interactive single-page web application that teaches Flash Loans, MEV (Maximal Extractable Value), and JIT (Just-In-Time) Liquidity through hands-on simulations, calculators, and step-through visualizations.

Built from two comprehensive DeFi research documents covering $2T+ in flash loan volume, real attack case studies, and cutting-edge market microstructure.

## Quick Start

```bash
npm install
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build in dist/
npm run preview    # Preview production build
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |

No backend required — all simulations run client-side.

## Curriculum (13 Sections)

### Flash Loans (Sections 1–6)
1. **Hero** — Animated stat counters ($2T+, 13 sections, 12+ simulations)
2. **Atomicity** — Interactive EVM state visualizer (success vs. revert toggle)
3. **Flash Loan Mechanics** — 5-step lifecycle stepper with entity tracking
4. **Use Cases** — Tabbed interface with arbitrage calculator + flow diagrams for collateral swap, self-liquidation, refinancing
5. **Attacks** — Oracle manipulation simulator + scrollable exploit timeline (bZx → Mango → Euler)
6. **Protocol Landscape** — Compare cards for Aave, Uniswap, Balancer, dYdX, MakerDAO

### MEV & JIT Liquidity (Sections 7–13)
7. **MEV Fundamentals** — Animated supply chain flow + strategy taxonomy
8. **AMM Evolution** — V2 vs V3 liquidity curve visualizer with concentration slider
9. **JIT Deep Dive** — 3-transaction visualizer with pie chart + animated metrics
10. **JIT Paradox** — Toggle demo showing systemic LP impact
11. **Strategies** — Sandwich attack simulator + cross-chain gap visualizer
12. **Future** — Uniswap V4 Hooks, Intent-based architectures, SUAVE/TEEs
13. **Security** — Interactive checklist + EIP-3156 Solidity code with syntax highlighting

## Interactive Elements (15+)

| Element | Type | Key Concept |
|---------|------|-------------|
| Atomicity Visualizer | Toggle (Success/Revert) | EVM transaction atomicity |
| Flash Loan Stepper | 5-step walkthrough | Flash loan lifecycle |
| Arbitrage Calculator | Live calculator | Profit/loss economics |
| Collateral Swap Flow | 7-step diagram | Atomic risk management |
| Self-Liquidation Flow | 5-step diagram | Avoiding liquidation penalties |
| Refinancing Flow | 6-step diagram | Atomic rate shopping |
| Oracle Manipulation Sim | 5-step + chart | Attack mechanics |
| Attack Timeline | Expandable timeline | Historical exploits |
| Protocol Compare Cards | Cards + compare mode | Protocol landscape |
| MEV Supply Chain Flow | Animated pipeline | MEV supply chain |
| Liquidity Curve Viz | Slider + dual curves | V2 vs V3 AMMs |
| JIT Visualizer | 3-step + pie chart | JIT mechanics |
| JIT Paradox Demo | Toggle + dual panels | Systemic impact |
| Sandwich Attack Sim | 4-step + price chart | Sandwich mechanics |
| Cross-Chain Gap Viz | Problem/solution toggle | Cross-chain limitation |

## UX Features

- **Dark theme** — Deep navy (#0f172a) with glassmorphism cards
- **Scroll animations** — Sections fade in on scroll via Intersection Observer
- **Section progress tracker** — Navbar shows visited sections (X/13) with green dots
- **Back-to-top button** — Floating button appears after scrolling
- **Gradient section dividers** — Subtle separators between all 13 sections
- **Keyboard navigation** — Arrow keys step through all 4 stepper components
- **DeFi glossary tooltips** — Hover on jargon (EVM, DEX, Mempool, etc.) for definitions
- **Key Takeaways** — Summary boxes on all 8 teaching sections
- **Animated counters** — Stats count up on scroll ($2T+, 269×, 85%, etc.)
- **Code splitting** — React.lazy + Suspense for 13 lazy-loaded chunks
- **Responsive** — Mobile hamburger menu, stacked layouts on small screens
- **Accessible** — Focus-visible outlines, ARIA labels, aria-expanded, aria-live
- **Social ready** — Open Graph + Twitter Card meta tags

## Production Build

```
Initial JS:  355 KB (gzip: 113 KB)
CSS:          37 KB (gzip:   7 KB)
+ 13 lazy-loaded section chunks
```

## Project Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root + lazy loading + section layout
├── index.css                   # Tailwind + global styles
├── hooks/
│   ├── useInView.js            # Scroll-triggered visibility
│   └── useKeyboardNav.js       # Arrow key stepper navigation
├── components/
│   ├── layout/                 # Navbar, Footer, SectionWrapper, Tooltip, etc.
│   ├── sections/               # 13 section components
│   └── interactive/            # 15 interactive element components
└── data/
    ├── constants.js            # Sections, colors, animation variants
    ├── flashLoanContent.js     # Flash loan lifecycle, use cases, Solidity code
    ├── mevJitContent.js        # MEV supply chain, JIT steps, paradox data
    ├── protocolData.js         # 5 protocol comparison objects
    ├── attackCaseStudies.js    # 6 attack case studies
    └── glossary.js             # 17-term DeFi glossary for tooltips
```

## Content Sources

All educational content is sourced from two peer-reviewed DeFi research documents (2024–2026):
- *Flash Loans in Decentralized Finance: Systemic Analysis, Mechanics, and Evolution*
- *The Mechanics of Market Microstructure: An Exhaustive Analysis of MEV and JIT Liquidity*
