import Link from 'next/link';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Demo', href: '/demo' },
      { name: 'API', href: '/api-docs' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Status', href: '/status' },
      { name: 'Community', href: '/community' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'SEBI Disclaimer', href: '/sebi-disclaimer' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/rirsofficial', icon: '𝕏' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/rirs', icon: 'in' },
    { name: 'YouTube', href: 'https://youtube.com/@rirs', icon: '▶' },
    { name: 'GitHub', href: 'https://github.com/rirs', icon: '⚡' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">RIRS</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Professional SaaS platform protecting retail investors from unnecessary losses, 
              risky trades, and emotional mistakes. Built for the Indian stock market.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 RIRS. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              <span className="inline-flex items-center">
                Made with ❤️ for smarter investing
              </span>
            </div>
          </div>
          
          {/* SEBI Disclaimer */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>SEBI Disclaimer:</strong> RIRS is not a SEBI registered investment advisor. 
              We provide risk analysis and educational content only. All investment decisions should 
              be made after consulting with qualified financial advisors. Past performance does not 
              guarantee future results. Investments in securities market are subject to market risks. 
              Please read all related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};