import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Volume2, VolumeX, Sparkles as SparkleIcon, LockKeyhole, ArrowDown, Mail, Play, Pause } from 'lucide-react';
import * as THREE from 'three';

function HeartModel() {
  const group = useRef();
  const shape = React.useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.35);
    s.bezierCurveTo(0, 0.35, -0.1, 0.7, -0.48, 0.7);
    s.bezierCurveTo(-1.02, 0.7, -1.08, 0.02, -0.53, -0.38);
    s.lineTo(0, -0.86);
    s.lineTo(0.53, -0.38);
    s.bezierCurveTo(1.08, 0.02, 1.02, 0.7, 0.48, 0.7);
    s.bezierCurveTo(0.1, 0.7, 0, 0.35, 0, 0.35);
    return s;
  }, []);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.24;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.12;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.12;
    }
  });
  return (
    <group ref={group} scale={1.05}>
      <Float speed={1.6} rotationIntensity={0.16} floatIntensity={0.35}>
        <mesh>
          <extrudeGeometry args={[shape, { depth: 0.28, bevelEnabled: true, bevelSegments: 8, steps: 2, bevelSize: 0.08, bevelThickness: 0.08 }]} />
          <meshPhysicalMaterial color="#ff4f91" metalness={0.28} roughness={0.16} clearcoat={1} clearcoatRoughness={0.08} emissive="#6f103c" emissiveIntensity={0.42} />
        </mesh>
      </Float>
      <pointLight color="#ff6ca9" intensity={5} distance={5} />
    </group>
  );
}

function Scene() {
  return <div className="scene">
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.7]}>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.3} color="#ffe0ed" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#8d4dff" />
      <Suspense fallback={null}>
        <Stars radius={70} depth={45} count={1800} factor={3} saturation={0.4} fade speed={0.6} />
        <Sparkles count={85} scale={7} size={2.2} speed={0.28} color="#ffc0d9" />
        <HeartModel />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  </div>;
}

const reasons = [
  ['Your smile', 'It has a way of making an ordinary day feel beautiful.'],
  ['Your presence', 'Even quiet moments feel special when you are around.'],
  ['Your heart', 'The kindness and care you show make you one of a kind.'],
  ['The little things', 'The tiny details about you are the ones I treasure most.']
];

