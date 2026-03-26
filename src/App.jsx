import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Target, DollarSign, BarChart3, Zap, ArrowRight } from "lucide-react";

const formatBRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const parseNum = (s) => {
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

function BarChart({ data }) {
  const absMax = Math.max(...data.map((d) => Math.abs(d.profit)), 1);
  return (
    <div className="flex items-end gap-1 md:gap-3 px-1 md:px-2 pt-8 pb-0 overflow-x-auto" style={{ height: "260px" }}>
      {data.map((d, i) => {
        const isPositive = d.profit >= 0;
        const isBreakeven = d.isBreakeven;
        const pct = Math.min((Math.abs(d.profit) / absMax) * 100, 100);
        const height = Math.max(pct, 6);
        return (
          <div key={i} className="flex-1 min-w-[45px] flex flex-col items-center gap-2" style={{ height: "100%", justifyContent: "flex-end" }}>
            <span
              className="text-[8px] md:text-[10px] font-bold text-center leading-tight"
              style={{ color: isBreakeven ? "#facc15" : isPositive ? "#10b981" : "#ef4444", letterSpacing: "-0.02em" }}
            >
              {d.profit >= 0 ? "+" : ""}
              {formatBRL(d.profit)}
            </span>
            <div
              className="w-full overflow-hidden"
              style={{
                height: `${height}%`,
                background: isBreakeven 
                  ? "linear-gradient(180deg, #fde047 0%, #facc15 100%)"
                  : isPositive
                  ? "linear-gradient(180deg, #34d399 0%, #059669 100%)"
                  : "linear-gradient(180deg, #f87171 0%, #dc2626 100%)",
                boxShadow: isBreakeven
                  ? "0 0 15px rgba(250,204,21,0.4)"
                  : isPositive
                  ? "0 0 20px rgba(16,185,129,0.3)"
                  : "0 0 20px rgba(239,68,68,0.2)",
                borderRadius: "8px 8px 0 0",
                transition: "height 0.7s ease-out",
                position: "relative",
                border: isBreakeven ? "2px solid #fef08a" : "none"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.1,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)",
                }}
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold" style={{ color: isBreakeven ? "#facc15" : "#94a3b8" }}>
                {d.qty}×
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ResultRow({ qty, revenue, cost, profit, isBreakeven }) {
  const isPositive = profit >= 0;
  return (
    <div
      className="grid items-center py-3 px-2 md:px-4 gap-1 md:gap-0"
      style={{
        gridTemplateColumns: "0.8fr 1.2fr 1.2fr 1.2fr 1fr",
        background: isBreakeven
          ? "linear-gradient(90deg, rgba(250,204,21,0.1), rgba(250,204,21,0.05))"
          : isPositive
          ? "linear-gradient(90deg, rgba(16,185,129,0.08), transparent)"
          : "linear-gradient(90deg, rgba(239,68,68,0.06), transparent)",
        borderLeft: isBreakeven
          ? "4px solid #facc15"
          : isPositive
          ? "3px solid #10b981"
          : "3px solid #ef4444",
        borderRadius: "12px",
        transition: "all 0.3s",
        transform: isBreakeven ? "scale(1.01)" : "none",
        zIndex: isBreakeven ? 10 : 1
      }}
    >
      <span className="font-bold text-sm md:text-lg" style={{ color: isBreakeven ? "#facc15" : "#e2e8f0" }}>
        {qty}
      </span>
      <span className="text-[10px] md:text-sm" style={{ color: "#94a3b8" }}>{formatBRL(revenue)}</span>
      <span className="text-[10px] md:text-sm" style={{ color: "#f87171" }}>{formatBRL(cost)}</span>
      <span className="font-bold text-xs md:text-lg" style={{ color: isBreakeven ? "#facc15" : isPositive ? "#10b981" : "#ef4444" }}>
        {profit >= 0 ? "+" : ""}
        {formatBRL(profit)}
      </span>
      <div className="flex items-center justify-end gap-1 md:gap-2">
        {isBreakeven && (
          <span
            className="text-[8px] md:text-[10px] font-black px-1 md:px-2 py-1"
            style={{ background: "#facc15", color: "#000", borderRadius: "9999px", whiteSpace: "nowrap" }}
          >
            B-EVEN
          </span>
        )}
        {isPositive ? (
          <TrendingUp size={16} color={isBreakeven ? "#facc15" : "#10b981"} />
        ) : (
          <TrendingDown size={16} color="#ef4444" />
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [costInput, setCostInput] = useState("1000");
  const [returnInput, setReturnInput] = useState("150");

  const cost = parseNum(costInput);
  const returnPerAction = parseNum(returnInput);

  const breakeven = useMemo(() => {
    if (returnPerAction <= 0) return 0;
    return Math.ceil(cost / returnPerAction);
  }, [cost, returnPerAction]);

  const dynamicQuantities = useMemo(() => {
    const base = [1, 5, 10, 15, 20];
    if (breakeven > 0 && !base.includes(breakeven)) {
      base.push(breakeven);
    }
    return base.sort((a, b) => a - b);
  }, [breakeven]);

  const results = useMemo(
    () =>
      dynamicQuantities.map((qty) => ({
        qty,
        revenue: qty * returnPerAction,
        cost,
        profit: qty * returnPerAction - cost,
        isBreakeven: qty === breakeven && breakeven > 0
      })),
    [dynamicQuantities, cost, returnPerAction, breakeven]
  );

  const roiPct = useMemo(() => {
    if (cost === 0) return 0;
    return (((20 * returnPerAction - cost) / cost) * 100).toFixed(1);
  }, [cost, returnPerAction]);

  const inputsValid = cost > 0 && returnPerAction > 0;

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: "#0d0d12",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700&family=Space+Mono:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "9999px",
            }}
          >
            <Zap size={14} color="#818cf8" />
            <span
              className="text-[10px] md:text-xs font-bold uppercase"
              style={{ color: "#818cf8", letterSpacing: "0.15em" }}
            >
              Calculadora de ROI
            </span>
          </div>
          <h1
            className="text-2xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Retorno de Prêmios
          </h1>
          <p className="text-sm md:text-base px-2" style={{ color: "#64748b" }}>
            Descubra quantas ações são necessárias para que seu investimento se pague.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
          {[
            {
              label: "Custo do Investimento (R$)",
              value: costInput,
              set: setCostInput,
              icon: <DollarSign size={20} color="#fff" />,
              gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              accent: "rgba(99,102,241,0.2)",
              accentHover: "rgba(99,102,241,0.6)",
              placeholder: "Ex: 1500"
            },
            {
              label: "Retorno por Ação (R$)",
              value: returnInput,
              set: setReturnInput,
              icon: <BarChart3 size={20} color="#fff" />,
              gradient: "linear-gradient(135deg, #10b981, #059669)",
              accent: "rgba(16,185,129,0.2)",
              accentHover: "rgba(16,185,129,0.6)",
              placeholder: "Ex: 100"
            },
          ].map((field, idx) => (
            <div
              key={idx}
              className="p-4 md:p-6"
              style={{
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(148,163,184,0.1)",
                borderRadius: "16px",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                  style={{ background: field.gradient, borderRadius: "10px md:12px" }}
                >
                  {field.icon}
                </div>
                <label
                  className="text-xs md:text-sm font-bold uppercase"
                  style={{ color: "#94a3b8", letterSpacing: "0.08em" }}
                >
                  {field.label}
                </label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="w-full py-3 md:py-4 text-xl md:text-2xl font-bold outline-none"
                  style={{
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    background: "rgba(10,10,15,0.6)",
                    border: `2px solid ${field.accent}`,
                    color: "#e2e8f0",
                    borderRadius: "12px",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = field.accentHover)}
                  onBlur={(e) => (e.target.style.borderColor = field.accent)}
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Break-even Display */}
        <div
          className="p-4 md:p-6 mb-6 md:mb-8 text-center mx-1 md:mx-0"
          style={{
            background: "linear-gradient(135deg, rgba(250,204,21,0.08), rgba(245,158,11,0.05))",
            border: "1px solid rgba(250,204,21,0.2)",
            borderRadius: "16px",
          }}
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
            <Target size={18} className="md:w-[22px]" color="#facc15" />
            <span
              className="text-[10px] md:text-sm font-bold uppercase text-center"
              style={{ color: "#facc15", letterSpacing: "0.15em" }}
            >
              Ponto de Equilíbrio (Break-even)
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <span
              className="text-3xl md:text-5xl font-bold"
              style={{
                fontFamily: "'Space Mono', monospace",
                color: !inputsValid || breakeven === Infinity ? "#ef4444" : "#facc15",
              }}
            >
              {!inputsValid || breakeven === Infinity ? "0" : breakeven}
            </span>
            <span className="text-sm md:text-lg" style={{ color: "#94a3b8" }}>
              {!inputsValid || breakeven === Infinity
                ? "ações"
                : breakeven === 1
                ? "ação"
                : "ações"}
            </span>
          </div>
          {inputsValid && breakeven !== Infinity && (
            <p className="mt-2 text-[10px] md:text-sm px-2" style={{ color: "#64748b" }}>
              A partir de{" "}
              <strong style={{ color: "#facc15" }}>
                {breakeven} {breakeven === 1 ? "ação" : "ações"}
              </strong>
              , seu investimento começa a dar retorno positivo.
            </p>
          )}
        </div>

        {/* Simulation Table Container */}
        <div
          className="overflow-x-auto mb-6 md:mb-8"
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.1)",
            borderRadius: "16px",
          }}
        >
          <div className="p-4 md:p-6 pb-2 md:pb-3">
            <h2 className="text-base md:text-lg font-bold flex items-center gap-2" style={{ color: "#e2e8f0" }}>
              <ArrowRight size={18} color="#818cf8" />
              Simulação Comparativa
            </h2>
          </div>

          {/* Table Header */}
          <div
            className="mx-2 md:mx-4 mb-2 px-2 md:px-4 py-2 grid text-[8px] md:text-xs font-bold uppercase"
            style={{
              gridTemplateColumns: "0.8fr 1.2fr 1.2fr 1.2fr 1fr",
              background: "rgba(10,10,15,0.5)",
              color: "#64748b",
              borderRadius: "8px",
              letterSpacing: "0.05em md:0.08em",
            }}
          >
            <span>Qtd</span>
            <span>Receita</span>
            <span>Custo</span>
            <span>Lucro</span>
            <span style={{ textAlign: "right" }}>Status</span>
          </div>

          <div className="flex flex-col gap-2 px-2 md:px-4 pb-4 md:pb-6 min-w-[300px]">
            {results.map((r) => (
              <ResultRow
                key={r.qty}
                {...r}
              />
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div
          className="p-4 md:p-6 mb-8 overflow-hidden"
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.1)",
            borderRadius: "16px",
          }}
        >
          <h2 className="text-base md:text-lg font-bold flex items-center gap-2 mb-4" style={{ color: "#e2e8f0" }}>
            <BarChart3 size={18} color="#818cf8" />
            Lucro por Quantidade
          </h2>
          <div className="w-full">
            <BarChart data={results} />
          </div>
        </div>
      </div>
    </div>
  );
}