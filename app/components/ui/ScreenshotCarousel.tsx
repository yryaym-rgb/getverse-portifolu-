'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

export interface CarouselSlide {
  src: string
  alt: string
  caption?: string
}

interface ScreenshotCarouselProps {
  slides: CarouselSlide[]
  className?: string
}

export default function ScreenshotCarousel({ slides, className = '' }: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback(
    (index: number) => setCurrent((index + slides.length) % slides.length),
    [slides.length]
  )

  if (slides.length === 0) return null

  const slide = slides[current]

  return (
    <div className={`relative ${className}`} role="region" aria-label="Screenshot carousel" aria-roledescription="carousel">
      <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <img
          src={slide.src}
          alt={slide.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        {slide.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm font-medium">{slide.caption}</p>
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel slides">
            {slides.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}: ${s.alt}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-8 bg-[#00f0ff]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function VideoOrCarousel({
  videoSrc,
  poster,
  slides,
}: {
  videoSrc?: string
  poster?: string
  slides: CarouselSlide[]
}) {
  const [showVideo, setShowVideo] = useState(false)

  if (videoSrc && showVideo) {
    return (
      <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <video
          controls
          poster={poster}
          className="w-full h-full"
          aria-label="MAONI platform walkthrough video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="relative">
      <ScreenshotCarousel slides={slides} />
      {videoSrc && (
        <button
          onClick={() => setShowVideo(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-3 rounded-full bg-[#00f0ff]/90 text-black font-semibold hover:bg-[#00f0ff] transition shadow-lg"
          aria-label="Play walkthrough video"
        >
          <Play size={18} fill="currentColor" />
          Watch Walkthrough
        </button>
      )}
    </div>
  )
}
