import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Lock, ChevronRight, Menu, ArrowLeft, GraduationCap, Video, FileText } from 'lucide-react';
import { CURRICULUM, MASTER_ACCESS_CODE } from './constants';
import { Proff, Subject, Chapter } from './types';
import AccessModal from './components/AccessModal';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<'home' | 'proff' | 'subject'>('home');
  const [activeProff, setActiveProff] = useState<Proff | null>(null);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  
  // Simulated Persisted Access (In reality, verify with backend)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('ayurveez_unlocked') === 'true';
  });

  // Navigation Handlers
  const handleProffClick = (proff: Proff) => {
    setActiveProff(proff);
    setView('proff');
  };

  const handleSubjectClick = (subject: Subject) => {
    if (isUnlocked) {
      setActiveSubject(subject);
      setView('subject');
    } else {
      setIsAccessModalOpen(true);
    }
  };

  const handleUnlock = (code: string) => {
    if (code === MASTER_ACCESS_CODE) {
      setIsUnlocked(true);
      localStorage.setItem('ayurveez_unlocked', 'true');
      return true;
    }
    return false;
  };

  const goBack = () => {
    if (view === 'subject') {
      setView('proff');
      setActiveSubject(null);
    } else if (view === 'proff') {
      setView('home');
      setActiveProff(null);
    }
  };

  // Header Component
  const Header = () => (
    <header className="sticky top-0 z-30 bg-ayur-base/95 backdrop-blur-md border-b-4 border-ayur-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); setActiveProff(null); setActiveSubject(null); }}>
            <div className="bg-ayur-primary p-2 rounded-lg">
               <GraduationCap className="text-yellow-500 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-ayur-text tracking-tight">Ayurveez</h1>
              <p className="text-xs font-sans text-ayur-accent font-semibold tracking-widest uppercase">BAMS Made Easy</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
             <span className="text-ayur-secondary font-bold hover:text-ayur-primary cursor-pointer transition">Home</span>
             <span className="text-ayur-text hover:text-ayur-primary cursor-pointer transition">Library</span>
             <span className="text-ayur-text hover:text-ayur-primary cursor-pointer transition">About</span>
          </div>
          <button className="md:hidden text-ayur-text">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-ayur-accent selection:text-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Breadcrumb */}
        {view !== 'home' && (
          <button 
            onClick={goBack}
            className="mb-6 flex items-center text-ayur-secondary font-bold hover:underline gap-1 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to {view === 'subject' ? activeProff?.title : 'Dashboard'}
          </button>
        )}

        {/* HOME VIEW: List of Proffs */}
        {view === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-ayur-primary">
                Master the Art of Ayurveda
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Comprehensive video lectures and digital notes for all professional years of BAMS.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {CURRICULUM.map((proff) => (
                <div 
                  key={proff.id}
                  onClick={() => handleProffClick(proff)}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group border border-stone-200"
                >
                  <div className={`h-32 bg-gradient-to-br ${
                    proff.id === 1 ? 'from-orange-800 to-amber-700' :
                    proff.id === 2 ? 'from-emerald-800 to-green-700' :
                    'from-stone-800 to-gray-700'
                  } p-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/symphony.png')]"></div>
                    <span className="text-6xl font-serif text-white/20 absolute right-4 -bottom-4">{proff.id}</span>
                    <h3 className="text-2xl font-serif font-bold text-white relative z-10">{proff.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 h-12">{proff.description}</p>
                    <div className="flex justify-between items-center text-ayur-primary font-bold group-hover:text-ayur-accent">
                      <span>{proff.subjects.length} Subjects</span>
                      <ChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Highlights */}
            <div className="mt-20 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-800">
                  <Video size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2">HD Video Lectures</h4>
                <p className="text-sm text-gray-600">Deep dive into concepts with expert explanations.</p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4 text-green-800">
                  <BookOpen size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2">Samhita Notes</h4>
                <p className="text-sm text-gray-600">Organized chapter-wise notes for easy revision.</p>
              </div>
              <div className="p-6 bg-stone-100 rounded-xl border border-stone-200">
                <div className="w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-800">
                  <GraduationCap size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2">Exam Oriented</h4>
                <p className="text-sm text-gray-600">Curated content focusing on university exams.</p>
              </div>
            </div>
          </div>
        )}

        {/* PROFF VIEW: List of Subjects */}
        {view === 'proff' && activeProff && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-end justify-between border-b-2 border-stone-200 pb-4">
               <div>
                 <span className="text-sm font-bold text-ayur-accent uppercase tracking-wider">Professional Year {activeProff.id}</span>
                 <h2 className="text-3xl font-serif font-bold text-ayur-text mt-1">{activeProff.title} Subjects</h2>
               </div>
               <div className="text-right hidden md:block">
                 <p className="text-sm text-gray-500">{activeProff.subjects.length} Courses Available</p>
               </div>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {activeProff.subjects.map((subject) => (
                 <div 
                   key={subject.id}
                   onClick={() => handleSubjectClick(subject)}
                   className="group relative bg-white rounded-xl shadow-md border border-stone-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                 >
                   {!isUnlocked && (
                     <div className="absolute top-3 right-3 z-10 bg-stone-900/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                       <Lock size={12} /> Locked
                     </div>
                   )}
                   <div className="h-2 bg-ayur-primary w-full group-hover:bg-ayur-accent transition-colors"></div>
                   <div className="p-6">
                     <h3 className="text-xl font-bold text-gray-800 group-hover:text-ayur-primary transition-colors">{subject.name}</h3>
                     <p className="text-sm text-ayur-secondary font-serif italic mb-3">{subject.sanskritName}</p>
                     <p className="text-gray-600 text-sm line-clamp-2">{subject.description}</p>
                   </div>
                   <div className="bg-stone-50 px-6 py-3 flex justify-between items-center text-sm font-medium text-gray-500 border-t border-stone-100">
                     <span className="flex items-center gap-1"><BookOpen size={14} /> {subject.chapters.length} Chapters</span>
                     {isUnlocked ? (
                       <span className="text-green-600 flex items-center gap-1">Access <ChevronRight size={14} /></span>
                     ) : (
                       <span className="text-ayur-accent">Unlock Now</span>
                     )}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* SUBJECT VIEW: Chapters List */}
        {view === 'subject' && activeSubject && (
          <div className="animate-fade-in">
             <div className="bg-ayur-primary text-white rounded-2xl p-8 mb-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-serif font-bold mb-2">{activeSubject.name}</h2>
                  <p className="text-orange-200 text-lg font-serif italic mb-6">{activeSubject.sanskritName}</p>
                  <p className="max-w-2xl text-white/90">{activeSubject.description}</p>
                </div>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
               <div className="p-6 border-b border-stone-200">
                 <h3 className="text-lg font-bold text-gray-800">Course Content</h3>
               </div>
               <div className="divide-y divide-stone-100">
                 {activeSubject.chapters.map((chapter, index) => (
                   <div key={chapter.id} className="p-4 sm:p-6 hover:bg-stone-50 transition-colors flex items-center gap-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ayur-light flex items-center justify-center text-ayur-secondary font-bold group-hover:bg-ayur-primary group-hover:text-white transition-colors">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 group-hover:text-ayur-primary transition-colors">{chapter.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Video size={12} /> {chapter.duration}</span>
                          <span className="flex items-center gap-1"><FileText size={12} /> Notes Available</span>
                        </div>
                      </div>
                      <div>
                        <button className="p-2 rounded-full border border-gray-200 text-gray-400 group-hover:border-ayur-primary group-hover:text-ayur-primary transition-all">
                          <Play size={20} fill="currentColor" className="opacity-0 group-hover:opacity-100" />
                        </button>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}

      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <GraduationCap className="text-ayur-primary w-6 h-6" />
             <span className="text-xl font-serif font-bold text-stone-200">Ayurveez</span>
          </div>
          <p className="text-sm mb-6 max-w-md mx-auto">Empowering the next generation of Vaidyas with accessible, high-quality digital education based on ancient wisdom.</p>
          <div className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Ayurveez Education. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <ChatBot />
      <AccessModal 
        isOpen={isAccessModalOpen} 
        onClose={() => setIsAccessModalOpen(false)} 
        onUnlock={handleUnlock}
      />
    </div>
  );
};

export default App;