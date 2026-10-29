import {  useEffect, useRef, useState } from "react";
import {  useFrame } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera, Stars, useProgress, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  Anchor,  ArrowRight, Award, BriefcaseBusiness, CheckCircle2,
  Download, ExternalLink, Globe2, HardHat, Leaf, Mail, MapPin, Menu,
  Phone, ShieldCheck, Ship, X, Cog, GraduationCap, Waves, Send
} from "lucide-react";
import * as THREE from "three";

const resumePath = "/MOHAMMED-FAZIL-RESUME.pdf";

const experiences = [
  { date: "SEP 2024 — PRESENT", role: "Senior QHSE Executive", company: "Galileo Ship Management Pvt. Ltd.", vessel: "VM Marine Group · Shore-based", bullets: ["Coordinate internal and external QHSE, ISM, ISPS and client audits.", "Maintain integrated QHSE management system documentation.", "Monitor vessel reports, inspections, drills and regulatory compliance.", "Track corrective actions and support effective audit close-out."] },
  { date: "APR 2023 — APR 2024", role: "Marine Executive", company: "Hadi Al Hammam Marine Service", vessel: "HADI 27", bullets: ["Supported marine operations and onboard safety procedures.", "Monitored operational practices and compliance requirements."] },
  { date: "OCT 2021 — NOV 2022", role: "Marine Executive", company: "Hadi Al Hammam Marine Service", vessel: "HADI 49", bullets: ["Supported vessel operations and maintenance activities.", "Followed marine safety and operational requirements."] },
  { date: "SEP 2019 — MAR 2021", role: "Trainee Marine Engineer", company: "Hadi Al Hammam Marine Service", vessel: "HADI 49", bullets: ["Assisted with engine-room operations and maintenance.", "Supported safe and efficient vessel operations."] },
  { date: "DEC 2017 — SEP 2018", role: "Trainee Marine Engineer", company: "Mid Sea Shipping Co. LLC", vessel: "M.V. Minnath", bullets: ["Assisted with machinery monitoring and maintenance."] },
  { date: "JAN 2017 — OCT 2017", role: "Oiler", company: "Mid Sea Shipping Co. LLC", vessel: "M.V. Minnath", bullets: ["Supported engine-room activities and routine machinery care."] },
];

const skills = [
  ["Marine Engineering", 90], ["QHSE Management", 90], ["Risk Assessment", 85],
  ["Safety Audits", 85], ["Incident Investigation", 80], ["Environmental Compliance", 80],
] as const;

const certifications = [
  { icon: ShieldCheck, title: "NEBOSH IGC", text: "International General Certificate in Occupational Health and Safety" },
  { icon: Award, title: "Internal Auditor", text: "ISM / ISPS / MLC for Shipping Companies · DNV Academy, 2026" },
  { icon: Ship, title: "STCW", text: "Basic Safety Training" },
  { icon: HardHat, title: "Tanker Training", text: "Chemical / Oil Tanker Cargo Operations" },
  { icon: CheckCircle2, title: "Engineering Watch", text: "Certificate of Rating · Regulation III/4" },
];

const education = [
  ["B.Tech Marine Engineering", "Indian Maritime University", "2016", "72.65%"],
  ["Diploma in Mechanical Engineering", "Jeeva's Polytechnic College, Tamil Nadu", "2013", "79%"],
  ["Higher Secondary · 12th", "Jaycee Higher Secondary School", "2011", "64%"],
  ["SSLC · 10th", "Jaycee Higher Secondary School", "2009", "73%"],
];

