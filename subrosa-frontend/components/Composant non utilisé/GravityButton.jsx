'use client';
// components/GravityButton.jsx
import React, { useRef } from "react";
import styles from "./GravityButton.module.css";

const GravityButton = ({ color = "hotpink", icon }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const h = rect.width / 2;
    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - h;

    const r1 = Math.sqrt(x * x + y * y);
    const r2 = (1 - r1 / h) * r1;

    const angle = Math.atan2(y, x);
    const tx = Math.round(Math.cos(angle) * r2 * 100) / 100;
    const ty = Math.round(Math.sin(angle) * r2 * 100) / 100;

    const op = r2 / r1 + 0.25;

    btn.style.setProperty("--tx", `${tx}px`);
    btn.style.setProperty("--ty", `${ty}px`);
    btn.style.setProperty("--opacity", `${op}`);
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.setProperty("--tx", "0px");
    btn.style.setProperty("--ty", "0px");
    btn.style.setProperty("--opacity", "0.25");
  };

  return (
    <div className={styles.gravityButton}>
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ "--color": color }}
      >
{icon}
       
      </button>
    </div>
  );
};

export default GravityButton;
