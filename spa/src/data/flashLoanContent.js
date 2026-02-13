export const flashLoanLifecycle = [
  {
    step: 1,
    title: 'Initiation',
    icon: 'Play',
    description:
      'A user (typically a bot or smart contract) calls the flashLoan() function on a lending pool contract, specifying the asset and amount (e.g., 1,000 ETH).',
    entities: { user: 'active', pool: 'idle', dex: 'idle' },
    fundsLocation: 'pool',
    detail:
      'The borrower must deploy a smart contract implementing the receiver interface (e.g., IERC3156FlashBorrower). This contract contains the custom logic that will execute with the borrowed funds.',
  },
  {
    step: 2,
    title: 'Optimistic Transfer',
    icon: 'ArrowRight',
    description:
      'The lending pool checks liquidity, then transfers the requested funds to the borrower\'s contract. At this microsecond, the pool is technically under-collateralized.',
    entities: { user: 'receiving', pool: 'sending', dex: 'idle' },
    fundsLocation: 'user',
    detail:
      'This is called "optimistic" because the pool sends funds before knowing if they\'ll be returned. It relies entirely on EVM atomicity — if repayment fails, the entire transaction reverts as if the transfer never happened.',
  },
  {
    step: 3,
    title: 'Callback Execution',
    icon: 'Code',
    description:
      'The lending pool calls the borrower\'s executeOperation() or onFlashLoan() callback. The pool\'s transaction is "paused" waiting for this callback to return.',
    entities: { user: 'executing', pool: 'waiting', dex: 'idle' },
    fundsLocation: 'user',
    detail:
      'This is the critical hand-off. The lending pool transfers execution control to the borrower\'s contract. The borrower now has full custody of the funds and can interact with any other protocol.',
  },
  {
    step: 4,
    title: 'Strategy Execution',
    icon: 'Workflow',
    description:
      'The borrower executes their strategy: buy DAI on Uniswap, sell DAI on SushiSwap, perform complex multi-hop arbitrage — all within this single callback.',
    entities: { user: 'active', pool: 'waiting', dex: 'active' },
    fundsLocation: 'dex',
    detail:
      'The entire arbitrage, collateral swap, or liquidation strategy happens here. The borrowed funds can interact with any number of DeFi protocols. This is the "payload" of the flash loan.',
  },
  {
    step: 5,
    title: 'Repayment & Verification',
    icon: 'CheckCircle',
    description:
      'Control returns to the lending pool. It checks: Current Balance ≥ Initial Balance + Fee (0.05% on Aave V3). If true, the transaction succeeds. If false, everything reverts.',
    entities: { user: 'repaying', pool: 'verifying', dex: 'idle' },
    fundsLocation: 'pool',
    detail:
      'This is the atomic guarantee. The pool\'s require() statement acts as a deterministic risk filter. Default risk is binary: either the strategy was profitable enough (success) or it wasn\'t (revert). The lender never loses funds.',
  },
];

