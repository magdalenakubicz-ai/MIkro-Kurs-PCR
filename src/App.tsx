/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  RotateCcw,
  Dna,
  Thermometer,
  Zap,
  GraduationCap,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- Types ---

type ModuleType = 'knowledge' | 'quiz' | 'matching' | 'exam';

interface Module {
  id: number;
  title: string;
  type: ModuleType;
  content: React.ReactNode;
  infographic: React.ReactNode;
  plainText: string;
}

// --- Accessibility Components ---

const SpeechButton = ({ text }: { text: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <button
      onClick={speak}
      aria-label={isSpeaking ? "Zatrzymaj odczytywanie" : "Odsłuchaj lekcję"}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border-2 ${
        isSpeaking 
          ? 'bg-rose-100 border-rose-300 text-rose-700 hover:bg-rose-200' 
          : 'bg-indigo-100 border-indigo-300 text-indigo-700 hover:bg-indigo-200'
      }`}
    >
      {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
      <span>{isSpeaking ? 'Zatrzymaj' : 'Odsłuchaj lekcję'}</span>
    </button>
  );
};

// --- Components for Infographics ---

const DenaturationVisual = () => {
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-700">
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-400 uppercase tracking-wider">Symulacja: Denaturacja (95°C)</div>
      <div className="flex flex-col gap-8">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-64 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-64 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              x: (i - 5) * 40,
              y: [20, -20, 20]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "linear"
            }}
            className="absolute w-1 h-8 bg-yellow-400/30 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

const AnnealingVisual = () => {
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-slate-700 gap-12">
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-400 uppercase tracking-wider">Symulacja: Annealing (55°C)</div>
      
      <div className="relative w-64 h-2 bg-blue-400/30 rounded-full">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 20, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute -top-6 w-16 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
        />
      </div>

      <div className="relative w-64 h-2 bg-blue-400/30 rounded-full">
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: -20, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute -bottom-6 right-0 w-16 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
        />
      </div>
    </div>
  );
};

const ElongationVisual = () => {
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-slate-700 gap-16">
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-400 uppercase tracking-wider">Symulacja: Elongacja (72°C)</div>
      
      <div className="relative w-64 h-2 bg-blue-400/20 rounded-full">
        <div className="absolute left-0 w-16 h-2 bg-emerald-400 rounded-full" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute left-16 h-2 bg-emerald-400/60 rounded-full"
        />
        <motion.div
          animate={{ x: [0, 200, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-4 left-16 w-8 h-8 bg-purple-500 rounded-full blur-sm opacity-50"
        />
      </div>

      <div className="relative w-64 h-2 bg-blue-400/20 rounded-full">
        <div className="absolute right-0 w-16 h-2 bg-emerald-400 rounded-full" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-16 h-2 bg-emerald-400/60 rounded-full flex justify-end"
        />
        <motion.div
          animate={{ x: [0, -200, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-4 right-16 w-8 h-8 bg-purple-500 rounded-full blur-sm opacity-50"
        />
      </div>
    </div>
  );
};

// --- Matching Game Component ---

interface MatchingPair {
  id: string;
  term: string;
  definition: string;
}

const MatchingGame = ({ onComplete }: { onComplete: () => void }) => {
  const initialPairs: MatchingPair[] = [
    { id: '1', term: 'Denaturacja', definition: 'Rozdzielenie dwuniciowego DNA na pojedyncze nici w wysokiej temperaturze (95°C).' },
    { id: '2', term: 'Annealing', definition: 'Proces przyłączania starterów do komplementarnych sekwencji matrycy (55°C).' },
    { id: '3', term: 'Elongacja', definition: 'Wydłużanie nowej nici DNA przez polimerazę Taq (72°C).' },
    { id: '4', term: 'Startery', definition: 'Krótkie fragmenty kwasu nukleinowego inicjujące syntezę nowej nici.' },
  ];

  const [terms, setTerms] = useState<{ id: string; text: string }[]>([]);
  const [definitions, setDefinitions] = useState<{ id: string; text: string }[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [correctIds, setCorrectIds] = useState<string[]>([]);
  const [errorIds, setErrorIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setTerms([...initialPairs].map(p => ({ id: p.id, text: p.term })).sort(() => Math.random() - 0.5));
    setDefinitions([...initialPairs].map(p => ({ id: p.id, text: p.definition })).sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (selectedTerm && selectedDef) {
      if (selectedTerm === selectedDef) {
        // Correct match
        setCorrectIds([selectedTerm]);
        setTimeout(() => {
          setMatchedIds(prev => [...prev, selectedTerm]);
          setCorrectIds([]);
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 600);
      } else {
        // Incorrect match
        setErrorIds([selectedTerm, selectedDef]);
        setTimeout(() => {
          setErrorIds([]);
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 800);
      }
    }
  }, [selectedTerm, selectedDef]);

  useEffect(() => {
    if (matchedIds.length === initialPairs.length && initialPairs.length > 0) {
      setTimeout(() => {
        setIsFinished(true);
        onComplete();
      }, 400);
    }
  }, [matchedIds]);

  if (isFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 bg-emerald-50 border-2 border-emerald-200 rounded-3xl space-y-4"
      >
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-emerald-800">Świetna robota!</h3>
        <p className="text-emerald-700 italic">"Wiedza molekularna opanowana. Wszystkie pary zostały poprawnie zidentyfikowane."</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pojęcia</h4>
        <AnimatePresence>
          {terms.filter(t => !matchedIds.includes(t.id)).map(t => (
            <motion.button
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: errorIds.includes(t.id) ? [-4, 4, -4, 4, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.5, backgroundColor: '#10b981' }}
              onClick={() => !errorIds.length && !correctIds.length && setSelectedTerm(t.id)}
              className={`w-full p-5 text-left text-lg font-bold rounded-xl border-2 transition-all ${
                correctIds.includes(t.id)
                  ? 'border-emerald-700 bg-emerald-600 text-white'
                  : selectedTerm === t.id 
                    ? 'border-indigo-700 bg-indigo-100 text-indigo-900' 
                    : errorIds.includes(t.id)
                      ? 'border-rose-700 bg-rose-100 text-rose-900'
                      : 'border-slate-300 bg-white hover:border-slate-500 shadow-sm'
              }`}
            >
              {t.text}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Definicje</h4>
        <AnimatePresence>
          {definitions.filter(d => !matchedIds.includes(d.id)).map(d => (
            <motion.button
              key={d.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: errorIds.includes(d.id) ? [-4, 4, -4, 4, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.5, backgroundColor: '#10b981' }}
              onClick={() => !errorIds.length && !correctIds.length && setSelectedDef(d.id)}
              className={`w-full p-5 text-left text-base leading-relaxed font-medium rounded-xl border-2 transition-all ${
                correctIds.includes(d.id)
                  ? 'border-emerald-700 bg-emerald-600 text-white'
                  : selectedDef === d.id 
                    ? 'border-indigo-700 bg-indigo-100 text-indigo-900' 
                    : errorIds.includes(d.id)
                      ? 'border-rose-700 bg-rose-100 text-rose-900'
                      : 'border-slate-300 bg-white hover:border-slate-500 shadow-sm'
              }`}
            >
              {d.text}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Final Exam Component ---
const FinalExam = ({ userName, onComplete }: { userName: string, onComplete: (score: number) => void }) => {
  const questions = [
    {
      id: 1,
      question: "Który z poniższych składników NIE jest niezbędny do przeprowadzenia standardowej reakcji PCR?",
      options: [
        { id: 'a', text: 'Matryca DNA', correct: false },
        { id: 'b', text: 'Polimeraza RNA', correct: true },
        { id: 'c', text: 'Startery (primery)', correct: false },
        { id: 'd', text: 'Nukleotydy (dNTPs)', correct: false }
      ]
    },
    {
      id: 2,
      question: "Wskaż poprawną kolejność etapów w jednym cyklu PCR:",
      options: [
        { id: 'a', text: 'Annealing -> Denaturacja -> Elongacja', correct: false },
        { id: 'b', text: 'Denaturacja -> Elongacja -> Annealing', correct: false },
        { id: 'c', text: 'Denaturacja -> Annealing -> Elongacja', correct: true },
        { id: 'd', text: 'Elongacja -> Denaturacja -> Annealing', correct: false }
      ]
    },
    {
      id: 3,
      question: "Które z poniższych zdań najlepiej parafrazuje (oddaje sens innymi słowami) proces elongacji?",
      options: [
        { id: 'a', text: 'To moment, w którym wysoka temperatura niszczy strukturę DNA, aby umożliwić dostęp enzymom.', correct: false },
        { id: 'b', text: 'To etap, podczas którego enzym buduje nową kopię DNA, wykorzystując starter jako punkt startowy i matrycę jako wzór.', correct: true },
        { id: 'c', text: 'To proces, w którym krótkie fragmenty DNA szukają swoich par na rozdzielonych niciach matrycy.', correct: false },
        { id: 'd', text: 'To końcowe schłodzenie próbki w celu stabilizacji nowo powstałych cząsteczek.', correct: false }
      ]
    },
    {
      id: 4,
      question: "Dlaczego temperatura annealingu musi być niższa niż temperatura denaturacji?",
      options: [
        { id: 'a', text: 'Aby zapobiec degradacji polimerazy', correct: false },
        { id: 'b', text: 'Aby umożliwić ponowne połączenie się całych nici matrycy', correct: false },
        { id: 'c', text: 'Aby umożliwić starterom utworzenie wiązań wodorowych z matrycą', correct: true },
        { id: 'd', text: 'Aby aktywować dNTPs', correct: false }
      ]
    },
    {
      id: 5,
      question: "Co dzieje się z liczbą kopii docelowego DNA po każdym cyklu PCR (w idealnych warunkach)?",
      options: [
        { id: 'a', text: 'Zwiększa się liniowo', correct: false },
        { id: 'b', text: 'Pozostaje bez zmian', correct: false },
        { id: 'c', text: 'Zwiększa się wykładniczo (podwaja się)', correct: true },
        { id: 'd', text: 'Zmniejsza się o połowę', correct: false }
      ]
    }
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, optId: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Proszę odpowiedzieć na wszystkie pytania przed zakończeniem.");
      return;
    }
    
    let score = 0;
    questions.forEach(q => {
      const selectedOpt = q.options.find(o => o.id === answers[q.id]);
      if (selectedOpt?.correct) score++;
    });
    
    setSubmitted(true);
    onComplete(score);
  };

  return (
    <div className="space-y-10">
      <div className="p-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl text-lg text-indigo-900 font-medium italic">
        "To Twój ostateczny sprawdzian, {userName}. Skupienie i precyzja to cechy dobrego biologa."
      </div>
      
      <div className="space-y-12">
        {questions.map((q, idx) => (
          <div key={q.id} className="space-y-6">
            <h4 className="text-xl font-bold text-slate-900 flex gap-4">
              <span className="text-indigo-700">{idx + 1}.</span>
              {q.question}
            </h4>
            <div className="grid gap-4">
              {q.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(q.id, opt.id)}
                  disabled={submitted}
                  className={`p-5 text-left text-lg rounded-xl border-2 transition-all ${
                    answers[q.id] === opt.id 
                      ? 'border-indigo-700 bg-indigo-100 text-indigo-900 font-bold' 
                      : 'border-slate-300 hover:border-slate-500 bg-white'
                  } ${submitted && opt.correct ? 'ring-4 ring-emerald-600 bg-emerald-50' : ''} 
                    ${submitted && answers[q.id] === opt.id && !opt.correct ? 'ring-4 ring-rose-600 bg-rose-50' : ''}`}
                >
                  <span className="font-bold mr-2">{opt.id.toUpperCase()}.</span> {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          Zakończ i sprawdź wyniki
        </button>
      )}
    </div>
  );
};

// --- Certificate Component ---
const Certificate = ({ userName, date }: { userName: string, date: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-1 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-200 rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="bg-white p-8 md:p-12 rounded-[1.4rem] border-8 border-double border-amber-100 flex flex-col items-center text-center space-y-8">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-amber-400 rounded-tl-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-amber-400 rounded-br-3xl opacity-20" />
        
        <div className="space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-amber-50 rounded-full text-amber-700">
              <GraduationCap size={48} />
            </div>
          </div>
          <h2 className="text-sm font-bold text-amber-800 uppercase tracking-[0.3em]">Certyfikat Ukończenia Kursu</h2>
          <p className="text-slate-600 text-xs uppercase tracking-widest">Akademia Biologii Molekularnej</p>
        </div>

        <div className="space-y-4">
          <p className="text-slate-700 font-serif italic text-lg">Niniejszym potwierdza się, że</p>
          <h3 className="text-5xl font-extrabold text-slate-900 border-b-4 border-slate-200 pb-2 px-8 inline-block font-serif">
            {userName}
          </h3>
          <p className="text-slate-800 max-w-md mx-auto leading-relaxed text-lg">
            z sukcesem ukończył(a) intensywny mikro-kurs poświęcony technice 
            <span className="font-bold text-indigo-800"> Reakcji Łańcuchowej Polimerazy (PCR)</span>, 
            wykazując się pełnym zrozumieniem procesów molekularnych.
          </p>
        </div>

        <div className="w-full max-w-lg bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 text-left space-y-4">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={14} />
            Zdobyte efekty kształcenia:
          </h4>
          <ul className="grid grid-cols-1 gap-y-3 text-sm text-slate-900 list-disc pl-5 font-medium">
            <li>Zrozumienie molekularnych podstaw denaturacji i elongacji DNA.</li>
            <li>Umiejętność doboru parametrów temperaturowych dla etapów PCR.</li>
            <li>Rozpoznawanie roli polimerazy Taq i starterów w syntezie.</li>
            <li>Zdolność do poprawnej interpretacji i parafrazowania procesów.</li>
            <li>Znajomość kinetyki przyłączania starterów (annealing).</li>
          </ul>
        </div>

        <div className="flex justify-between w-full pt-8 border-t-2 border-slate-200">
          <div className="text-left">
            <p className="text-xs text-slate-600 uppercase tracking-widest font-bold">Data wydania</p>
            <p className="text-xl font-bold text-slate-900">{date}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-600 uppercase tracking-widest font-bold">Podpis Dziekana</p>
            <div className="font-serif italic text-indigo-800 text-2xl font-bold">Prof. dr hab. Molekularny</div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Dna size={400} />
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 is Intro
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([1]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [userName, setUserName] = useState<string>('');
  const [examScore, setExamScore] = useState<number | null>(null);

  const handleQuizAnswer = (moduleId: number, isCorrect: boolean) => {
    if (quizAnswers[moduleId] !== undefined) return;
    
    setQuizAnswers(prev => ({ ...prev, [moduleId]: isCorrect }));
    
    if (isCorrect) {
      const nextStep = moduleId + 1;
      if (nextStep <= 7 && !unlockedSteps.includes(nextStep)) {
        setUnlockedSteps(prev => [...prev, nextStep]);
      }
    }
  };

  const handleExamComplete = (score: number) => {
    setExamScore(score);
    if (score === 5) {
      // 100% correct
      const nextStep = 8; // Dummy step for certificate logic if needed, but we handle it in module 7
    }
  };

  const modules: Module[] = [
    {
      id: 1,
      title: '1. Wiedza - Denaturacja',
      type: 'knowledge',
      infographic: <DenaturationVisual />,
      plainText: "Dzień dobry, Państwu. Rozpoczynamy naszą podróż w głąb molekularnych mechanizmów powielania kwasów nukleinowych. Pierwszym, krytycznym etapem reakcji PCR jest denaturacja. W temperaturze około 95 stopni Celsjusza wiązania wodorowe łączące komplementarne zasady azotowe ulegają zerwaniu. Proces ten przypomina rozpinanie suwaka – dwuniciowa struktura DNA przekształca się w dwie oddzielne matryce jednoniciowe. Bez tego kroku, enzymy nie miałyby dostępu do kodu genetycznego. Pamiętajcie, studenci: precyzja temperatury to klucz do sukcesu w biologii molekularnej. Zbyt niska temperatura nie rozdzieli nici całkowicie, zbyt wysoka może uszkodzić strukturę chemiczną DNA.",
      content: (
        <div className="space-y-6 text-xl">
          <p className="leading-relaxed text-slate-900">
            Dzień dobry, Państwu. Rozpoczynamy naszą podróż w głąb molekularnych mechanizmów powielania kwasów nukleinowych.
          </p>
          <p className="leading-relaxed text-slate-900">
            Pierwszym, krytycznym etapem reakcji PCR jest <span className="font-bold text-indigo-700 underline decoration-indigo-300">denaturacja</span>.
          </p>
          <p className="leading-relaxed text-slate-900">
            W temperaturze około 95°C wiązania wodorowe łączące komplementarne zasady azotowe ulegają zerwaniu.
          </p>
          <p className="leading-relaxed text-slate-900">
            Proces ten przypomina rozpinanie suwaka – dwuniciowa struktura DNA (dsDNA) przekształca się w dwie oddzielne matryce jednoniciowe (ssDNA).
          </p>
          <p className="leading-relaxed text-slate-900">
            Bez tego kroku, enzymy nie miałyby dostępu do kodu genetycznego.
          </p>
          <div className="bg-indigo-50 p-6 rounded-xl border-l-8 border-indigo-600 italic text-lg text-indigo-900 shadow-sm">
            "Pamiętajcie, studenci: precyzja temperatury to klucz do sukcesu w biologii molekularnej. Zbyt niska temperatura nie rozdzieli nici całkowicie, zbyt wysoka może uszkodzić strukturę chemiczną DNA."
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '2. Pytanie 1',
      type: 'quiz',
      infographic: <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-400 text-slate-600 font-bold italic">Sprawdź swoją czujność...</div>,
      plainText: "Pytanie kontrolne: Etap Denaturacji. Jaki jest główny cel podgrzania mieszaniny reakcyjnej do temperatury 95 stopni Celsjusza?",
      content: (
        <div className="space-y-8 text-xl">
          <h3 className="text-2xl font-bold text-slate-900">Pytanie kontrolne: Etap Denaturacji</h3>
          <p className="text-slate-900">Jaki jest główny cel podgrzania mieszaniny reakcyjnej do temperatury 95°C?</p>
          <div className="grid gap-4">
            {[
              { id: 'a', text: 'Aktywacja polimerazy DNA', correct: false },
              { id: 'b', text: 'Zerwanie wiązań wodorowych między nićmi DNA', correct: true },
              { id: 'c', text: 'Przyłączenie starterów do matrycy', correct: false },
              { id: 'd', text: 'Synteza nowej nici DNA', correct: false }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleQuizAnswer(2, opt.correct)}
                className={`p-5 text-left rounded-xl border-2 transition-all text-lg font-medium ${
                  quizAnswers[2] === undefined 
                    ? 'border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-200' 
                    : opt.correct 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                      : 'border-slate-200 opacity-60'
                }`}
              >
                <span className="font-bold mr-2">{opt.id.toUpperCase()}.</span> {opt.text}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '3. Wiedza - Annealing',
      type: 'knowledge',
      infographic: <AnnealingVisual />,
      plainText: "Kolejny etap to annealing, czyli przyłączanie starterów. To moment, w którym definiujemy, który fragment genomu chcemy powielić. Obniżamy temperaturę zazwyczaj do 50-65 stopni Celsjusza, co pozwala krótkim, specyficznym sekwencjom DNA – starterom – odnaleźć swoje komplementarne miejsca na jednoniciowej matrycy. To proces wysoce selektywny, oparty na zasadzie parowania zasad. Zwróćcie uwagę na temperaturę topnienia starterów. Jeśli będzie ona źle dobrana, otrzymacie niespecyficzne produkty, co w diagnostyce laboratoryjnej jest błędem kardynalnym.",
      content: (
        <div className="space-y-6 text-xl">
          <p className="leading-relaxed text-slate-900">
            Kolejny etap to <span className="font-bold text-indigo-700 underline decoration-indigo-300">annealing</span>, czyli przyłączanie starterów.
          </p>
          <p className="leading-relaxed text-slate-900">
            To moment, w którym definiujemy, który fragment genomu chcemy powielić.
          </p>
          <p className="leading-relaxed text-slate-900">
            Obniżamy temperaturę (zazwyczaj do 50-65°C), co pozwala krótkim, specyficznym sekwencjom DNA – starterom – odnaleźć swoje komplementarne miejsca na jednoniciowej matrycy.
          </p>
          <p className="leading-relaxed text-slate-900">
            To proces wysoce selektywny, oparty na zasadzie parowania zasad (A-T, G-C).
          </p>
          <div className="bg-amber-50 p-6 rounded-xl border-l-8 border-amber-600 italic text-lg text-amber-900 shadow-sm">
            "Zwróćcie uwagę na temperaturę topnienia (Tm) starterów. Jeśli będzie ona źle dobrana, otrzymacie niespecyficzne produkty, co w diagnostyce laboratoryjnej jest błędem kardynalnym."
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: '4. Połącz w pary',
      type: 'matching',
      infographic: <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-400 text-slate-600 font-bold italic">Laboratorium pojęć...</div>,
      plainText: "Weryfikacja terminologii. Drodzy studenci, precyzyjne posługiwanie się terminologią jest fundamentem komunikacji naukowej. Proszę dopasować pojęcia do ich definicji.",
      content: (
        <div className="space-y-8 text-xl">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Weryfikacja terminologii</h3>
            <p className="text-slate-700 italic">"Drodzy studenci, precyzyjne posługiwanie się terminologią jest fundamentem komunikacji naukowej. Proszę dopasować pojęcia do ich definicji."</p>
          </div>
          <MatchingGame onComplete={() => handleQuizAnswer(4, true)} />
        </div>
      )
    },
    {
      id: 5,
      title: '5. Wiedza - Elongacja',
      type: 'knowledge',
      infographic: <ElongationVisual />,
      plainText: "Finał cyklu to elongacja. To tutaj zachodzi właściwa synteza nowej nici DNA przez polimerazę. Podnosimy temperaturę do optymalnej dla termostabilnej polimerazy, zwykle 72 stopnie Celsjusza. Enzym ten dobudowuje nukleotydy do wolnego końca 3 prim startera, kopiując informację z matrycy. W ten sposób z jednej cząsteczki DNA otrzymujemy dwie. Zauważcie geniusz natury i technologii: Taq polimeraza pochodzi z bakterii Thermus aquaticus, żyjącej w gorących źródłach. Dzięki niej nie musimy dodawać świeżego enzymu po każdym cyklu denaturacji.",
      content: (
        <div className="space-y-6 text-xl">
          <p className="leading-relaxed text-slate-900">
            Finał cyklu to <span className="font-bold text-indigo-700 underline decoration-indigo-300">elongacja</span>.
          </p>
          <p className="leading-relaxed text-slate-900">
            To tutaj zachodzi właściwa synteza nowej nici DNA przez polimerazę.
          </p>
          <p className="leading-relaxed text-slate-900">
            Podnosimy temperaturę do optymalnej dla termostabilnej polimerazy (zwykle 72°C).
          </p>
          <p className="leading-relaxed text-slate-900">
            Enzym ten dobudowuje nukleotydy do wolnego końca 3' startera, kopiując informację z matrycy.
          </p>
          <p className="leading-relaxed text-slate-900">
            W ten sposób z jednej cząsteczki DNA otrzymujemy dwie.
          </p>
          <div className="bg-emerald-50 p-6 rounded-xl border-l-8 border-emerald-600 italic text-lg text-emerald-900 shadow-sm">
            "Zauważcie geniusz natury i technologii: Taq polimeraza pochodzi z bakterii Thermus aquaticus, żyjącej w gorących źródłach. Dzięki niej nie musimy dodawać świeżego enzymu po każdym cyklu denaturacji."
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: '6. Pytanie 3',
      type: 'quiz',
      infographic: <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-400 text-slate-600 font-bold italic">Synteza wiedzy...</div>,
      plainText: "Pytanie kontrolne: Polimeraza Taq. Dlaczego w technice PCR stosujemy polimerazę pochodzącą z organizmów termofilnych?",
      content: (
        <div className="space-y-8 text-xl">
          <h3 className="text-2xl font-bold text-slate-900">Pytanie kontrolne: Polimeraza Taq</h3>
          <p className="text-slate-900">Dlaczego w technice PCR stosujemy polimerazę pochodzącą z organizmów termofilnych?</p>
          <div className="grid gap-4">
            {[
              { id: 'a', text: 'Ponieważ jest tańsza w produkcji', correct: false },
              { id: 'b', text: 'Ponieważ pracuje szybciej niż ludzka polimeraza', correct: false },
              { id: 'c', text: 'Ponieważ zachowuje aktywność po wielokrotnym ogrzewaniu do 95°C', correct: true },
              { id: 'd', text: 'Ponieważ nie wymaga starterów', correct: false }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleQuizAnswer(6, opt.correct)}
                className={`p-5 text-left rounded-xl border-2 transition-all text-lg font-medium ${
                  quizAnswers[6] === undefined 
                    ? 'border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-200' 
                    : opt.correct 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                      : 'border-slate-200 opacity-60'
                }`}
              >
                <span className="font-bold mr-2">{opt.id.toUpperCase()}.</span> {opt.text}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: '7. Sprawdzian',
      type: 'exam',
      infographic: <div className="w-full h-64 bg-indigo-900 rounded-xl flex items-center justify-center border border-indigo-700 text-indigo-100 font-bold italic">Egzamin końcowy...</div>,
      plainText: "Egzamin końcowy. Proszę odpowiedzieć na wszystkie pytania, aby uzyskać certyfikat ukończenia kursu.",
      content: (
        <div className="space-y-8">
          {examScore === 5 ? (
            <div className="col-span-full">
              <Certificate userName={userName} date={new Date().toLocaleDateString('pl-PL')} />
            </div>
          ) : (
            <FinalExam userName={userName} onComplete={handleExamComplete} />
          )}
        </div>
      )
    }
  ];

  const startCourse = () => {
    setCurrentStep(1);
  };

  const goToStep = (stepId: number) => {
    if (unlockedSteps.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const currentModule = modules.find(m => m.id === currentStep);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* Sidebar Progress */}
      <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Dna size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Mikro-Kurs: PCR</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {modules.map((m) => {
            const isUnlocked = unlockedSteps.includes(m.id);
            const isActive = currentStep === m.id;
            const isCompleted = m.type === 'quiz' || m.type === 'matching' ? quizAnswers[m.id] === true : unlockedSteps.includes(m.id + 1);

            return (
              <button
                key={m.id}
                onClick={() => goToStep(m.id)}
                disabled={!isUnlocked}
                className={`flex items-center gap-3 p-4 rounded-xl text-base font-bold transition-all text-left border-2 ${
                  isActive 
                    ? 'bg-indigo-100 text-indigo-900 border-indigo-500 shadow-md' 
                    : isUnlocked 
                      ? 'text-slate-800 border-transparent hover:bg-slate-100 hover:border-slate-300' 
                      : 'text-slate-400 border-transparent cursor-not-allowed'
                }`}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : isActive 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-slate-200'
                }`}>
                  {isCompleted ? <CheckCircle2 size={14} /> : m.id}
                </div>
                <span className="truncate">{m.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            <GraduationCap size={14} />
            Status Kursu
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedSteps.length / modules.length) * 100}%` }}
              className="h-full bg-indigo-600"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Ukończono {unlockedSteps.length - 1} z {modules.length} modułów</p>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20">
        <AnimatePresence mode="wait">
          {currentStep === 0 ? (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  Wstęp do Biologii Molekularnej
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                  Reakcja Łańcuchowa Polimerazy (PCR)
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Dzień dobry, młodzi naukowcy. Witam na pierwszym roku studiów biologicznych. Dziś zajmiemy się techniką, która zrewolucjonizowała współczesną naukę, medycynę i kryminalistykę.
                </p>
                
                <div className="max-w-sm pt-4">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Wpisz swoje imię i nazwisko:</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="np. Jan Kowalski"
                    className="w-full px-5 py-4 bg-white border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 outline-none transition-all text-lg font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-2xl shadow-md border-2 border-slate-200 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Czego się nauczysz?</h4>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">Zrozumiesz trzy kluczowe etapy cyklu PCR: denaturację, annealing oraz elongację.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-md border-2 border-slate-200 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Interaktywna wiedza</h4>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">Każdy etap zilustrowany jest symulacją, która pomoże Ci zwizualizować procesy molekularne.</p>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={startCourse}
                  disabled={!userName.trim()}
                  className={`group flex items-center gap-4 px-10 py-5 text-xl font-extrabold rounded-2xl transition-all shadow-xl active:scale-95 ${
                    userName.trim() 
                      ? 'bg-indigo-700 text-white hover:bg-indigo-800 shadow-indigo-200 focus:ring-4 focus:ring-indigo-300' 
                      : 'bg-slate-300 text-slate-600 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Play size={24} fill="currentColor" />
                  Rozpocznij Naukę
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                {!userName.trim() && <p className="text-xs font-bold text-rose-700 mt-3">Proszę podać imię, aby wygenerować certyfikat na końcu kursu.</p>}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`max-w-4xl mx-auto ${currentModule?.type === 'exam' && examScore === 5 ? 'block' : 'grid lg:grid-cols-2'} gap-12 items-start`}
            >
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm uppercase tracking-widest">
                      {currentModule?.type === 'knowledge' ? <BookOpen size={16} /> : currentModule?.type === 'exam' ? <GraduationCap size={16} /> : <HelpCircle size={16} />}
                      {currentModule?.type === 'knowledge' ? 'Moduł Wiedzy' : currentModule?.type === 'matching' ? 'Zadanie Praktyczne' : currentModule?.type === 'exam' ? 'Egzamin Końcowy' : 'Weryfikacja Wiedzy'}
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900">{currentModule?.title}</h2>
                  </div>
                  {currentModule?.plainText && (
                    <SpeechButton text={currentModule.plainText} />
                  )}
                </div>

                <div className="prose prose-slate max-w-none text-slate-900">
                  {currentModule?.content}
                </div>

                {currentModule?.type === 'knowledge' && (
                  <div className="pt-6">
                    <button 
                      onClick={() => {
                        const next = currentStep + 1;
                        if (!unlockedSteps.includes(next)) {
                          setUnlockedSteps(prev => [...prev, next]);
                        }
                        setCurrentStep(next);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
                    >
                      Przejdź dalej
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}

                {(currentModule?.type === 'quiz' || currentModule?.type === 'matching') && quizAnswers[currentStep] === true && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-4 text-emerald-800"
                  >
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Doskonale!</p>
                      <p className="text-sm">Twoja odpowiedź jest poprawna. Możesz przejść do kolejnego etapu.</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (currentStep < modules.length) {
                          setCurrentStep(currentStep + 1);
                        }
                      }}
                      className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700"
                    >
                      Dalej
                    </button>
                  </motion.div>
                )}

                {currentModule?.type === 'exam' && examScore !== null && examScore < 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-4 text-rose-800"
                  >
                    <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <RotateCcw size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Wynik: {examScore}/5</p>
                      <p className="text-sm">Aby uzyskać certyfikat, musisz uzyskać 100% poprawnych odpowiedzi. Spróbuj jeszcze raz!</p>
                    </div>
                    <button 
                      onClick={() => setExamScore(null)}
                      className="ml-auto px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700"
                    >
                      Powtórz egzamin
                    </button>
                  </motion.div>
                )}

                {currentModule?.type === 'quiz' && quizAnswers[currentStep] === false && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-4 text-rose-800"
                  >
                    <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <RotateCcw size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Niestety, to nie to.</p>
                      <p className="text-sm">Zastanów się jeszcze raz nad mechanizmem procesu. Spróbuj ponownie.</p>
                    </div>
                    <button 
                      onClick={() => setQuizAnswers(prev => {
                        const next = { ...prev };
                        delete next[currentStep];
                        return next;
                      })}
                      className="ml-auto px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700"
                    >
                      Ponów
                    </button>
                  </motion.div>
                )}
              </div>

              {!(currentModule?.type === 'exam' && examScore === 5) && (
                <div className="sticky top-12 space-y-6">
                  <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    {currentModule?.infographic}
                  </div>
                  <div className="p-6 bg-indigo-900 text-indigo-100 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                      <Thermometer size={14} />
                      Parametry Reakcji
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">95°C</div>
                        <div className="text-[10px] opacity-60 uppercase">Denaturacja</div>
                      </div>
                      <div className="text-center border-x border-indigo-800">
                        <div className="text-2xl font-bold">~55°C</div>
                        <div className="text-[10px] opacity-60 uppercase">Annealing</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">72°C</div>
                        <div className="text-[10px] opacity-60 uppercase">Elongacja</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
