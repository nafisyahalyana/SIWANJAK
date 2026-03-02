"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =======================
   DATA (dummy)
======================= */
const monthlyData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 17 },
  { month: "Apr", value: 15 },
  { month: "Mei", value: 25 },
  { month: "Jun", value: 30 },
  { month: "Jul", value: 19 },
  { month: "Agu", value: 18 },
  { month: "Sep", value: 16 },
  { month: "Okt", value: 8 },
  { month: "Nov", value: 19 },
  { month: "Des", value: 30 },
];

const donutData = [
  { name: "Total usulan", value: 10 },
  { name: "Usulan disetujui", value: 15 },
  { name: "Usulan ditolak", value: 3 },
];

const donutColors = ["#6D72FF", "#FF8A8A", "#2DD4BF"];

/* =======================
   CARD COMPONENT
======================= */
function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-xl bg-white shadow-md ring-1 ring-black/5",
        "transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-lg",
        "animate-fadeInUp",
        className,
      ].join(" ")}
    >
      <div className="px-5 pt-4">
        <h3 className="text-sm font-semibold tracking-wide text-[#123473]">
          {title.toUpperCase()}
        </h3>
      </div>
      <div className="px-5 pb-5 pt-3">{children}</div>
    </div>
  );
}

/* =======================
   PAGE CONTENT ONLY
   (Sidebar + Background sudah di app/(main)/layout.tsx)
======================= */
export default function DashboardPage() {
  const total = donutData.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Top big chart */}
      <Card title="Jumlah Data Usulan Berdasarkan Bulan" className="mb-6">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />

              <Tooltip
                cursor={{ fill: "rgba(18,52,115,0.08)" }}
                contentStyle={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
                wrapperStyle={{ outline: "none" }}
                labelStyle={{ color: "#111827" }}
              />

              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#8B89FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bottom donut card */}
      <div className="flex justify-center">
        <Card title="Jumlah Data Usulan" className="w-full max-w-3xl">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Donut */}
            <div className="h-[240px] w-[240px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {donutData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={donutColors[idx % donutColors.length]}
                      />
                    ))}
                  </Pie>

                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 26, fontWeight: 700, fill: "#111827" }}
                  >
                    {total}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Ringkasan */}
            <div className="w-full max-w-sm">
              <div className="mb-3 text-sm font-semibold text-zinc-800">
                Ringkasan
              </div>

              <div className="space-y-2 text-sm text-zinc-700">
                {donutData.map((d, i) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: donutColors[i] }}
                      />
                      <span>{d.name}</span>
                    </div>
                    <span className="font-semibold text-zinc-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
