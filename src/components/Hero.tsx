'use client';

import { ArrowRight, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Shopify Automations
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-brand-dark mb-6 text-balance">
            Turn Your Shopify Store Into an
            <span className="text-brand-green block mt-2">AI Revenue Machine</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto text-balance">
            Deploy 10 proven AI automations that recover lost revenue, optimize performance, 
            and protect your profits while you sleep.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="#ai-overlay"
              className="group bg-brand-green text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-green/90 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              Get Free AI Audit
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#automations"
              className="group bg-white text-brand-dark px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-brand-green transition-all duration-300 flex items-center"
            >
              View Automations
              <TrendingUp className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
          
          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-brand-green rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm">500+ stores automated</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-brand-green mr-2" />
              <span className="text-sm">Average 23% revenue increase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}