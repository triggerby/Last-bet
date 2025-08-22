'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { automations } from '@/data/automations';
import Image from 'next/image';
import Link from 'next/link';

// Split automations into 3 carousels (3-4-3)
const carouselA = automations.slice(0, 3); // Recovery
const carouselB = automations.slice(3, 7); // Optimization  
const carouselC = automations.slice(7, 10); // Protection

interface CarouselProps {
  title: string;
  subtitle: string;
  items: typeof automations;
  autoplay?: boolean;
}

function AutomationCard({ automation }: { automation: typeof automations[0] }) {
  return (
    <div className="flex-[0_0_280px] sm:flex-[0_0_320px] md:flex-[0_0_360px] lg:flex-[0_0_380px] min-w-0 mr-4">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full border border-gray-100">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={automation.image}
            alt={automation.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 380px"
          />
          {automation.badge && (
            <div className="absolute top-3 left-3 bg-brand-green text-white px-2 py-1 rounded-full text-xs font-medium">
              {automation.badge}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-green transition-colors">
              {automation.title}
            </h3>
            <div className="text-brand-green font-bold text-sm whitespace-nowrap ml-2">
              {automation.kpi}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {automation.oneLiner}
          </p>
          
          {automation.ctaLabel && automation.ctaHref && (
            <Link
              href={automation.ctaHref}
              className="inline-flex items-center text-brand-green hover:text-brand-green/80 font-medium text-sm transition-colors"
            >
              {automation.ctaLabel}
              <ExternalLink className="ml-1 w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Carousel({ title, subtitle, items, autoplay = false }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      skipSnaps: false,
      dragFree: true
    },
    autoplay ? [Autoplay({ delay: 4000, stopOnInteraction: false })] : []
  );
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-white border border-gray-200 hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full bg-white border border-gray-200 hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((automation) => (
            <AutomationCard key={automation.id} automation={automation} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Automations() {
  return (
    <section id="automations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
            10 AI Automations That
            <span className="text-brand-green block">Transform Your Store</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From cart recovery to fraud protection, our AI handles the heavy lifting 
            so you can focus on growing your business.
          </p>
        </div>

        <Carousel
          title="Recover Lost Revenue"
          subtitle="Win back customers and capture missed opportunities"
          items={carouselA}
          autoplay={true}
        />
        
        <Carousel
          title="Optimize Performance"
          subtitle="Maximize efficiency and boost key metrics"
          items={carouselB}
        />
        
        <Carousel
          title="Protect Your Profits"
          subtitle="Shield your business from losses and fraud"
          items={carouselC}
        />
      </div>
    </section>
  );
}