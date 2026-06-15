import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Code2, Database, Github, GraduationCap, Layers, Mail, MapPin, Server, Sparkles } from 'lucide-react';
import './styles.css';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'REST APIs',
  'Responsive UI',
  'Git'
];

const services = [
  {
    icon: Code2,
    title: 'Frontend Development',
    copy: 'Responsive pages, reusable components, and polished interactions built with React.'
  },
  {
    icon: Server,
    title: 'Backend APIs',
    copy: 'Express routes for project data, validation, and production-ready server structure.'
  },
  {
    icon: Database,
    title: 'Database Design',
    copy: 'MongoDB project storage with a practical local fallback for development demos.'
  }
];

function App() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load projects');
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).slice(0, 2),
    [projects]
  );

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#home" aria-label="Portfolio home">
          <span>KP</span>
          Portfolio
        </a>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} />
            Full-stack developer portfolio
          </p>
          <h1>Hi, I am Kusuma. I build clean web apps with practical backend systems.</h1>
          <p>
            This portfolio showcases projects, skills, and a working API connected to database-backed
            project data.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View projects
              <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href="mailto:kusuma@example.com">
              <Mail size={18} />
              Contact me
            </a>
          </div>
        </div>
        <div className="profile-panel" aria-label="Profile summary">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
            alt="Laptop workspace showing web development"
          />
          <div>
            <strong>Available for internships and projects</strong>
            <span>
              <MapPin size={15} />
              India
            </span>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Portfolio highlights">
        <div>
          <strong>{projects.length || '3'}+</strong>
          <span>Projects</span>
        </div>
        <div>
          <strong>10</strong>
          <span>Core skills</span>
        </div>
        <div>
          <strong>Full</strong>
          <span>Stack setup</span>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">
            <Layers size={16} />
            Selected work
          </p>
          <h2>Projects connected through the Express API</h2>
        </div>

        {status === 'loading' && <p className="state-text">Loading projects...</p>}
        {status === 'error' && <p className="state-text">Start the backend to load project cards.</p>}

        <div className="project-grid">
          {(featuredProjects.length ? featuredProjects : projects).map((project) => (
            <article className="project-card" key={project._id || project.id || project.title}>
              <img src={project.imageUrl} alt="" />
              <div className="project-content">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.techStack.map((tech) => (
                    <small key={tech}>{tech}</small>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl || '#'}>Live</a>
                  <a href={project.repoUrl || '#'}>
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="skills">
        <div className="section-heading">
          <p className="eyebrow">
            <GraduationCap size={16} />
            Skills
          </p>
          <h2>Built for the expected full-stack workflow</h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section service-band">
        {services.map(({ icon: Icon, title, copy }) => (
          <article key={title}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="eyebrow">
            <Mail size={16} />
            Contact
          </p>
          <h2>Let us build something useful.</h2>
          <p>Replace the email and links with your real details before deployment.</p>
        </div>
        <a className="button primary" href="mailto:kusuma@example.com">
          Send email
          <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
