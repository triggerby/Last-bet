import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-brand-green" />
            <span className="text-xl font-bold text-brand-dark">TriggerBy</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#automations" className="text-gray-600 hover:text-brand-green transition-colors">
              Automations
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-brand-green transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-brand-green transition-colors">
              Pricing
            </Link>
            <Link 
              href="#ai-overlay" 
              className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-green/90 transition-colors font-medium"
            >
              Get Free Audit
            </Link>
          </nav>
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}