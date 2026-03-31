import { motion } from 'motion/react';
import { PERSONAL_DATA } from '@/constants';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted mb-6 block">
            Available for freelance
          </span>
          <h1 className="text-6xl md:text-8xl font-serif italic leading-[1.1] mb-8">
            {PERSONAL_DATA.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mb-12 font-light leading-relaxed">
            {PERSONAL_DATA.role}
          </p>
          <Link 
            to="/portfolio"
            className="group flex items-center gap-4 text-sm uppercase tracking-widest font-medium"
          >
            View Work 
            <span className="w-12 h-px bg-muted group-hover:w-20 group-hover:bg-ink transition-all duration-500" />
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-12">About Me</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              {PERSONAL_DATA.about}
            </p>
          </motion.div>
          
          <div className="flex flex-col justify-end">
            <div className="aspect-[4/5] bg-line overflow-hidden rounded-2xl">
              <img 
                src="https://picsum.photos/seed/portrait/800/1000" 
                alt="Portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 border-t border-line bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-20">Experience</h2>
          
          <div className="space-y-12">
            {PERSONAL_DATA.experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 pb-12 border-b border-line last:border-0"
              >
                <div>
                  <span className="text-sm text-muted font-mono">{exp.period}</span>
                  <h3 className="text-xl font-medium mt-2">{exp.company}</h3>
                </div>
                <div>
                  <h4 className="text-lg font-serif italic mb-4">{exp.role}</h4>
                  <p className="text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