export const useCases = [
  {
    id: 'arbitrage',
    title: 'Arbitrage',
    icon: 'TrendingUp',
    color: '#10b981',
    subtitle: 'The Engine of Market Efficiency',
    description:
      'Exploit price differences between DEXs. Flash loans democratize arbitrage by providing massive capital to capture tiny spreads (0.1%–0.5%) that would be unprofitable with small amounts.',
    example: {
      title: 'Zero-Capital Arbitrage Example',
      borrow: '2,000,000 USDC',
      exchangeA: 'Uniswap V3 — 1 ETH = $3,000',
      exchangeB: 'SushiSwap — 1 ETH = $3,020',
      profit: '~$12,181',
      fee: '0.05% = $1,000',
    },
  },
  {
    id: 'collateral-swap',
    title: 'Collateral Swap',
    icon: 'Repeat',
    color: '#3b82f6',
    subtitle: 'Atomic Risk Management',
    description:
      'Change the asset backing a loan without unwinding the position. Flash borrow to repay debt → unlock collateral → swap asset → redeposit → re-borrow → repay flash loan. All in one transaction.',
    example: {
      title: 'WBTC → ETH Collateral Swap',
      scenario: '$1M WBTC collateral, $500K USDC debt on Aave',
      result: 'Same $500K debt, but now backed by ETH instead of WBTC',
      benefit: 'Avoid liquidation if you expect BTC to drop',
    },
    flowSteps: [
      { label: 'Flash Borrow', detail: 'Borrow $500K USDC from Aave', icon: '⚡' },
      { label: 'Repay Debt', detail: 'Use borrowed USDC to pay off $500K loan', icon: '💰' },
      { label: 'Unlock Collateral', detail: 'Withdraw $1M WBTC (now free)', icon: '🔓' },
      { label: 'Swap Asset', detail: 'Trade $1M WBTC → $1M ETH on DEX', icon: '🔄' },
      { label: 'Redeposit', detail: 'Deposit $1M ETH as new collateral', icon: '🏦' },
      { label: 'Re-borrow', detail: 'Borrow $500K USDC against ETH', icon: '📋' },
      { label: 'Repay Flash Loan', detail: 'Return $500K + fee to Aave', icon: '✅' },
    ],
  },
  {
    id: 'self-liquidation',
    title: 'Self-Liquidation',
    icon: 'Shield',
    color: '#f59e0b',
    subtitle: 'Avoid the 5–15% Penalty',
    description:
      'When approaching the liquidation threshold, use a flash loan to close your own position at market rates. Protocol liquidators charge a 5–15% penalty. Self-liquidation via flash loans eliminates this penalty entirely.',
    example: {
      title: 'Avoiding Liquidation Penalty',
      scenario: 'LTV approaching 80% threshold',
      penalty: 'Protocol liquidation: 5–15% of collateral lost',
      savings: 'Self-liquidation: close at market rates, save thousands',
    },
    flowSteps: [
      { label: 'Flash Borrow', detail: 'Borrow DAI (the debt asset)', icon: '⚡' },
      { label: 'Repay Own Loan', detail: 'Pay off your DAI debt on Aave', icon: '💰' },
      { label: 'Withdraw Collateral', detail: 'Unlock and withdraw your ETH', icon: '🔓' },
      { label: 'Sell Collateral', detail: 'Sell enough ETH to cover flash loan', icon: '📉' },
      { label: 'Repay Flash Loan', detail: 'Return DAI + fee, keep remaining ETH', icon: '✅' },
    ],
  },
  {
    id: 'refinancing',
    title: 'Debt Refinancing',
    icon: 'RefreshCw',
    color: '#8b5cf6',
    subtitle: 'Atomic Rate Shopping',
    description:
      'Move debt between protocols instantly when rates change. Flash borrow from the new protocol to repay the old one. Aave at 8% APY → Compound at 4% APY, migrated in a single block.',
    example: {
      title: 'Rate Arbitrage',
      from: 'Aave: 8% APY on USDC',
      to: 'Compound: 4% APY on USDC',
      benefit: 'Instant migration, no capital required, 50% rate reduction',
    },
    flowSteps: [
      { label: 'Flash Borrow', detail: 'Borrow USDC from flash loan provider', icon: '⚡' },
      { label: 'Repay Old Debt', detail: 'Pay off USDC debt on Aave (8% APY)', icon: '💰' },
      { label: 'Withdraw Collateral', detail: 'Unlock ETH collateral from Aave', icon: '🔓' },
      { label: 'Deposit Collateral', detail: 'Deposit ETH into Compound', icon: '🏦' },
      { label: 'Borrow at Lower Rate', detail: 'Borrow USDC on Compound (4% APY)', icon: '📋' },
      { label: 'Repay Flash Loan', detail: 'Return USDC + fee to provider', icon: '✅' },
    ],
  },
];

export const solidityCode = `import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";

contract FlashBorrower is IERC3156FlashBorrower {
  function onFlashLoan(
    address initiator,
    address token,
    uint256 amount,
    uint256 fee,
    bytes calldata data
  ) external override returns (bytes32) {
    // 1. Access Control: ONLY the lender can call
    require(msg.sender == address(lender), "Untrusted lender");

    // 2. Authorization: Ensure WE initiated this loan
    require(initiator == address(this), "Untrusted initiator");

    // 3. Execute Strategy (Arbitrage, Swap, etc.)
    // ... custom logic ...

    // 4. Approve lender to pull Principal + Fee
    IERC20(token).approve(address(lender), amount + fee);

    // 5. Return success hash
    return keccak256("ERC3156FlashBorrower.onFlashLoan");
  }
}`;
