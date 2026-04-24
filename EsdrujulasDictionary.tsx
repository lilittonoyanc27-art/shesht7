import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Volume2, 
  GraduationCap, 
  Home, 
  HeartPulse, 
  Leaf, 
  Mic2, 
  Apple, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// --- Data ---

const THEORY = [
  {
    title: "1. Agudas",
    desc: "Շեշտը վերջին վանկի վրա է, եթե վերջանում է բաղաձայնով (բացի n, s):"
  },
  {
    title: "2. Llanas",
    desc: "Շեշտը նախավերջին վանկի վրա է, եթե վերջանում է ձայնավորով կամ n, s:"
  },
  {
    title: "3. Esdrújulas",
    desc: "Շեշտը վերջից երրորդ վանկի վրա է: Միշտ ունեն գրավոր շեշտ (tilde):"
  }
];

const DICTIONARY = [
  {
    category: "Educación",
    icon: <GraduationCap size={24} />,
    color: "bg-red-500",
    words: [
      { es: "Bolígrafo", pr: "բո-լի-գրա-ֆո", hy: "Գրիչ" },
      { es: "Lápices", pr: "լա-պի-սես", hy: "Մատիտներ" },
      { es: "Página", pr: "պա-խի-նա", hy: "Էջ" },
      { es: "Gramática", pr: "գրա-մա-տի-կա", hy: "Քերականություն" },
      { es: "Matemáticas", pr: "մա-տե-մա-տի-կաս", hy: "Մաթեմատիկա" },
      { es: "Informática", pr: "ին-ֆոր-մա-տի-կա", hy: "Ինֆորմատիկա" }
    ]
  },
  {
    category: "Casa y Vida",
    icon: <Home size={24} />,
    color: "bg-orange-500",
    words: [
      { es: "Lámpara", pr: "լամ-պա-րա", hy: "Լամպ" },
      { es: "Cámara", pr: "կա-մա-րա", hy: "Տեսախցիկ" },
      { es: "Sábana", pr: "սա-բա-նա", hy: "Սավան" },
      { es: "Película", pr: "պե-լի-կու-լա", hy: "Ֆիլմ" },
      { es: "Rápido", pr: "ռա-պի-դո", hy: "Արագ" },
      { es: "Último", pr: "ուլ-տի-մո", hy: "Վերջին" }
    ]
  },
  {
    category: "Salud",
    icon: <HeartPulse size={24} />,
    color: "bg-pink-500",
    words: [
      { es: "Médico", pr: "մե-դի-կո", hy: "Բժիշկ" },
      { es: "Estómago", pr: "էս-տո-մա-գո", hy: "Ստամոքս" },
      { es: "Hígado", pr: "ի-գա-դո", hy: "Լյարդ" },
      { es: "Músculo", pr: "մուս-կու-լո", hy: "Մկան" }
    ]
  },
  {
    category: "Naturaleza",
    icon: <Leaf size={24} />,
    color: "bg-emerald-500",
    words: [
      { es: "Océano", pr: "օ-սե-ա-նո", hy: "Օվկիանոս" },
      { es: "América", pr: "ա-մե-րի-կա", hy: "Ամերիկա" },
      { es: "África", pr: "ա-ֆրի-կա", hy: "Աֆրիկա" },
      { es: "Ecológico", pr: "է-կո-լո-խի-կո", hy: "Էկոլոգիական / Բնական" },
      { es: "Árboles", pr: "ար-բո-լես", hy: "Ծառեր" },
      { es: "Hipopótamo", pr: "ի-պո-պո-տա-մո", hy: "Գետաձի" },
      { es: "Águila", pr: "ա-գի-լա", hy: "Արծիվ" },
      { es: "Relámpago", pr: "ռե-լամ-պա-գո", hy: "Կայծակ" }
    ]
  },
  {
    category: "Tecnología",
    icon: <Mic2 size={24} />,
    color: "bg-blue-500",
    words: [
      { es: "Micrófono", pr: "մի-կրո-ֆո-նո", hy: "Միկրոֆոն" },
      { es: "Brújula", pr: "բրու-խու-լա", hy: "Կողմնացույց" },
      { es: "Prismáticos", pr: "պրիս-մա-տի-կոս", hy: "Հեռադիտակ" },
      { es: "Semáforo", pr: "սե-մա-ֆո-ռո", hy: "Լուսակիր" },
      { es: "Plástico", pr: "պլաս-տի-կո", hy: "Պլաստիկ" },
      { es: "Teléfono", pr: "տե-լե-ֆո-նո", hy: "Հեռախոս" }
    ]
  },
  {
    category: "Comida y Otros",
    icon: <Apple size={24} />,
    color: "bg-yellow-500",
    words: [
      { es: "Plátano", pr: "պլա-տա-նո", hy: "Բանան" },
      { es: "Brócoli", pr: "բրո-կո-լի", hy: "Բրոկոլի" },
      { es: "Rábano", pr: "ռա-բա-նո", hy: "Բողկ" },
      { es: "Música", pr: "մու-սի-կա", hy: "Երաժշտություն" },
      { es: "Clásica", pr: "կլա-սի-կա", hy: "Դասական" },
      { es: "Número", pr: "նու-մե-րո", hy: "Համար" },
      { es: "Sábado", pr: "սա-բա-դո", hy: "Շաբաթ օր" },
      { es: "Pájaro", pr: "պա-խա-րո", hy: "Թռչուն" },
      { es: "Fantástico", pr: "ֆան-տաս-տի-կո", hy: "Հիանալի" }
    ]
  }
];

