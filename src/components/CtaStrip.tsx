import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CtaStrip() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-green to-emerald-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-8 sm:p-12 text-white">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Limited Time: Free AI Audit
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to 10X Your Shopify Revenue?
          </h2>
          
          <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Get a personalized AI audit of your store and discover exactly which 
            automations will drive the biggest impact for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#ai-overlay"
              className="group bg-white text-brand-green px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              Get Your Free Audit Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="text-white/80 text-sm">
              ✓ 30-minute turnaround • ✓ No commitment required • ✓ Actionable insights
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}