'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import SpotlightCard from '@/components/SpotlightCard';
import MarqueeSkills from '@/components/MarqueeSkills';
import SkillIcon from '@/components/SkillIcons';
import ShinyText from '@/components/ShinyText';
import Silk from '@/components/Silk';
import Dither from '@/components/Dither';
import Image from 'next/image';
import LetterGlitch from '@/components/LetterGlitch';
import Aurora from '@/components/Aurora';
import SplitText from '@/components/SplitText';

interface Project {
  title: string;
  desc: string;
  full_description: string;
  pic_url: string;
  url: string;
}

export default function PortfolioPage() {
  const t = useTranslations();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(isDark);
  }, []);

  // Apply theme className and save to localStorage on change
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.theme = dark ? 'dark' : 'light';
  }, [dark]);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade-in modal when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      requestAnimationFrame(() => setShowModal(true));
    }
  }, [selectedProject]);

  // Load translated lists or fall back
  const projectList: Project[] = t.raw('projectList') || [];
  const skills: string[] = t.raw('skills') || [];

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
    <div className="min-h-screen text-foreground">
      {/* Animated Background Elements */}
      {/* Aurora background for Hero/Intro section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none h-full">
        <Aurora
          colorStops={['#5bc0be', '#6fffe9', '#3a506b', '#1c2541', '#0b132b']}
          blend={1}
          amplitude={0.5}
          speed={0.5}
        />
        {/* Aurora fade to black at the bottom */}
        <div
          className="absolute left-0 right-0 bottom-0 h-1/4 w-full pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 100%)',
            zIndex: 2,
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="intro"
          className="min-h-screen flex items-center justify-center px-6 pt-24 md:pt-0">
          <div className="text-center mx-auto">
            <div className="mb-8 animate-fade-in">
              <ShinyText text={t('greeting')} speed={3} className="text-2xl" />
              <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-16 my-10">
                <SplitText
                  text="Juan García Marín"
                  className="text-6xl sm:text-7xl md:text-9xl font-black text-center"
                  delay={60}
                  duration={2}
                  ease="expo.out"
                  splitType="words, chars"
                  from={{ opacity: 0, y: 80 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  textAlign="center"
                />
              </div>

              <ShinyText
                text={t('tagline')}
                speed={3}
                className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="https://github.com/j1-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md border border-black/10">
                <span className="flex items-center justify-center space-x-2 text-lg">
                  <span>{t('github')}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/juan-garcia-marin/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full border border-black/20 text-black dark:text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 bg-white dark:bg-black/80">
                <span className="flex items-center justify-center space-x-2 text-lg">
                  <span>{t('linkedin')}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </a>
            </div>

            {/* Skills Horizontal Scroll - full width, overlayed, does not affect centering */}
            <div className="relative w-full flex justify-center mt-8">
              <div className="absolute left-0 right-0 w-screen max-w-none -mx-[calc((100vw-100%)/2)]">
                <MarqueeSkills
                  items={skills.map((skill) => (
                    <SkillIcon key={skill} skill={skill} />
                  ))}
                  speed={60}
                  className="w-full"
                  style={{ minHeight: 56 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section with Dither background */}
        <section id="projects" className="py-24 px-6 relative">
          <div
            className="absolute left-0 right-0 top-0 h-1/4 w-full pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, #000 100%)',
              zIndex: 2,
            }}
          />
          {/* Dither background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Dither
              waveColor={[0.36, 0.75, 0.75]} // #5bc0be normalized (91,192,190)
              disableAnimation={false}
              enableMouseInteraction={false}
              mouseRadius={1}
              colorNum={5}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
            {/* Fade to black at the bottom for smooth transition to next section */}
            <div
              className="absolute left-0 right-0 bottom-0 h-1/4 w-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 100%)',
                zIndex: 2,
              }}
            />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white tracking-tight">
                {t('featuredProjects')}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                {t('projectCollection')}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectList.map((p, index) => (
                  <SpotlightCard
                    key={p.title}
                    className="cursor-pointer h-80 p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-[#0b132b]/40 dark:border-[#5bc0be]/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div
                      onClick={() => setSelectedProject(p)}
                      style={{ animationDelay: `${index * 150}ms` }}
                      className="flex flex-col justify-between h-full group w-full cursor-pointer">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#6fffe9] from-[#0b132b] via-[#3a506b] to-[#6fffe9] flex items-center justify-center mb-4">
                          <span className="text-background font-bold text-lg">
                            {p.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#1c2541] dark:text-[#5bc0be] tracking-tight">
                          {p.title}
                        </h3>
                        <p className="text-foreground text-base leading-relaxed mb-2">
                          {p.desc}
                        </p>
                      </div>
                      <div className="flex items-center text-[#0b132b] dark:text-[#5bc0be] font-semibold group-hover:underline transition-all duration-200 text-sm">
                        <span>{t('viewProject')}</span>
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                          →
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
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

        {/* Contact Section with LetterGlitch background */}
        <section id="contact" className="py-24 px-6 relative">
          {/* LetterGlitch background */}
          <div
            className="absolute left-0 right-0 top-0 h-1/4 w-full pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, #000 100%)',
              zIndex: 2,
            }}
          />
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
              glitchColors={[
                '#0b132b',
                '#1c2541',
                '#3a506b',
                '#5bc0be',
                '#6fffe9',
              ]}
            />
          </div>
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white tracking-tight">
                {t('getInTouch')}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300">
                {t('discuss')}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-md">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder:text-neutral-400 focus:border-black dark:focus:border-white focus:outline-none transition-all duration-300"
                    placeholder={t('fullName')}
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder:text-neutral-400 focus:border-black dark:focus:border-white focus:outline-none transition-all duration-300 resize-none"
                    placeholder={t('tellMe')}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-black text-white font-bold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
                {t('sendMessage')}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer with Silk background */}
      <footer className="relative z-10 py-12 px-6 border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 backdrop-blur-sm overflow-hidden">
        {/* Silk background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Silk
            speed={5}
            scale={1}
            color="#252521"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-neutral-600 dark:text-neutral-300">
            {t('footerText', { author: 'Juan García Marín' })}
          </p>
          <div className="mt-6 flex justify-center space-x-6">
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
