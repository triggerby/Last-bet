'use client';

import { useState, useEffect } from 'react';
import { X, Bot, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function AiOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true);
        setIsOpen(true);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#ai-overlay') {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // Check if hash is already present on load
    if (window.location.hash === '#ai-overlay') {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [hasScrolled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, url }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit audit request');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear hash from URL
    if (window.location.hash === '#ai-overlay') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass rounded-3xl max-w-md w-full p-8 relative animate-slide-up">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/agent/agent.jpg"
                  alt="TriggerBy AI Agent"
                  fill
                  className="rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                TriggerBy AI Agent for Shopify
              </h3>
              <p className="text-gray-600">
                Get a transparent AI audit of your store. Receive a personalized 
                diagnostic report in 30 minutes showing exactly which automations 
                will drive the biggest revenue impact.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Shopify Store URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="https://yourstore.myshopify.com"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  'Analyzing Store...'
                ) : (
                  <>
                    Get Free AI Audit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              ✓ Free forever • ✓ No spam • ✓ Unsubscribe anytime
            </div>
          </>
        ) : (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-dark mb-2">
              Audit Request Received!
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI is analyzing your store right now. You'll receive a detailed 
              diagnostic report at <strong>{email}</strong> within 30 minutes.
            </p>
            <button
              onClick={closeModal}
              className="bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}