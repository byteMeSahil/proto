"use client";
import { MoreHorizontal } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const INCOME  = [8000, 12000, 9000, 11000, 13000, 6000];
const EXPENSE = [3000, 5000,  4000, 7000,  6000,  1300];

const W = 280, H = 100, PAD = 10;
const maxVal = 15000;

function toX(i: number) { return PAD + (i / (MONTHS.length - 1)) * (W - PAD * 2); }
function toY(v: number) { return H - PAD - (v / maxVal) * (H - PAD * 2); }

function polyline(data: number[], color: string, fill: string) {
  const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
  const fillPath = `M ${toX(0)},${H - PAD} ` + data.map((v, i) => `L ${toX(i)},${toY(v)}`).join(" ") + ` L ${toX(data.length - 1)},${H - PAD} Z`;
  return (
    <>
      <path d={fillPath} fill={fill} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="3" fill={color} />
      ))}
    </>
  );
}

export default function FinancialOverview() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="section-title">Financial Overview</p>
        <button className="text-text-light hover:text-text-muted transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-text-muted font-medium">Income</p>
          <p className="text-xl font-black text-brand-green mt-0.5">₹6,000</p>
        </div>
        <div>
          <p className="text-xs text-text-muted font-medium">Expenditure</p>
          <p className="text-xl font-black text-brand-red mt-0.5">₹1,300</p>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 110 }}>
          {/* Y grid lines */}
          {[0, 5000, 10000, 15000].map(v => (
            <line key={v} x1={PAD} y1={toY(v)} x2={W - PAD} y2={toY(v)}
              stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4,3" />
          ))}
          {/* Area + lines */}
          {polyline(INCOME,  "#2D6A4F", "rgba(45,106,79,0.08)")}
          {polyline(EXPENSE, "#DC2626", "rgba(220,38,38,0.06)")}
        </svg>

        {/* X labels */}
        <div className="flex justify-between px-2.5 mt-1">
          {MONTHS.map(m => (
            <span key={m} className="text-2xs text-text-light">{m}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-surface-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full bg-brand-green" />
          <span className="text-xs text-text-muted">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full bg-brand-red" />
          <span className="text-xs text-text-muted">Expenditure</span>
        </div>
      </div>
    </div>
  );
}
