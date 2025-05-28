
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

type ResortImageGalleryProps = {
  images: string[];
  resortName: string;
  virtualTourUrl?: string;
};

export default function ResortImageGallery({ images, resortName, virtualTourUrl }: ResortImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </AspectRatio>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-4">
        <div className="relative group">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
            <Image
              src={images[currentIndex]}
              alt={`${resortName} - Image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentIndex === 0} // Prioritize first image
              data-ai-hint="resort view"
            />
          </AspectRatio>
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity bg-background/70 hover:bg-background"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full opacity-50 group-hover:opacity-100 transition-opacity bg-background/70 hover:bg-background"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
            {images.map((_, slideIndex) => (
                <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === slideIndex ? 'bg-primary w-4' : 'bg-muted hover:bg-border'
                }`}
                aria-label={`Go to image ${slideIndex + 1}`}
                />
            ))}
            </div>
        )}

        {virtualTourUrl && virtualTourUrl !== '#' && (
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <a href={virtualTourUrl} target="_blank" rel="noopener noreferrer">
                <PlayCircle className="mr-2 h-5 w-5" />
                Take a Virtual Tour
              </a>
            </Button>
          </div>
        )}
         {virtualTourUrl === '#' && (
          <div className="mt-4 text-center">
            <Button variant="outline" disabled>
                <PlayCircle className="mr-2 h-5 w-5" />
                Virtual Tour (Coming Soon)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