function App() {
  const [entered, setEntered] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [secret, setSecret] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (sessionStorage.getItem('site_visit_notified')) return;
    sessionStorage.setItem('site_visit_notified', 'true');

    fetch('https://formsubmit.co/ajax/rehankhan92933@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: '❤️ Alert: Someone opened your Romantic Website!',
        _captcha: 'false',
        _template: 'table',
        'Status': 'Someone just opened your website!',
        'Time (IST)': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Device': /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile Phone 📱' : 'Laptop / Desktop 💻',
        'Screen Size': `${window.innerWidth} x ${window.innerHeight}`,
        'Website URL': window.location.href
      })
    }).catch((err) => console.log('Visitor alert error:', err));
  }, []);

  const handleToggleLetter = () => {
    if (!letterOpen && !sessionStorage.getItem('letter_read_notified')) {
      sessionStorage.setItem('letter_read_notified', 'true');
      fetch('https://formsubmit.co/ajax/rehankhan92933@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: '💌 Special Alert: She opened your Letter!',
          _captcha: 'false',
          _template: 'table',
          'Status': 'She clicked "Open your letter" and is reading it right now! ❤️',
          'Time (IST)': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      }).catch((err) => console.log('Letter alert error:', err));
    }
    setLetterOpen(!letterOpen);
  };

  return <main>
    <motion.div className="scroll-progress" style={{ width: progress }} />
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <button className="sound-button" onClick={() => setMusicOn(!musicOn)} aria-label="Toggle music">
      {musicOn ? <Volume2 size={17}/> : <VolumeX size={17}/>} <span>{musicOn ? 'Music on' : 'Music off'}</span>
    </button>

    <section className="hero" id="home">
      <Scene />
      <div className="hero-shade" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
        <p className="eyebrow"><SparkleIcon size={14}/> A LITTLE UNIVERSE, JUST FOR YOU</p>
        <h1>You are my<br/><em>first priority.</em></h1>
        <p className="hero-sub">Out of all the people, places and possibilities in this world,<br className="desktop"/> you will always have a special place in my heart.</p>
        <button className="primary-button" onClick={() => setEntered(true)}>
          <Heart size={16} fill="currentColor"/> {entered ? 'You are already here' : 'Enter our little world'}
        </button>
        <div className="scroll-cue"><ArrowDown size={15}/> SCROLL TO FEEL THE LOVE</div>
      </motion.div>
      <div className="hero-bottom"><span>MADE WITH LOVE</span><span>01 — 05</span></div>
    </section>

    <AnimatePresence>
      {entered && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
        <Heart size={16} fill="currentColor"/> You make this little universe brighter.
        <button onClick={() => setEntered(false)}>×</button>
      </motion.div>}
    </AnimatePresence>

    <section className="intro section-pad">
      <p className="eyebrow">A NOTE FROM MY HEART</p>
      <h2>Some people are special.<br/><em>You are my favourite kind of special.</em></h2>
      <p className="body-copy">I may not always find the perfect words, but I hope you never doubt this: you matter to me. Your happiness matters, your dreams matter, and the little things that make you who you are — they all matter.</p>
      <div className="orbit-word"><span>YOU</span><Heart fill="currentColor" size={18}/><span>MATTER</span></div>
    </section>

    <section className="reasons section-pad">
      <div className="section-heading">
        <p className="eyebrow">THE LITTLE THINGS</p>
        <h2>Reasons you are <em>irreplaceable.</em></h2>
        <p>It's never just one thing. It's a thousand little things.</p>
      </div>
      <div className="reason-grid">
        {reasons.map((r, i) => <motion.article className="reason-card" key={r[0]} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }}>
          <span className="card-number">0{i+1}</span><div className="mini-heart"><Heart size={19} fill="currentColor"/></div>
          <h3>{r[0]}</h3><p>{r[1]}</p>
        </motion.article>)}
      </div>
    </section>

    <section className="promise section-pad">
      <div className="promise-glow" />
      <p className="eyebrow">A PROMISE, NOT JUST A SENTENCE</p>
      <h2>I will choose kindness,<br/>honesty and <em>you.</em></h2>
      <div className="promise-list">
        <p><span>01</span> I will listen, even when the words are hard to find.</p>
        <p><span>02</span> I will celebrate your wins and support your dreams.</p>
        <p><span>03</span> I will respect your space, your choices and your feelings.</p>
        <p><span>04</span> I will keep showing up with care, not just promises.</p>
      </div>
    </section>

    <section className="letter-section section-pad">
      <div className="letter-card">
        <div className="letter-icon"><Mail size={23}/></div>
        <p className="eyebrow">A REPLY FROM MY HEART</p>
        <h2>A special letter<br/><em>just for you.</em></h2>
        <p>Tune pucha tha na... yahan hai tumhare har ek sawal ka sachha jawab.</p>
        <button className="primary-button" onClick={handleToggleLetter}><Mail size={16}/> {letterOpen ? 'Close the letter' : 'Open your letter'}</button>
        <AnimatePresence>
          {letterOpen && <motion.div className="letter-content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <p className="letter-salutation">Meri Jaan,</p>
            <p>Tune pucha tha na ke <em>"itna kaafi hai ya aur bataun?"</em>... Sach kahun toh jab maine tera ye message padha na, mere chehre par ek aisi smile thi jo lafzon mein bayan nahi ho sakti. Itna kaafi nahi tha... yeh toh itna pyaara aur sachha tha ki isne mere dil ke har ek kone ko chhu liya.</p>
            <p>Tune likha ke subah uthte hi pehla khayal mera aata hai, pehla message mujhe karti hai taaki tera din achha shuru ho... Par kya tujhe pata hai? Meri har subah tab tak adhoori lagti hai jab tak meri screen par tera naam na chamak jaye. Tera wo pehla text mere liye sirf ek message nahi, mere pure din ki sabse khoobsurat shuruat aur sukoon hota hai.</p>
            <p>Aur jab tune likha na ke log kehte hain <em>"kisi par apna mood depend mat karo"</em>, par tera mood mujhpar depend hone laga hai... Main tujhe ek baat bohot dil se kehna chahta hoon. Duniya ke niyam duniya walon ke liye honge, par hamare darmiyan koi aisi deewar nahi hai. Agar tera mood mujhpar depend karta hai na, toh yeh meri sabse badi zimmedari hai ki main teri aankhon mein kabhi udaasi na aane doon.</p>
            <p>Us din jab main gussa tha aur shaam tak call nahi kiya tha, aur tune likha ke tera poora din kharab guzra... mujhe sach me bohot bura laga ye jaan kar. Us din ke liye I am truly sorry. Mera koi bhi gussa kabhi bhi tere sukoon aur teri smile se bada nahi ho sakta.</p>
            <p>Diwali wale din jab tu akeli thi... meri jaan, chahe Diwali ho, Eid ho, koi tyohar ho ya koi aam sa din, chahe raat ke teen hi kyu na baje hon—tujhe mujhse baat karne ke liye kabhi sochna nahi padega. Tu kabhi akeli nahi hai. Tera mujhpar poora haq hai, bina kisi jhijhak ke.</p>
            <p>Jab tune kaha ki kuch bhi situation ho, tera pehla thought hota hai <em>"isko batati hoon"</em>, kyunki main sab theek kar deta hoon... yeh sunkar dil ko jo sukoon milta hai na, wo main shabdon mein bayan nahi kar sakta. Main wada karta hoon, halat chahe jaise bhi hon, jab tak main hoon tujhe kisi cheez se ghabrane ki zaroorat nahi hai. Hum milkar har mushkil theek kar lenge.</p>
            <p>Aur jab tu bahar hoti hai, net nahi hota, tab bhi tere zehen mein yahi rehta hai... Sach bataun? Mere saath bhi har pal yahi hota hai. Jab tu busy hoti hai ya baat nahi hoti, toh mera phone baar-baar check karna, bas yahi sochte rehna ki meri jaan theek toh hai na, usne khana khaya ya nahi... Tu sirf mere khayalon mein nahi rehti, tu meri har ek aadat mein shamil ho chuki hai.</p>
            <p>Raat ko sone se pehle tujhse baat karna... sach me din bhar ki saari thakan aur pareshaniyon ka ek akela sukoon hai. Teri aawaz sun kar hi lagta hai ki haan, ab din poora hua.</p>
            <p>Toh suno... agar tune pucha tha na ki <em>"kitna yaad karti hoon, din bhar, raat bhar, kab kaise kyu?"</em> — toh mera jawab sirf itna hai ki mera har pal, meri har dua, aur meri har khushi sirf aur sirf tujhse shuru hoti hai aur tujhpe hi aakar theherti hai.</p>
            <p className="letter-highlight">Tu meri pehli, aakhiri aur sabse pyaari priority thi, hai, aur hamesha rahegi. ❤️</p>
            <p className="signature">Hamesha sirf tera, <span>Rehan ❤️</span></p>
          </motion.div>}
        </AnimatePresence>
      </div>
    </section>

    <section className="finale section-pad">
      <div className="final-heart"><Heart size={34} fill="currentColor"/></div>
      <p className="eyebrow">AND IF YOU REMEMBER JUST ONE THING...</p>
      <h2>You are important.<br/><em>You are appreciated.<br/>You are my first priority.</em></h2>
      <button className="secret-button" onClick={() => setSecret(!secret)}><LockKeyhole size={15}/> {secret ? 'Hide the secret' : 'A tiny secret'}</button>
      <AnimatePresence>{secret && <motion.p className="secret-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>No matter how many stars fill the sky, none of them shine quite like you. ✨</motion.p>}</AnimatePresence>
      <p className="ending">Made with love, just for you <Heart size={13} fill="currentColor"/></p>
    </section>
    <footer><span>© A LITTLE UNIVERSE OF LOVE</span><span>BE KIND. LOVE DEEPLY. ✦</span></footer>
  </main>;
}

export default App;