'use client'
import { useEffect, useState } from 'react'
import './ImageCarousel.css';

export interface ImagesType {
  src: string;
  alt: string;
}

export default function ImageCarousel({ images }: {images: ImagesType[]}) {
  const [currentImage, setCurrentImage] = useState(0)
  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
  const preloadedImages = images.map((i) => {
        const img = new Image();
        img.src = i.src;
        return img;
      });
      return () => {
        preloadedImages.length = 0;
      };
    }, [images]);

  return (
     <div className="carousel-images" style={{ backgroundImage: `url(${images[currentImage].src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="arrow" role="button" aria-label="Previous" onClick={prevImage}>
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="middle">
        {images.map((_: any, i: number) => <span key={i} aria-label={`Go to image ${i + 1}`} onClick={()=>setCurrentImage(i)} className={i===currentImage ? "dot dot-current": "dot"}>⋅</span>)}
      </div>
      <div className="arrow" role="button" aria-label="Next" onClick={nextImage}>
      <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  );
}