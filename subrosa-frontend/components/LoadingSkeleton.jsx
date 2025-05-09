// 3. LoadingSkeleton.jsx
"use client";
import React from "react";
// import "../styles/gallery.css";

export default function LoadingSkeleton({ type }) {
  return (
    <div className="galleryContainer">
      <div className="galleryGrid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="galleryItem skeleton">
            <div className="skeletonImage" />
            <div className="skeletonText" />
            <div className="skeletonSub" />
          </div>
        ))}
      </div>
    </div>
  );
}
