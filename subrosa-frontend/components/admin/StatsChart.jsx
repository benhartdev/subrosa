"use client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#ff4cf9", "#4cfaff", "#ffc94c", "#4cff8a", "#ff4c4c", "#9f4cff"];

export default function StatsChart({ stats }) {
  const barData = [
    { name: "Artistes", value: stats.totalArtists },
    { name: "Validés", value: stats.approvedArtists },
    { name: "En attente", value: stats.pendingArtists },
    { name: "Utilisateurs", value: stats.totalUsers },
    { name: "Œuvres", value: stats.totalWorks },
    { name: "Commandes", value: stats.totalOrders },
  ];

  const pieData = barData.map((item, index) => ({
    name: item.name,
    value: item.value,
    fill: COLORS[index % COLORS.length],
  }));

  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fake = [
      { month: "Jan", artistes: 2, œuvres: 5, commandes: 1 },
      { month: "Fév", artistes: 3, œuvres: 6, commandes: 2 },
      { month: "Mars", artistes: 5, œuvres: 7, commandes: 3 },
      { month: "Avr", artistes: 7, œuvres: 8, commandes: 4 },
    ];
    setMonthlyData(fake);
  }, []);

  return (
    <section style={{ marginTop: "3rem" }}>
     

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "space-between",
        }}
      >
        {/* Barres */}
        <div style={{ flex: "1", minWidth: "400px", background: "#111", padding: "1rem", borderRadius: "12px" }}>
          <h3 style={{ color: "white", textAlign: "center" }}>Stats globales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="vertical" margin={{ top: 10, left: 80, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value">
                {barData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lignes */}
        <div style={{ flex: "1", minWidth: "400px", background: "#111", padding: "1rem", borderRadius: "12px" }}>
          <h3 style={{ color: "white", textAlign: "center" }}>Évolution / mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="artistes" stroke="#ff4cf9" />
              <Line type="monotone" dataKey="œuvres" stroke="#4cfaff" />
              <Line type="monotone" dataKey="commandes" stroke="#ffc94c" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Camembert */}
        <div style={{ flex: "1", minWidth: "400px", background: "#111", padding: "1rem", borderRadius: "12px" }}>
          <h3 style={{ color: "white", textAlign: "center" }}>Répartition </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