// --- Utilities ---

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Components ---

export default function EsdrujulasDictionary() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-pink-200">
      
      {/* Header with Background Pattern */}
      <header className="relative bg-red-600 text-white overflow-hidden pt-16 pb-24 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-20%] left-[10%] w-80 h-80 bg-pink-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-6 text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/10 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={14} className="text-yellow-300" />
            La Acentuación: Regla 3
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none drop-shadow-2xl">
            Diccionario de <br /><span className="text-yellow-300">Esdrújulas</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg font-bold italic opacity-90">
            Այս խմբի բոլոր բառերը պարտադիր ունեն գրավոր շեշտ:
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-16">
        
        {/* Theory Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {THEORY.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-3xl shadow-xl border-b-8 transition-transform hover:scale-105 ${
                i === 0 ? 'bg-red-50 border-red-200' : 
                i === 1 ? 'bg-orange-50 border-orange-200' : 
                'bg-yellow-50 border-yellow-200 ring-4 ring-yellow-400/30'
              }`}
            >
              <h3 className={`text-xl font-black uppercase mb-2 ${
                i === 0 ? 'text-red-600' : 
                i === 1 ? 'text-orange-600' : 
                'text-yellow-600'
              }`}>{t.title}</h3>
              <p className="text-sm font-bold text-stone-700 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {DICTIONARY.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap shadow-lg ${
                activeCategory === i 
                  ? 'bg-stone-900 text-white scale-105 z-10' 
                  : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-100'
              }`}
            >
              {cat.icon}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Word Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          >
            {DICTIONARY[activeCategory].words.map((word, i) => (
              <motion.div
                key={word.es}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => speak(word.es)}
                className="group relative bg-white p-8 rounded-[40px] shadow-2xl border-2 border-stone-50 hover:border-pink-200 cursor-pointer transition-all hover:translate-y-[-8px]"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-full -translate-x-4 translate-y-4 opacity-10 ${DICTIONARY[activeCategory].color}`} />
                
                <div className="flex justify-between items-start mb-6">
                   <h4 className="text-4xl font-black italic uppercase tracking-tighter text-stone-900">
                     {word.es}
                   </h4>
                   <Volume2 size={20} className="text-stone-300 group-hover:text-pink-500 transition-colors" />
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Pronunciación</p>
                      <p className="text-lg font-bold text-stone-600 italic">{word.pr}</p>
                   </div>
                   <div className="h-px bg-stone-100 w-full" />
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Հայերեն</p>
                      <p className="text-xl font-black text-stone-800">{word.hy}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 py-12 px-6">
         <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center opacity-30">
            <Book size={32} />
            <p className="text-[10px] font-black uppercase tracking-[1em]">Diccionario Ilustrado v1.5</p>
         </div>
      </footer>
    </div>
  );
}
