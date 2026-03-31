import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_DATA } from '@/constants';
import { X, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof PERSONAL_DATA.projects[0] | null>(null);

  return (
    <div className="pt-20">
      {/* Skills Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-20">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PERSONAL_DATA.skills.map((skill, index) => (
              <div 
                key={index}
                className="p-8 border border-line rounded-xl hover:border-ink transition-colors group"
              >
                <span className="text-sm uppercase tracking-widest text-muted group-hover:text-ink transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-20">Selected Projects</h2>
          
          <div className="grid grid-cols-1 gap-32">
            {PERSONAL_DATA.projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div 
                    className="overflow-hidden rounded-2xl aspect-[4/3] bg-line cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-xs uppercase tracking-widest text-muted mb-4 block">
                    {project.category}
                  </span>
                  <h3 className="text-4xl font-serif italic mb-6">{project.title}</h3>
                  <p className="text-lg text-muted leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-sm uppercase tracking-widest border-b border-muted pb-2 hover:border-ink transition-all"
                  >
                    View Project Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-line w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg/50 backdrop-blur-md flex items-center justify-center hover:bg-bg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted mb-2 block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-4xl font-serif italic">{selectedProject.title}</h2>
                  </div>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-muted transition-colors"
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>
                </div>
                
                <p className="text-lg text-muted leading-relaxed mb-12">
                  {selectedProject.description}
                  <br /><br />
                  This project involved extensive research into user behavior and performance optimization. 
                  The final solution delivered a 40% increase in user engagement and significantly reduced load times across all devices.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'Tailwind', 'Motion'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-line rounded-full text-xs uppercase tracking-widest text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
