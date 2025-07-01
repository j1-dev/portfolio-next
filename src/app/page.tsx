'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { TiltCard } from '@/components/TiltCard';
import ShinyText from '@/components/ShinyText';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import Silk from '@/components/Silk';
import Image from 'next/image';

interface Project {
  title: string;
  desc: string;
  full_description: string;
  pic_url: string;
  url: string;
}

export default function PortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
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

  const changeLanguage = (lng: string) => {
    const newLocale = lng === 'en' ? 'en' : 'es';
    router.push(`/${newLocale}`);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 text-foreground">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-gradient-to-r from-orange-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <Silk
          speed={5}
          scale={1}
          color="#252521"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Enhanced Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50'
            : 'bg-transparent'
        }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#intro" className="group flex items-center space-x-3">
            <div className="relative">
              <Image
                src={'/j1.png'}
                width={48}
                height={48}
                className="rounded-full ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300"
                alt="Juan García"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Juan García
            </span>
          </a>

          <ul className="hidden md:flex items-center space-x-8">
            {['home', 'projects', 'contact'].map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium group">
                  {t(key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={
                  locale === 'en'
                    ? '/JUAN_GARCIA_MARIN_CV_2025_ENGLISH_V2.pdf'
                    : '/JUAN_GARCIA_MARIN_CV_2025_ESPAÑOL_V2.pdf'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('downloadCV')}
              </a>
            </li>
          </ul>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-xl">
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => changeLanguage(locale === 'en' ? 'es' : 'en')}
              className="px-4 py-2 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 font-semibold transition-all duration-300">
              {locale.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="intro"
          className="min-h-screen flex items-center justify-center px-6 pt-32">
          <div className="text-center mx-auto">
            <div className="mb-8 animate-fade-in">
              <ShinyText text={t('greeting')} speed={3} className="text-2xl" />
              <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-16 my-10">
                <ProfileCard
                  name="Juan García"
                  title="Software Engineer"
                  handle="j1-dev"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/me.png"
                  grainUrl="/grain.webp"
                  iconUrl="/pattern.png"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => console.log('Contact clicked')}
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
                className="group px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                <span className="flex items-center justify-center space-x-2">
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
                className="group px-8 py-4 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center justify-center space-x-2">
                  <span>{t('linkedin')}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </a>
            </div>

            {/* Skills Grid */}
            <div className="w-full flex justify-center">
              <div className="flex flex-wrap justify-center items-center gap-3 max-w-5xl">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex-shrink-0 px-4 py-3 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      minWidth: 'fit-content',
                    }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                {t('featuredProjects')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {t('projectCollection')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectList.map((p, index) => (
                <TiltCard key={p.title} options={{ max: 15, speed: 400 }}>
                  <div
                    onClick={() => setSelectedProject(p)}
                    className="group cursor-pointer h-80 p-8 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">
                            {p.title.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {p.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 flex-grow leading-relaxed">
                        {p.desc}
                      </p>

                      <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        <span>{t('viewProject')}</span>
                        <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Enhanced Modal */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
                  showModal ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={closeModal}
              />
              <div
                className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-8 rounded-3xl max-w-4xl w-full shadow-2xl relative transform transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 ${
                  showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xl font-bold transition-colors duration-300">
                  ✕
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={selectedProject.pic_url}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>

                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                      {selectedProject.title}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                      {selectedProject.full_description}
                    </p>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-fit">
                      <span>{t('visitProject')}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                {t('getInTouch')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {t('discuss')}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300"
                    placeholder={t('fullName')}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 resize-none"
                    placeholder={t('tellMe')}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('sendMessage')}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400">
            {t('footerText', { author: 'Juan García Marín' })}
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="https://github.com/j1-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-500 transition-colors duration-300">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/juan-garcia-marin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-500 transition-colors duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
