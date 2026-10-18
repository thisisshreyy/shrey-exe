import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, AudioLines, Code2, Command, Github, Globe2, MoveUpRight, Radio, Scan, Terminal, Volume2, X } from 'lucide-react'
import type { Mesh } from 'three'

const destinations = [
  { number: '01', title: 'THE WORKSHOP', subtitle: 'Code / Systems / Experiments', icon: Code2, tag: 'UNDER CONSTRUCTION', color: 'lime' },
  { number: '02', title: 'THE SOUND LAB', subtitle: 'Music / Audio / Frequencies', icon: AudioLines, tag: 'IN THE MAKING', color: 'violet' },
  { number: '03', title: 'THE VOID', subtitle: '3D / Visuals / Oddities', icon: Scan, tag: 'ENTER AT YOUR OWN RISK', color: 'blue' },
  { number: '04', title: 'THE HUMAN', subtitle: 'A little about the operator', icon: Radio, tag: 'CLASSIFIED-ish', color: 'orange' },
]

function Orb() {
  const outer = useRef<Mesh>(null)
  const inner = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.x += delta * 0.12
      outer.current.rotation.y += delta * 0.2
      outer.current.rotation.z = state.pointer.x * 0.18
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.3
      inner.current.rotation.x = state.pointer.y * 0.2
    }
  })

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.65}>
        <mesh ref={outer}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial color="#b9ff39" wireframe roughness={0.25} metalness={0.6} />
        </mesh>
        <mesh ref={inner} scale={0.68}>
          <icosahedronGeometry args={[1.2, 3]} />
          <MeshDistortMaterial color="#a5ff21" emissive="#234400" emissiveIntensity={0.6} roughness={0.22} metalness={0.7} distort={0.28} speed={2.2} />
        </mesh>
        <mesh scale={2.02}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#b9ff39" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
      <Sparkles count={48} scale={5.4} size={2.2} speed={0.35} color="#b9ff39" />
    </group>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.8], fov: 40 }} dpr={[1, 1.7]}>
      <ambientLight intensity={0.75} />
      <pointLight position={[3, 3, 4]} intensity={22} color="#c9ff75" />
      <pointLight position={[-3, -2, 2]} intensity={8} color="#6540a6" />
      <Orb />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.45} />
    </Canvas>
  )
}

