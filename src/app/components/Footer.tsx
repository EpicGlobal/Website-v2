import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';
import logo from '@/assets/89c6c6b033fa0f92c4e3c1a320826a96a86b5469.png';
import epicLogo from '@/assets/008bdb4c58b9b740867427493f73689a3f551b75.png';
import epicLogoDark from '@/assets/68e949a3afd2d5c92b966261b04168a3d4cfacfb.png';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  const getLogoForTheme = () => {
    if (theme === 'water') {
      return epicLogoDark.src;
    }

    return epicLogo.src;
  };

  return (
    <footer className="bg-black leaf:bg-sky-800 water:bg-lime-800 orange:bg-orange-900 border-t border-white/10 leaf:border-sky-600/20 water:border-lime-600/20 orange:border-orange-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center space-x-2.5 mb-4">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <img
                  src={logo.src}
                  alt="Epic Global Inc."
                  className="w-11 h-11 transition-transform group-hover:scale-105"
                />
                <img
                  src={getLogoForTheme()}
                  alt="Epic"
                  className="h-24 transition-transform group-hover:scale-105"
                />
              </Link>
            </div>
            <p className="text-gray-200 leaf:text-gray-100 text-sm max-w-md leading-relaxed mb-4">
              Epic Global Inc. is the world's first Zero-Risk Global Commerce Operator. We
              purchase inventory upfront, operate marketplace storefronts end to end, fund
              all advertising and logistics, and protect brand equity while you carry zero
              risk and zero operational burden.
            </p>
            <p className="text-cyan-300 leaf:text-sky-200 text-sm font-medium">
              We buy it. You profit.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/our-model" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Our Model
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/faq" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-200 hover:text-cyan-300 leaf:text-gray-100 leaf:hover:text-sky-200 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 leaf:border-sky-600/20">
          <p className="text-sm text-gray-300 leaf:text-gray-100 text-center">
            Copyright {currentYear} Epic Global Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
