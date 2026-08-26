"use client";

import { useState } from "react";

const RATES: Record<string, { symbol: string; rate: number; locale: string }> = {
  GBP: { symbol: "£", rate: 1, locale: "en-GB" },
  USD: { symbol: "$", rate: 1.33, locale: "en-US" },
  EUR: { symbol: "€", rate: 1.15, locale: "de-DE" },
  CNY: { symbol: "¥", rate: 9.2, locale: "zh-CN" },
  JPY: { symbol: "¥", rate: 211, locale: "ja-JP" },
};

function convert(gbpAmount: number, currency: string) {
  const { symbol, rate, locale } = RATES[currency];
  const converted = gbpAmount * rate;
  const decimals = currency === "JPY" ? 0 : 0;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimals,
  }).format(Math.round(converted));
  return `${symbol}${formatted}`;
}

export function useCurrency() {
  const [currency, setCurrency] = useState("GBP");
  return { currency, setCurrency, convert: (amount: number) => convert(amount, currency) };
}

export default function CurrencySelector({
  currency,
  onChange,
}: {
  currency: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1">
      {Object.keys(RATES).map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            currency === c ? "bg-ink text-paper" : "text-ink/60 hover:text-brass"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
