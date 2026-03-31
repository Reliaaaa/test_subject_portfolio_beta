import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif italic tracking-tight">
          VL<span className="text-muted">.</span>
        </Link>

        <nav className="flex items-cente`r gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors hover:text-ink",
                location.pathname === item.path ? "text-ink font-medium" : "text-muted"
              )}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="h-px bg-ink mt-1"
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
