export const mevSupplyChain = [
  {
    id: 'users',
    label: 'Users',
    icon: 'User',
    color: '#3b82f6',
    description: 'Originate transactions (swaps, transfers) via wallets and RPCs.',
    detail: 'Regular DeFi users submit swap transactions that become visible in the public mempool before confirmation.',
  },
  {
    id: 'searchers',
    label: 'Searchers',
    icon: 'Search',
    color: '#f59e0b',
    description: 'Algorithmic traders scanning the mempool for MEV opportunities.',
    detail: 'Highly specialized bots that detect arbitrage, sandwich attacks, and JIT opportunities. They create transaction "bundles" that guarantee atomic execution of their strategy.',
  },
  {
    id: 'builders',
    label: 'Builders',
    icon: 'Hammer',
    color: '#8b5cf6',
    description: 'Aggregate bundles and standard transactions to construct full blocks.',
    detail: 'Block builders optimize for maximum total value (fees + bribes from searchers). They arrange transaction order to maximize MEV extraction.',
  },
  {
    id: 'relayers',
    label: 'Relayers',
    icon: 'Radio',
    color: '#06b6d4',
    description: 'Trusted intermediaries passing block headers from builders to validators.',
    detail: 'Relayers prevent validators from "stealing" the builder\'s strategy by only revealing the block header (not the full transaction list) until commitment.',
  },
  {
    id: 'validators',
    label: 'Validators',
    icon: 'ShieldCheck',
    color: '#10b981',
    description: 'Ultimate proposers who commit the block to the blockchain.',
    detail: 'Validators select the highest-bidding block from builders and commit it. They earn the block reward plus the builder\'s bid payment.',
  },
];

export const mevStrategies = [
  {
    name: 'Atomic Arbitrage',
    mechanism: 'Exploit price discrepancies between two DEXs',
    target: 'Passive LPs (Impermanent Loss)',
    impact: 'Benign/Positive',
    impactColor: '#10b981',
    description: 'Enforces price convergence and market efficiency across exchanges.',
  },
  {
    name: 'Sandwich Attack',
    mechanism: 'Front-run a buy order to raise price, then back-run to sell',
    target: 'The Trader (High Slippage)',
    impact: 'Predatory/Negative',
    impactColor: '#f43f5e',
    description: 'Extracts value directly from the user; degrades execution quality.',
  },
  {
    name: 'Liquidation',
    mechanism: 'Monitor under-collateralized loans to trigger liquidation bounty',
    target: 'Borrowers (Loss of Collateral)',
    impact: 'Systemic',
    impactColor: '#f59e0b',
    description: 'Necessary for the solvency of lending protocols.',
  },
  {
    name: 'JIT Liquidity',
    mechanism: 'Mint liquidity before a trade, burn it after',
    target: 'Passive LPs (Fee Dilution)',
    impact: 'Ambiguous',
    impactColor: '#8b5cf6',
    description: 'Improves execution for traders but starves passive LPs of revenue.',
  },
];

export const jitSteps = [
  {
    step: 1,
    title: 'Tx 1: The Mint (Front-run)',
    description:
      'The JIT searcher mints a concentrated liquidity position in the exact tick range where the victim\'s swap will execute. This range is extremely narrow — often a single tick (0.01%) — to maximize capital efficiency.',
    detail:
      'By concentrating massive liquidity in this narrow band, the searcher ensures their position constitutes the vast majority (85%+) of active liquidity in that tick.',
    passiveLPShare: 100,
    jitLPShare: 0,
    phase: 'before',
  },
  {
    step: 2,
    title: 'Tx 2: The Victim Swap',
    description:
      'The user\'s swap executes. The AMM distributes fees pro-rata based on active liquidity. Since the JIT position dwarfs existing liquidity, the searcher captures ~85% of trading fees.',
    detail:
      'Empirical data shows JIT attacks dilute existing LPs by an average of 85% for the attacked transaction. The trader gets better execution (lower slippage) due to deeper liquidity.',
    passiveLPShare: 15,
    jitLPShare: 85,
    phase: 'during',
  },
  {
    step: 3,
    title: 'Tx 3: The Burn (Back-run)',
    description:
      'The searcher burns the liquidity position and withdraws both principal and accrued fees. The entire operation completes within a single block (~12 seconds on Ethereum).',
    detail:
      'The searcher is left with a different token ratio due to the swap. They hedge this inventory risk on CEXs (Binance, Coinbase). Average ROI: just 0.007% per transaction.',
    passiveLPShare: 100,
    jitLPShare: 0,
    phase: 'after',
  },
];

export const jitParadoxData = {
  withJIT: {
    largeTradeSlippage: 0.05,
    smallTradeSlippage: 0.45,
    passiveLPRevenue: 15,
    jitLPRevenue: 85,
    poolDepth: 'Hollow — deep for whales, shallow for retail',
    traderBenefit: '+0.139% price improvement (large trades)',
    lpImpact: '-85% fee revenue on JIT blocks',
  },
  withoutJIT: {
    largeTradeSlippage: 0.25,
    smallTradeSlippage: 0.25,
    passiveLPRevenue: 100,
    jitLPRevenue: 0,
    poolDepth: 'Uniform — consistent for all trade sizes',
    traderBenefit: 'Standard execution quality',
    lpImpact: 'Full fee revenue retained',
  },
};

export const jitMetrics = [
  { label: 'Avg. Liquidity Multiplier', value: '269×', description: 'swap volume required' },
  { label: 'Avg. ROI per Attack', value: '0.007%', description: 'razor-thin margins' },
  { label: 'Fee Dilution', value: '~85%', description: 'passive LP loss per JIT block' },
  { label: 'Dominant Bot Share', value: '92%', description: 'single address (0xa57…6CF)' },
  { label: 'Total V3 Liquidity', value: '<1%', description: 'niche sniper strategy' },
  { label: 'Avg. Price Improvement', value: '0.139%', description: '13.9 bps for targeted traders' },
];
