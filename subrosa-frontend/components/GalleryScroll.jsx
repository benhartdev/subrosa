// src/components/GalleryScroll.jsx
'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import '../styles/GalleryScroll.css';

const images = [
  '/images/chrysalis2.jpg',
  '/images/crysalis.png',
  '/images/chrysalis.jpg',
  '/images/chrysalis2.jpg',
  '/images/crysalis.png',
  '/images/chrysalis.jpg',
  '/images/chrysalis2.jpg',
  '/images/crysalis.png',
  '/images/chrysalis.jpg',
  '/images/chrysalis2.jpg',
  '/images/crysalis.png',
  '/images/chrysalis.jpg',
  '/images/chrysalis2.jpg',
  '/images/crysalis.png',
  '/images/chrysalis.jpg',
 
 
]

export default function GalleryScroll() {
  const containerRef = useRef()

  useEffect(() => {
    const container = containerRef.current
    const imgs = container.querySelectorAll('.coverflow-img')

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      imgs.forEach((img) => {
        const rect = img.getBoundingClientRect()
        const imgCenter = rect.left + rect.width / 2
        const offset = (containerCenter - imgCenter) / container.offsetWidth
        const rotateY = offset * 120
        const scale = 1 - Math.min(Math.abs(offset) * 0.3, 0.5)

        img.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`
        img.style.zIndex = `${100 - Math.floor(Math.abs(offset) * 100)}`
      })
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="coverflow-scroll-container" ref={containerRef}>
      <div className="coverflow-wrapper">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Artwork ${index + 1}`}
            width={500}
            height={500}
            className="coverflow-img"
          />
        ))}
      </div>
    </div>
  )
}