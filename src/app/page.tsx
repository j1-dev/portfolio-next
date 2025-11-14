'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Project {
  title: string;
  desc: string;
  full_description: string;
  pic_url: string;
  url: string;
}

interface CTAButton {
  title: string;
  url: string;
}

export default function PortfolioPage() {
  const t = useTranslations();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const ctaButtons: CTAButton[] = [
    { title: 'Github', url: 'https://github.com/j1-dev' },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/juan-garcia-marin' },
  ];

  // Fade-in modal when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      requestAnimationFrame(() => setShowModal(true));
    }
  }, [selectedProject]);

  // Load translated lists or fall back
  const projectList: Project[] = t.raw('projectList') || [];

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Record<string, string>;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (json.success) {
        alert('Message sent!');
        form.reset();
      } else {
        alert('Error: ' + json.error);
      }
    } catch {
      alert('Error sending message');
    }
  };

  return (
    <div className="min-h-screen text-foreground bg-blue-700 overflow-hidden">
      <main className="relative z-10 2xl:w-7/12 lg:w-10/12 px-5 mx-auto pt-3">
        {/* <div className="w-full h-[50px] bg-white mx-auto" /> */}
        <Navbar />
        <div className="w-full h-[3px] bg-white mx-auto mt-2 rounded-full" />
        <section className="flex flex-col md:flex-row items-center justify-center md:justify-between px-6 relative w-full md:gap-0">
          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <div className="my-8">
              <p className="text-2xl max-w-3xl mx-auto md:mx-0">
                {t('greeting')}
              </p>
              <p className="text-5xl font-black underline">Juan García Marín</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row gap-4 justify-center md:justify-start mb-2 xs:mb-0">
              {ctaButtons.map((cta) => (
                <a
                  key={cta.title}
                  href={cta.url}
                  className="group px-8 py-4 rounded-2xl text-white font-semibold ">
                  <span className="flex items-center justify-center space-x-2 text-lg">
                    <span>{cta.title}</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* SVG and Image */}
          <div className="flex-shrink-0">
            <div className="relative w-[250px] h-[250px]">
              <svg
                viewBox="0 0 100 100"
                className="absolute top-0 left-0 w-full h-full origin-center">
                <defs>
                  <path
                    id="circle"
                    d="
                    M 50, 50
                    m -35, 0
                    a 35,35 0 1,1 70,0
                    a 35,35 0 1,1 -70,0
                    "
                  />
                </defs>
                <text>
                  <textPath href="#circle">{t('tagline')}</textPath>
                </text>
              </svg>
              <Image
                src={'/me.webp'}
                height={150}
                width={150}
                alt="yo"
                className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </section>

        <div className="w-full h-[3px] bg-white mx-auto rounded-full " />

        <section id="projects" className="px-6 pt-8 relative">
          <div className="w-full mx-auto relative z-10 ">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-1">
                {t('featuredProjects')}
              </h2>
              <span className="max-w-2xl mx-auto">
                {t('projectCollection')}
              </span>
            </div>

            <div>
              {projectList.map((p, index) => (
                <div key={p.title} className="cursor-pointer py-6 border-white">
                  <div
                    onClick={() => setSelectedProject(p)}
                    style={{ animationDelay: `${index * 150}ms` }}
                    className="flex flex-col justify-between h-full group w-full cursor-pointer border-l-2 rounded-2xl">
                    <div>
                      <div className="flex gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-2">
                          <span className="font-bold text-lg text-blue-700">
                            {p.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mt-[10px]">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-foreground text-base leading-relaxed mb-1 pl-6">
                        {p.desc}
                      </p>
                    </div>
                    <div className="flex items-center text-white font-semibold group-hover:underline transition-all duration-200 text-sm pl-6 pb-1">
                      <span>{t('viewProject')}</span>
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Modal */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
                  showModal ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={closeModal}
              />
              <div
                className={`bg-white dark:bg-neutral-900 p-8 rounded-3xl max-w-4xl w-full shadow-2xl relative transform transition-all duration-300 border border-black/10 dark:border-white/10 ${
                  showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-xl font-bold transition-colors duration-300">
                  ✕
                </button>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={selectedProject.pic_url}
                        alt={selectedProject.title}
                        width="1000"
                        height="1000"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-black dark:text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-base text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                      {selectedProject.full_description}
                    </p>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 w-fit">
                      <span>{t('visitProject')}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="w-full h-[3px] bg-white mx-auto rounded-full my-6" />

        <section id="contact" className="p-6 relative">
          <div className="w-full mx-auto relative z-10">
            <div className="mb-2">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white tracking-tight">
                {t('getInTouch')}
              </h2>
              <p>{t('discuss')}</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 px-6 py-2 rounded-3xl">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-1">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-blue-800 border-black/10 px-4 py-4 rounded-xl border focus:outline-none transition-all duration-300"
                    placeholder={t('fullName')}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold mb-1">
                    {t('message')}
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    maxLength={1000}
                    required
                    className="w-full bg-blue-800 border-black/10 px-4 py-4 rounded-xl border focus:outline-none transition-all duration-300 h-40 resize-none"
                    placeholder={t('tellMe')}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-blue-700 font-bold text-lg transition-all duration-300">
                {t('sendMessage')}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-6 px-6 border-t border-black/10 dark:border-white/10 bg-blue-800 backdrop-blur-sm overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-neutral-600 dark:text-neutral-300">
            {t('footerText', { author: 'Juan García Marín' })}
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a
              href="https://github.com/j1-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:underline transition-colors duration-200">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/juan-garcia-marin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:underline transition-colors duration-200">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