function App() {
  const [soundOn, setSoundOn] = useState(false)
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="site-shell">
      <div className="noise" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="SHREY.EXE home"><span className="wordmark-mark">S<span>/</span></span><span>SHREY<span className="wordmark-dot">.EXE</span></span></a>
        <div className="top-status"><span className="status-light" /> SYSTEM ONLINE <span className="status-divider">/</span> BUILD 001</div>
        <div className="top-actions">
          <button className="icon-button sound-button" onClick={() => setSoundOn(!soundOn)} aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}><Volume2 size={16} /><span>{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={18} /> : <Command size={18} />}<span>MENU</span></button>
        </div>
      </header>

      {menuOpen && <motion.nav className="menu-overlay" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><span className="eyebrow">QUICK ACCESS / 00—04</span>{['top', 'rooms', 'signal'].map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i}</span>{id === 'top' ? 'HOME' : id === 'rooms' ? 'EXPLORE THE ROOMS' : 'FIND ME OUT THERE'}<MoveUpRight size={18} /></a>)}</motion.nav>}

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <motion.div className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}><span className="tiny-square" /> PERSONAL DIGITAL PLAYGROUND <span className="eyebrow-index">[ MH—IND ]</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}>NOT BUILT<br />TO <span className="outline-word">FIT IN.</span></motion.h1>
          <motion.div className="hero-subline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <span className="subline-bar" />
            <p><strong>Developer by skill.</strong><br /><strong className="lime-text">Artist by personality.</strong></p>
          </motion.div>
          <motion.a className="explore-link" href="#rooms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}><span className="explore-icon"><ArrowDownRight size={17} /></span><span>SCROLL TO EXPLORE</span><span className="explore-rule" /></motion.a>
        </div>

        <motion.div className="orb-stage" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.3 }}>
          <div className="orb-label orb-label-top"><span>FIG. 001</span><span>UNSTABLE OBJECT</span></div>
          <div className="orb-canvas"><Scene /></div>
          <div className="orb-crosshair crosshair-a">+</div><div className="orb-crosshair crosshair-b">+</div>
          <div className="orb-readout"><span className="readout-line" /><span>RENDERING REALITY_</span><span className="readout-value">98.4%</span></div>
          <div className="orb-coordinate">18°31' N<br />73°51' E</div>
        </motion.div>

        <div className="hero-bottomline"><span>INDEPENDENT MIND. OPEN SOURCE HEART.</span><span className="hero-bottom-center"><span className="status-light" /> ALL SYSTEMS NOMINAL</span><span>SCROLL / DON'T SLEEP <ArrowDownRight size={13} /></span></div>
        <div className="vertical-label">PORTFOLIO / PERSONALITY / PLAY</div>
      </section>

      <section className="manifesto">
        <div className="manifesto-index eyebrow">[ A NOTE FROM THE OPERATOR ]</div>
        <p>I like making things that <span className="muted-word">work</span>, things that <span className="lime-text">feel</span>, and things that make people ask <span className="italic-word">“wait, how did you do that?”</span></p>
        <span className="manifesto-signature">— SHREY, PROBABLY OVERTHINKING SOMETHING</span>
      </section>

      <section className="rooms-section" id="rooms">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="tiny-square" /> CHOOSE YOUR OWN ADVENTURE</span><h2>FOUR DOORS.<br /><span className="muted-word">NO BORING ONES.</span></h2></div>
          <p className="section-aside">This isn't a résumé.<br />It's a collection of rabbit holes.<br /><span className="lime-text">Pick one. Get lost.</span></p>
        </div>
        <div className="room-grid">
          {destinations.map((room) => {
            const Icon = room.icon
            return <motion.button key={room.number} className={`room-card ${room.color} ${activeRoom === room.number ? 'room-card-active' : ''}`} onClick={() => setActiveRoom(activeRoom === room.number ? null : room.number)} whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }}>
              <div className="room-card-top"><span className="room-number">/{room.number}</span><Icon className="room-icon" size={21} strokeWidth={1.5} /><span className="room-arrow"><ArrowUpRight size={18} /></span></div>
              <div className="room-card-main"><h3>{room.title}</h3><p>{room.subtitle}</p></div>
              <div className="room-card-bottom"><span className="room-tag"><span className="tag-dot" />{room.tag}</span><span className="room-open">{activeRoom === room.number ? 'CLOSE' : 'OPEN'} <ArrowUpRight size={12} /></span></div>
              {activeRoom === room.number && <motion.div className="room-expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><p>{room.number === '01' ? 'A workbench for code, hardware, and ideas that refuse to stay ideas.' : room.number === '02' ? 'Little loops, big feelings, late nights, and experiments in sound.' : room.number === '03' ? 'A sandbox for spatial experiments, strange visuals, and digital objects.' : 'The person behind the pixels: curious, ambitious, and always making something.'}</p><span>MORE SIGNAL COMING SOON <ArrowUpRight size={12} /></span></motion.div>}
            </motion.button>
          })}
        </div>
      </section>

      <section className="signal-section" id="signal">
        <div className="signal-left"><span className="eyebrow"><span className="tiny-square" /> ESTABLISH A CONNECTION</span><h2>GOT A<br /><span className="outline-word">WEIRD</span><br />IDEA?</h2></div>
        <div className="signal-right"><p>Good. The normal ones are taken.</p><a className="contact-link" href="https://github.com/thisisshreyy" target="_blank" rel="noreferrer"><span className="contact-icon"><Github size={19} /></span><span><small>FIND ME ON</small>GITHUB</span><ArrowUpRight size={20} /></a><a className="contact-link" href="mailto:hello@shrey.exe"><span className="contact-icon"><Globe2 size={19} /></span><span><small>OR SEND A SIGNAL</small>LET'S TALK</span><ArrowUpRight size={20} /></a><div className="signal-note"><Terminal size={14} /><span>OPEN TO COLLABS, EXPERIMENTS & UNUSUAL QUESTIONS.</span></div></div>
      </section>

      <footer className="footer"><a className="footer-logo" href="#top">SHREY<span>.EXE</span></a><span>MADE WITH INTENT, NOT A TEMPLATE.</span><span>© 2026 / END OF TRANSMISSION <ArrowUpRight size={12} /></span></footer>
    </main>
  )
}

export default App
