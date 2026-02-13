import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

function BarChart({ bars, maxVal, color, label }) {
  return (
    <div>
      <div className="text-xs text-defi-muted mb-2 text-center">{label}</div>
      <div className="flex items-end gap-[2px] h-32 bg-defi-navy/50 rounded-lg p-2">
        {bars.map((val, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ backgroundColor: val > 0 ? color : 'transparent' }}
            animate={{ height: `${maxVal > 0 ? (val / maxVal) * 100 : 0}%` }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-defi-muted mt-1 px-1">
        <span>Low Price</span>
        <span>Current Price</span>
        <span>High Price</span>
      </div>
    </div>
  );
}

export default function LiquidityCurveViz() {
  const [concentration, setConcentration] = useState(50); // 0 = uniform (V2), 100 = max concentrated (V3)

  const data = useMemo(() => {
    const ticks = 40;
    const center = ticks / 2;
    const spread = Math.max(1, ((100 - concentration) / 100) * (ticks / 2));
    const totalLiquidity = 1000;

    const v2Bars = Array.from({ length: ticks }, () => totalLiquidity / ticks);

    const v3Bars = Array.from({ length: ticks }, (_, i) => {
      const dist = Math.abs(i - center);
      if (dist <= spread) {
        const peak = totalLiquidity / (2 * spread + 1);
        const falloff = 1 - (dist / (spread + 1)) * 0.3;
        return peak * falloff;
      }
      return 0;
    });

    const v3Max = Math.max(...v3Bars);
    const v2Max = Math.max(...v2Bars);

    // Capital efficiency
    const activeV2 = v2Bars.filter((_, i) => Math.abs(i - center) <= 3).reduce((a, b) => a + b, 0);
    const activeV3 = v3Bars.filter((_, i) => Math.abs(i - center) <= 3).reduce((a, b) => a + b, 0);
    const efficiencyV2 = ((activeV2 / totalLiquidity) * 100).toFixed(1);
    const efficiencyV3 = ((Math.min(activeV3, totalLiquidity) / totalLiquidity) * 100).toFixed(1);
    const multiplier = activeV3 > 0 && activeV2 > 0 ? (activeV3 / activeV2).toFixed(1) : '1.0';

    return { v2Bars, v3Bars, v2Max, v3Max, efficiencyV2, efficiencyV3, multiplier };
  }, [concentration]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChart bars={data.v2Bars} maxVal={data.v2Max} color="#3b82f6" label="Uniswap V2 — Uniform Distribution" />
        <BarChart bars={data.v3Bars} maxVal={data.v3Max} color="#10b981" label="Uniswap V3 — Concentrated Liquidity" />
      </div>

      {/* Slider */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-defi-muted">Concentration Level</span>
          <span className="text-sm font-mono text-white">{concentration}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="95"
          value={concentration}
          onChange={(e) => setConcentration(Number(e.target.value))}
          className="w-full h-2 bg-defi-border rounded-lg appearance-none cursor-pointer accent-defi-green"
        />
        <div className="flex justify-between text-[10px] text-defi-muted mt-1">
          <span>Spread (V2-like)</span>
          <span>Concentrated (V3)</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-defi-border">
          <div className="text-center">
            <div className="text-xs text-defi-muted mb-1">V2 Efficiency</div>
            <div className="text-lg font-bold text-defi-blue font-mono">{data.efficiencyV2}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-defi-muted mb-1">V3 Efficiency</div>
            <div className="text-lg font-bold text-defi-green font-mono">{data.efficiencyV3}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-defi-muted mb-1">Capital Multiplier</div>
            <div className="text-lg font-bold text-defi-amber font-mono">{data.multiplier}×</div>
          </div>
        </div>
      </div>
    </div>
  );
}