function ShipModel() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.75) * 0.12;
    }
  });
  return (
    <group ref={group} rotation={[0, -0.25, 0]} position={[0, -0.1, 0]} scale={1.15}>
      {/* stylized 3D ship silhouette built from Three.js meshes */}
      <mesh position={[0, -0.18, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.55, 1.12]} />
        <meshStandardMaterial color="#07182c" metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0.15, -0.42, 0]}>
        <boxGeometry args={[3.0, 0.18, 1.0]} />
        <meshStandardMaterial color="#c46b3c" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[-0.95, 0.22, 0]}>
        <boxGeometry args={[0.82, 0.72, 0.72]} />
        <meshStandardMaterial color="#e8edf1" metalness={0.2} roughness={0.42} />
      </mesh>
      <mesh position={[-1.0, 0.68, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.55]} />
        <meshStandardMaterial color="#f2bd61" emissive="#8c5b1b" emissiveIntensity={0.5} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[-0.95 + i * 0.42, 0.22, 0]}>
          <boxGeometry args={[0.28, 0.55 + (i % 2) * 0.15, 0.78]} />
          <meshStandardMaterial color={i % 2 ? "#e6a34d" : "#c77b3c"} metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[-1.0, 1.12, 0]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial color="#dce5ee" metalness={0.65} />
      </mesh>
      <mesh position={[-1.0, 1.45, 0]}>
        <boxGeometry args={[0.52, 0.06, 0.06]} />
        <meshStandardMaterial color="#dce5ee" metalness={0.65} />
      </mesh>
      <mesh position={[-1.0, 1.72, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#dce5ee" metalness={0.65} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`light-${i}`} position={[-1.0 + i * 0.27, 0.18, 0.405]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#ffd58a" emissive="#ffb747" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}





function SectionTitle({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return <div className={`section-title ${dark ? "section-title-light" : ""}`}><span>{eyebrow}</span><h2>{title}</h2></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const nav = [["Home", "#home"], ["About", "#about"], ["Experience", "#experience"], ["Skills", "#skills"], ["Certifications", "#certifications"], ["Contact", "#contact"]];
const [activeSection, setActiveSection] = useState("home");

const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const recipient = "mohammedfazil165@gmail.com";

  const subject = encodeURIComponent(
    `Portfolio enquiry`
  );

  const body = encodeURIComponent(
    `Name: ${form.name}\n` +
    `Email: ${form.email}\n\n` +
    `${form.message}`
  );

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${recipient}` +
    `&su=${subject}` +
    `&body=${body}`;

  window.open(gmailUrl, "_blank", "noopener,noreferrer");

};
useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].target.id);
      }
    },
    {
      rootMargin: "-100px 0px -55% 0px",
      threshold: [0, 0.1, 0.3, 0.5],
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);
  return (
    <main>
      <header className="topbar">
        <a href="#home" className="logo-lockup"><span className="logo-mark">MF</span><span><small>MARINE · QHSE · SAFETY</small></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          {nav.map(([label, href]) => {
  const sectionId = href.replace("#", "");

  return (
    <a
      key={href}
      href={href}
      className={activeSection === sectionId ? "active" : ""}
      aria-current={activeSection === sectionId ? "location" : undefined}
      onClick={() => {
        setActiveSection(sectionId);
        setMenuOpen(false);
      }}
    >
      {label}
    </a>
  );
})}
          <a className="nav-cta" href={resumePath} download><Download size={15} /> Download CV</a>
        </nav>
      </header>

      <section id="home" className="hero">

        <div className="hero-glow" />
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
           
            <h1>MOHAMMED <em>FAZIL. M </em></h1>
            <p className="hero-name">SENIOR QHSE EXECUTIVE</p>
            <p className="hero-description">Marine operations, quality management, risk assessment and environmental protection — built around one principle: every crew member returns home safely.</p>
            <div className="hero-buttons">
              <a href="#about" className="btn btn-gold">Explore my profile <ArrowRight size={17} /></a>
              <a href="#contact" className="btn btn-ghost">Let's connect <Mail size={16} /></a>
            </div>
            <div className="hero-points">
              <div><Anchor /><span>Marine<br />operations</span></div>
              <div><ShieldCheck /><span>QHSE &<br />compliance</span></div>
              <div><Leaf /><span>Environmental<br />protection</span></div>
            </div>
          </motion.div>
        </div>
        
      </section>

      <section id="about" className="section about-section">
        <div className="about-layout">
         <motion.div
  className="about-visual"
  initial={{ opacity: 0, x: -25 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
>
  <div className="visual-frame">
    <img
      src="/about%20me.avif"
      alt="Offshore sea barge and marine operations"
      className="about-barge-image"
    />

  </div>

  
</motion.div>
          <div className="about-text">
            <SectionTitle eyebrow="ABOUT ME" title="A career built around safety, precision & the sea." />
            <p>Senior QHSE Executive with seagoing experience and shore-based QHSE exposure across marine operations, vessel inspections, auditing, risk assessment and regulatory compliance. Focused on continual improvement, safe working environments and effective integrated management systems.</p>
            <div className="about-facts">
              <div><span className="fact-icon"><BriefcaseBusiness /></span><span><b>Marine experience</b><small>Seagoing + shore-based roles</small></span></div>
              <div><span className="fact-icon"><Globe2 /></span><span><b>Compliance focus</b><small>ISM · ISPS · ISO frameworks</small></span></div>
              <div><span className="fact-icon"><MapPin /></span><span><b>Based in India</b><small>Open to relocation</small></span></div>
              <div><span className="fact-icon"><Mail /></span><span><b>Direct contact</b><small>Professional enquiries welcome</small></span></div>
            </div>
          </div>
        </div>
       
      </section>

      <section id="experience" className="section experience-section">
        <div className="section-head-row"><SectionTitle eyebrow="CAREER JOURNEY" title="Experience at every level." dark /><p>From engine-room operations to shore-based QHSE leadership, each role adds a stronger perspective on safety at sea.</p></div>
        <div className="experience-list">
          {experiences.map((job, i) => <motion.article className="experience-item" key={job.date + job.role} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <div className="experience-index"></div>
            <div className="experience-date">{job.date}</div>
            <div className="experience-main"><h3>{job.role}</h3><p className="company">{job.company}</p><p className="vessel">{job.vessel}</p><ul>{job.bullets.map(b => <li key={b}>{b}</li>)}</ul></div>

          </motion.article>)}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section-head-row"><SectionTitle eyebrow="CORE COMPETENCIES" title="Skills that keep operations moving." /></div>
        <div className="skills-layout">
          <div className="skill-cards">
            {[
              { icon: Cog, title: "Marine Engineering", text: "Machinery, maintenance & vessel operations" },
              { icon: ShieldCheck, title: "QHSE Management", text: "Integrated systems & compliance" },
              { icon: CheckCircle2, title: "Risk Assessment", text: "Hazard identification & mitigation" },
              { icon: Leaf, title: "Environmental", text: "Pollution prevention & good practice" },
              { icon: BriefcaseBusiness, title: "Audits & Inspections", text: "NCR/CAR tracking and close-out" },
              { icon: UsersIcon, title: "Team Coordination", text: "Induction, reporting & collaboration" },
            ].map(item => { const Icon = item.icon; return <motion.div className="skill-tile" key={item.title} whileHover={{ y: -5 }}><Icon /><h3>{item.title}</h3><p>{item.text}</p></motion.div>; })}
          </div>
          <div className="skill-levels"><div className="skill-level-heading"><span>PROFESSIONAL TOOLKIT</span><span>FOCUS AREAS</span></div>{skills.map(([name, level]) => <div className="level-row" key={name}><div><span>{name}</span><small>{level}%</small></div><div className="level-track"><span style={{ width: `${level}%` }} /></div></div>)}</div>
        </div>
      </section>

      <section id="education" className="section education-section">
        <div className="section-head-row"><SectionTitle eyebrow="ACADEMIC BACKGROUND" title="Education & qualifications." /></div>
        <div className="education-grid">{education.map((item, i) => <article className="education-card" key={item[0]}><div className="education-top"><GraduationCap /></div><h3>{item[0]}</h3><p>{item[1]}</p><div className="education-bottom"><span>{item[2]}</span><b>{item[3]}</b></div></article>)}</div>
      </section>

      <section id="certifications" className="section certification-section">
        <div className="section-head-row"><SectionTitle eyebrow="PROFESSIONAL DEVELOPMENT" title="Training & certifications." /></div>
        <div className="cert-grid">{certifications.map((cert, i) => { const Icon = cert.icon; return <motion.article className="cert-card" key={cert.title} whileHover={{ y: -5 }}><div className="cert-card-top"><Icon /></div><h3>{cert.title}</h3><p>{cert.text}</p><div className="cert-card-line" /></motion.article>; })}</div>
        </section>
      <section id="contact" className="contact-section">
        <div className="contact-orb orb-one" /><div className="contact-orb orb-two" />
        <div className="contact-layout">
          <div className="contact-copy"><SectionTitle eyebrow="GET IN TOUCH" title="Let's make safer seas." dark /><p>For professional opportunities and collaboration in marine engineering, QHSE and safety management, feel free to get in touch.</p><a href="mailto:mohammedfazil165@gmail.com"><Mail />mohammedfazil165@gmail.com</a><a href="tel:+919894045707"><Phone />+91 98940 45707</a><span><MapPin />India · Open to relocation</span><a className="contact-download" href={resumePath} download><Download size={17} /> Download full resume <ExternalLink size={14} /></a></div>
          <form className="contact-form" onSubmit={sendMessage}><div className="form-top"><span>CONTACT FORM</span><Send size={18} /></div><h3>Send a message</h3><p>I'll be glad to hear from you.</p><label htmlFor="name">Your name</label><input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" required /><label htmlFor="email">Email address</label><input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required /><label htmlFor="message">Message</label><textarea id="message" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the opportunity..." required /><button className="btn btn-gold" type="submit">Prepare email <ArrowRight size={16} /></button><small>This form opens your email app. It does not send directly from the website.</small></form>
        </div>
        <footer className="footer"><a href="#home" className="footer-logo">MF <span>MARINE · QHSE</span></a><span>© {new Date().getFullYear()} Mohammed Fazil. Built for safer operations.</span><a href="#home">Back to top ↑</a></footer>
      </section>
    </main>
  );
}

function UsersIcon(props: React.ComponentProps<typeof UsersFallback>) {
  return <UsersFallback {...props} />;
}
function UsersFallback(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}