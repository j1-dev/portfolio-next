import React, { FC } from 'react';
import {
  SiTypescript,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSpring,
  SiPostgresql,
  SiMysql,
  SiDocker,
} from 'react-icons/si';
import { FaJava, FaCubes } from 'react-icons/fa';

const skillIconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  TypeScript: { icon: <SiTypescript color="#3178c6" />, color: '#3178c6' },
  Angular: { icon: <SiAngular color="#dd0031" />, color: '#dd0031' },
  React: { icon: <SiReact color="#61dafb" />, color: '#61dafb' },
  'Next.js': { icon: <SiNextdotjs color="#000" />, color: '#000' },
  TailwindCSS: { icon: <SiTailwindcss color="#38bdf8" />, color: '#38bdf8' },
  Java: { icon: <FaJava color="#ea2d2e" />, color: '#ea2d2e' },
  Spring: { icon: <SiSpring color="#6db33f" />, color: '#6db33f' },
  PostgreSQL: { icon: <SiPostgresql color="#336791" />, color: '#336791' },
  MySQL: { icon: <SiMysql color="#00758f" />, color: '#00758f' },
  Docker: { icon: <SiDocker color="#2496ed" />, color: '#2496ed' },
  Microservicesz: { icon: <FaCubes color="#f59e42" />, color: '#f59e42' },
};

export const SkillIcon: FC<{ skill: string }> = ({ skill }) => {
  // Map 'Spring Framework' to 'Spring' for display
  const displaySkill = skill === 'Spring Framework' ? 'Spring' : skill;
  const entry = skillIconMap[displaySkill] || {
    icon: <FaCubes color="#888" />,
    color: '#888',
  };
  return (
    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black dark:bg-neutral-900 dark:text-white border border-black/10 shadow-sm text-sm font-medium hover:scale-105 transition-all duration-300 animate-fade-in whitespace-nowrap">
      <span className="text-xl">{entry.icon}</span>
      <span>{displaySkill}</span>
    </span>
  );
};

export default SkillIcon;
