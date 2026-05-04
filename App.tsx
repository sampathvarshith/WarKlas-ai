
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mic,
  MicOff,
  History,
  Menu,
  X,
  GraduationCap,
  Trophy,
  TrendingUp,
  Camera,
  Plus,
  PanelLeft,
  PanelRight,
  Trash2,
  EyeOff,
  Volume2,
  VolumeX,
  Languages,
  Bot
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sender, Message, HistoryItem, HistoryCategory, Scholarship } from './types.ts';
import { getGeminiResponse, getGeminiStream } from './services/gemini.ts';
import { analyzeImageHF } from './services/huggingface.ts';
import { NIRF_DATA, NirfUniversity } from './src/data/nirfData.ts';
import CareerQuiz from './src/components/CareerQuiz.tsx';
import MermaidChart from './src/components/MermaidChart.tsx';
import Sidebar from './src/components/chat/Sidebar';
import ChatInput from './src/components/chat/ChatInput';
import ChatWindow from './src/components/chat/ChatWindow';
const NIRF_CONTEXT_STRING = NIRF_DATA.map(u =>
  `#${u.rank} ${u.name} (${u.location}) - Type: ${u.type}`
).join('\n');

const MOCK_SCHOLARSHIPS = [
  {
    id: '1',
    name: 'Reliance Foundation',
    provider: 'Reliance',
    amount: '₹2,00,000',
    status: 'Open' as const,
    deadline: 'Oct 15, 2026',
    uptime: '99.9%',
    category: 'Most Applied'
  },
  {
    id: '2',
    name: 'HDFC Badhte Kadam',
    provider: 'HDFC Bank',
    amount: '₹1,00,000',
    status: 'Open' as const,
    deadline: 'Nov 10, 2026',
    uptime: '99.9%',
    category: 'Most Applied'
  },
  {
    id: '3',
    name: 'Tata Capital Pankh',
    provider: 'Tata Capital',
    amount: 'Up to 80%',
    status: 'Closing Soon' as const,
    deadline: 'Sep 30, 2026',
    uptime: '99.7%',
    category: 'All Eligible'
  },
];

const MOCK_UNIVERSITIES = [
  {
    id: '1',
    name: 'IIT Delhi',
    location: 'New Delhi',
    avgPackage: '₹22 LPA',
    admissionStatus: 'Open',
    nextIntake: 'Jul 2026',
    uptime: '100%'
  },
  {
    id: '2',
    name: 'BITS Pilani',
    location: 'Rajasthan',
    avgPackage: '₹18 LPA',
    admissionStatus: 'Closed',
    nextIntake: 'Jan 2027',
    uptime: '99.8%'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const popVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

const QUICK_CHIPS = [
  "AI Roadmap",
  "Cybersecurity Path",
  "Take Career Quiz",
  "Robotics Courses"
];

const CAREER_PROMPTS = [
  "Plan my roadmap to becoming a Data Scientist...",
  "Find scholarships for Masters in Computer Science...",
  "What are the highest paying tech jobs in 2026?...",
  "How to crack Google & Microsoft interviews?...",
  "Suggest certification courses for Cloud Computing...",
  "List top universities for Artificial Intelligence..."
];

const AnimatedRobot = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-full shadow-2xl shadow-blue-500/40 border border-white/20">
        <div className="bg-black/80 rounded-full p-4 backdrop-blur-sm">
          <div className="relative">
            <Bot size={64} className="text-srh-textPrimary drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <motion.div
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              className="absolute top-[22px] left-[18px] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"
            />
            <motion.div
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, delay: 0.1 }}
              className="absolute top-[22px] right-[18px] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"
            />
          </div>
        </div>
      </div>
      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 50 }}
        transition={{ delay: 1 }}
        className="absolute -right-16 top-0 bg-white text-blue-900 text-[10px] font-bold px-3 py-1.5 rounded-xl rounded-bl-sm shadow-lg whitespace-nowrap"
      >
        I'm WarKlas AI! 🤖
      </motion.div>
    </motion.div>
  );
};

const MOTIVATIONAL_LINES = [
  "Your AI Career Copilot",
  "Guidance You Can Trust",
  "Building India's Future Leaders",
  "From Confusion to Clarity",
  "Your Success is Our Mission",
  "Data-Driven. Dream-Oriented."
];

const cleanTextForTTS = (markdown: string) => {
  if (!markdown) return '';
  return markdown
    // Remove headers (# Header)
    .replace(/^#+\s/gm, '')
    // Remove bold/italic (**text**, *text*, __text__, _text_)
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove unordered list bullets (* Item, - Item)
    .replace(/^[\*\-]\s/gm, '')
    // Remove links ([text](url)) -> text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Remove images (![alt](url)) -> nothing
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
    // Remove blockquotes (> text)
    .replace(/^>\s/gm, '')
    // Remove code blocks (```code```) -> code (stripped of ticks)
    .replace(/```/g, '')
    // Remove inline code (`code`)
    .replace(/`/g, '')
    // Remove generic markdown symbols that might be read out
    .replace(/[*#]/g, '')
    // Collapse multiple spaces/newlines
    .replace(/\s+/g, ' ')
    .trim();
};

const App: React.FC = () => {
  // Expanded Language Support
  const LANGUAGES = [
    { name: 'English', code: 'en-US' },
    { name: 'Hindi', code: 'hi-IN' },
    { name: 'Hinglish', code: 'hi-IN' },
    { name: 'Bengali', code: 'bn-IN' },
    { name: 'Telugu', code: 'te-IN' },
    { name: 'Marathi', code: 'mr-IN' },
    { name: 'Tamil', code: 'ta-IN' },
    { name: 'Urdu', code: 'ur-IN' },
    { name: 'Gujarati', code: 'gu-IN' },
    { name: 'Kannada', code: 'kn-IN' },
    { name: 'Malayalam', code: 'ml-IN' },
    { name: 'Punjabi', code: 'pa-IN' },
    { name: 'Odia', code: 'or-IN' },
    { name: 'Spanish', code: 'es-ES' },
    { name: 'French', code: 'fr-FR' },
    { name: 'German', code: 'de-DE' }
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  // Right Sidebar States
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false); // Mobile
  const [isDesktopRightSidebarOpen, setIsDesktopRightSidebarOpen] = useState(false); // Desktop

  const [isTemporaryMode, setIsTemporaryMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);


  const [scholarships, setScholarships] = useState<Scholarship[]>(MOCK_SCHOLARSHIPS);
  const [universities, setUniversities] = useState<NirfUniversity[]>(NIRF_DATA);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const fetchDynamicData = async (type: 'scholarships' | 'universities') => {
    setIsFetchingData(true);
    try {
      const uniPromptContext = uniFilter === 'All'
        ? "100 top ranked engineering colleges in India"
        : `top ${uniFilter} engineering colleges in India (as many as exist, up to 100)`;

      const prompt = type === 'scholarships'
        ? `Generate a JSON array of 5 real scholarships in India for ${new Date().getFullYear()} for engineering/medical students. Fields: id (string), name, provider, amount, status (Open/Closing Soon/Closed), deadline, category (e.g., 'Merit-based'). No markdown, just raw JSON.`
        : `Generate a JSON array of ${uniPromptContext} (NIRF style) for ${new Date().getFullYear()}. Fields: rank (number), name, type (IIT/NIT/Private/Govt/GFTI), location, score (string). No markdown, just raw JSON.`;

      const response = await getGeminiResponse(prompt, [], undefined, 'English');

      // Clean up response to get straight JSON
      const jsonString = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(jsonString);

      if (type === 'scholarships') {
        setScholarships(data);
      } else {
        setUniversities(data);
      }
    } catch (error) {
      console.error("Failed to fetch dynamic data", error);
      alert("Failed to update data from AI. Using cached data.");
    } finally {
      setIsFetchingData(false);
    }
  };

  const [uniFilter, setUniFilter] = useState<'All' | 'IIT' | 'NIT' | 'Private' | 'GFTI' | 'Govt'>('All');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const speakText = (text: string, id: string) => {
    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = cleanTextForTTS(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Improved Voice Matching
    const voices = window.speechSynthesis.getVoices();
    const langConfig = LANGUAGES.find(l => l.name === selectedLanguage);

    let preferredVoice = null;
    if (langConfig) {
      // Exact code match
      preferredVoice = voices.find(v => v.lang === langConfig.code);
      // Fallback to loose match (e.g. 'hi' for 'hi-IN')
      if (!preferredVoice) {
        preferredVoice = voices.find(v => v.lang.includes(langConfig.code.split('-')[0]));
      }
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      // Fallback for English if no specific voice found
      if (selectedLanguage === 'English') {
        const enVoice = voices.find(v => v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
      }
    }

    utterance.onend = () => setSpeakingMessageId(null);
    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistoryItems(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const voiceTextRef = useRef('');

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  // Tour State: 1 = Left, 2 = Input, 3 = Right, 0 = Done
  // Default to 0 (Done) to avoid blocking the UI, unless we want to force it.
  // Tour State: 1 = Left, 2 = Input, 3 = Right, 0 = Done
  const [tourStep, setTourStep] = useState(() => {
    const saved = localStorage.getItem('tourCompleted');
    return saved === 'true' ? 0 : 1;
  });

  const endTour = () => {
    setTourStep(0);
    setIsDesktopRightSidebarOpen(false);
    setIsRightSidebarOpen(false);
    localStorage.setItem('tourCompleted', 'true');
  };

  const handleTourNext = () => {
    if (tourStep === 2) {
      // Auto-open Right Sidebar for Step 3
      setIsDesktopRightSidebarOpen(true);
      if (window.innerWidth < 1280) setIsRightSidebarOpen(true);
    }
    setTourStep(prev => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % CAREER_PROMPTS.length);
      setHeroIndex((prev) => (prev + 1) % MOTIVATIONAL_LINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Force Left Sidebar open for Step 1
    if (tourStep === 1) setIsDesktopSidebarOpen(true);
  }, [tourStep]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      // Create a small user notification
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: Sender.USER,
        text: "📷 Image uploaded for recognition.",
        timestamp: new Date(),
        isImage: true
      };
      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);
      setIsAnalyzingImage(true);

      try {
        // Use Hugging Face for initial quick recognition (if configured)
        const hfRecognition = await analyzeImageHF(base64);
        
        const aiMsgId = (Date.now() + 1).toString();
        setStreamingMsgId(aiMsgId);
        // Always show Analyzing immediately
        setMessages(prev => [...prev, {
          id: aiMsgId,
          sender: Sender.AI,
          text: "🔍 Analyzing image and determining relevance...",
          timestamp: new Date()
        }]);

        if (hfRecognition) {
          const prompt = `I just uploaded an image, and a computer vision model described it as: "${hfRecognition}". \n\nFirst, determine if this description is structurally relevant to career planning, education, academics, documents (like certificates, report cards, mark sheets, resumes), or professional skills. \nIf it IS relevant, tell me what you see based on the description and provide specific career/education suggestions and guidance based on the content. Ask: 'What would you like me to do with this image?'. \nIf it is NOT relevant at all to career or education, respond EXACTLY like this: "📋 I couldn't find any career or education-related content in this image. Here's what I can help with instead:\n\n🎯 **Take the Career Quiz** — Answer a few quick questions and I'll chart your ideal path.\n✍️ **Tell me manually** — Share your current education level, interests, and goals and I'll guide you.\n📷 **Upload a relevant document** — Try uploading a report card, certificate, resume, or any academic document.\n\nHow would you like to proceed?"`;
          
          let fullResponse = "";
          await getGeminiStream(
            prompt,
            [],
            (chunk) => {
              fullResponse += chunk;
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
            },
            undefined, // No image passed, pure text inference
            selectedLanguage
          );
        } else {
          // If HF totally fails, fallback to Gemini Vision API
          const autoPrompt = "Analyze this image. First, determine if it is relevant to career planning, education, academics, documents (like certificates, report cards, mark sheets, resumes), or professional skills. If it IS relevant, tell me what you see and provide specific career/education suggestions and guidance based on the content. Ask: 'What would you like me to do with this image?'. If it is NOT relevant at all to career or education, respond EXACTLY like this: '📋 I couldn\'t find any career or education-related content in this image. Here\'s what I can help with instead:\n\n🎯 **Take the Career Quiz** — Answer a few quick questions and I\'ll chart your ideal path.\n✍️ **Tell me manually** — Share your current education level, interests, and goals and I\'ll guide you.\n📷 **Upload a relevant document** — Try uploading a report card, certificate, resume, or any academic document.\n\nHow would you like to proceed?'";
          
          let fullResponse = "";
          await getGeminiStream(
            autoPrompt,
            [],
            (chunk) => {
              fullResponse += chunk;
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
            },
            base64,
            selectedLanguage
          );
        }
      } catch (err) {
        console.error("Analysis Error:", err);
      } finally {
        setStreamingMsgId(null);
        setIsLoading(false);
        setIsAnalyzingImage(false);
        // Clear the image preview after analysis is complete.
        // The image has already been analyzed and the AI response is in the chat history.
        // Follow-up messages should be pure text conversations referencing the prior context.
        setImagePreview(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (textToUse: string = inputText) => {
    const finalPrompt = textToUse.trim();
    if (!finalPrompt) return;

    // Capture and immediately clear any pending image so it's used only once
    const pendingImage = imagePreview;
    setImagePreview(null);

    // Inject NIRF Context just for the API call (hidden from UI)
    const promptWithContext = `
      [SYSTEM: Use this NIRF 2024 University Ranking Data for reference. If answering about colleges, strictly adhere to these ranks:
      ${NIRF_CONTEXT_STRING}
      ]
      ${finalPrompt}
    `;

    // Create user message object first
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text: finalPrompt || "Attached image",
      timestamp: new Date(),
      isImage: !!imagePreview
    };

    let activeChatId = currentChatId;

    if (messages.length === 0 && !isTemporaryMode) {
      const newChatId = Date.now().toString();
      activeChatId = newChatId;
      setCurrentChatId(newChatId);

      const newItem: HistoryItem = {
        id: newChatId,
        title: finalPrompt.substring(0, 30) || "Image Analysis",
        category: HistoryCategory.CHATS,
        timestamp: new Date(),
        messages: [userMsg]
      };

      setHistoryItems(prev => {
        const newer = [newItem, ...prev];
        localStorage.setItem('chatHistory', JSON.stringify(newer));
        return newer;
      });
    } else if (!isTemporaryMode && activeChatId) {
      // Update existing chat history immediately with user message
      setHistoryItems(prev => {
        const updated = prev.map(item =>
          item.id === activeChatId
            ? { ...item, messages: [...(item.messages || []), userMsg] }
            : item
        );
        localStorage.setItem('chatHistory', JSON.stringify(updated));
        return updated;
      });
    }

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Create placeholder AI message
    const aiMsgId = (Date.now() + 1).toString();
    const aiMsgPlaceholder: Message = {
      id: aiMsgId,
      sender: Sender.AI,
      text: '', // Start empty
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsgPlaceholder]);
    setStreamingMsgId(aiMsgId);
    setIsLoading(true);

    try {
      const chatHistory = messages.map(m => ({
        role: m.sender === Sender.USER ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));

      // Optimizing React Rendering During Stream
      let fullResponse = "";
      let lastRenderTime = 0;
      const RENDER_INTERVAL = 80; // ms between React state updates

      await getGeminiStream(
        finalPrompt,
        chatHistory,
        (chunk) => {
          fullResponse += chunk;

          // Throttle React state updates to prevent layout thrashing
          const now = Date.now();
          if (now - lastRenderTime < RENDER_INTERVAL) return;
          lastRenderTime = now;
          setMessages(prev => prev.map(m =>
            m.id === aiMsgId ? { ...m, text: fullResponse } : m
          ));
        },
        pendingImage || undefined,
        selectedLanguage
      );

      // Force final update and switch to markdown rendering
      setStreamingMsgId(null);
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId ? { ...m, text: fullResponse } : m
      ));

      // Final update to history after stream is done
      if (!isTemporaryMode && activeChatId && fullResponse) {
        setHistoryItems(history => {
          const updated = history.map(item =>
            item.id === activeChatId
              ? { ...item, messages: [...(item.messages || []), userMsg, { ...aiMsgPlaceholder, text: fullResponse }] }
              : item
          );
          localStorage.setItem('chatHistory', JSON.stringify(updated));
          return updated;
        });
      }

      // imagePreview already cleared at the top of handleSendMessage
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChat = (item: HistoryItem) => {
    setMessages(item.messages || []);
    setCurrentChatId(item.id);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    // Set language based on selection
    const langConfig = LANGUAGES.find(l => l.name === selectedLanguage);
    recognition.lang = langConfig ? langConfig.code : 'en-US';

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Reset voice accumulator
    voiceTextRef.current = '';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      voiceTextRef.current += (voiceTextRef.current ? " " : "") + transcript;
      setInputText(prev => prev + (prev ? " " : "") + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-send if we have text
      if (voiceTextRef.current.trim()) {
        handleSendMessage(voiceTextRef.current);
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsListening(false);
    }
  };

  return (
    <div className="flex h-screen w-full text-srh-textPrimary overflow-hidden relative font-['Inter']">
      <CareerQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSubmit={(prompt) => handleSendMessage(prompt)}
      />

      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        isTemporaryMode={isTemporaryMode}
        setIsTemporaryMode={setIsTemporaryMode}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        historyItems={historyItems}
        loadChat={loadChat}
        deleteChat={(id) => setHistoryItems(prev => prev.filter(i => i.id !== id))}
        startNewChat={() => { setMessages([]); setInputText(''); setIsSidebarOpen(false); setCurrentChatId(null); }}
        tourStep={tourStep}
      />

      <main className="flex-1 flex flex-col relative h-full">
        {/* Toggle Button for Right Sidebar (Explore) */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
          <AnimatePresence>
            {(!isDesktopRightSidebarOpen && !isRightSidebarOpen) && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 glass rounded-xl mr-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-srh-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-srh-secondary"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-srh-primary">Explore Scholarships</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => {
              if (window.innerWidth >= 1280) { // xl breakpoint
                setIsDesktopRightSidebarOpen(!isDesktopRightSidebarOpen);
              } else {
                setIsRightSidebarOpen(true);
              }
            }}
            className="p-3 glass rounded-2xl hover:bg-srh-surface hover:border-srh-primary/50 transition-colors relative group"
            title="Explore Panel"
          >
            <PanelRight size={24} className="group-hover:text-srh-primary transition-colors" />
            {(!isDesktopRightSidebarOpen && !isRightSidebarOpen) && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-srh-primary rounded-full border-2 border-[#09090b]"></span>
            )}
          </button>
        </div>

        <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 glass rounded-2xl lg:hidden hover:text-srh-primary transition-colors">
            <Menu size={24} />
          </button>
          <button
            onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            className="hidden lg:flex p-3 glass rounded-2xl hover:bg-srh-surface hover:border-srh-primary/50 hover:text-srh-primary transition-colors"
            title="Toggle Sidebar"
          >
            <PanelLeft size={24} />
          </button>
        </div>

        <ChatWindow 
          messages={messages}
          isLoading={isLoading}
          isAnalyzingImage={isAnalyzingImage}
          streamingMsgId={streamingMsgId}
          speakingMessageId={speakingMessageId}
          speakText={speakText}
          messagesEndRef={messagesEndRef}
          handleSendMessage={handleSendMessage}
          setIsQuizOpen={setIsQuizOpen}
        />

        <ChatInput 
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
          toggleVoiceInput={toggleVoiceInput}
          isListening={isListening}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleImageUpload={handleImageUpload}
          isLoading={isLoading}
          tourStep={tourStep}
          endTour={endTour}
          handleTourNext={handleTourNext}
        />
      </main>

      {/* Right Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isRightSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRightSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] xl:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed xl:relative z-[60] h-full glass border-l border-srh-primary/30 transition-all duration-300 ease-in-out
        ${isRightSidebarOpen ? 'translate-x-0 right-0 w-full sm:w-80' : 'translate-x-full right-0 xl:translate-x-0 w-full sm:w-80'}
        ${isDesktopRightSidebarOpen ? 'xl:w-80 opacity-100 p-5 sm:p-8' : 'xl:w-0 opacity-0 p-0 overflow-hidden'}
        flex flex-col overflow-y-auto no-scrollbar bg-srh-bg/80
      `}>
        <div className="xl:hidden absolute top-4 left-4">
          <button onClick={() => setIsRightSidebarOpen(false)} className="p-2 text-srh-textSecondary hover:text-srh-textPrimary">
            <X size={20} />
          </button>
        </div>

        <motion.div
          className="space-y-8 sm:space-y-12 min-w-0 sm:min-w-[280px] pt-12 xl:pt-0"
          initial="visible"
          animate="visible"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-srh-accent" />
                <h3 className="font-bold text-lg">Scholarships</h3>
              </div>
              <button
                onClick={() => fetchDynamicData('scholarships')}
                disabled={isFetchingData}
                className="p-2 hover:bg-srh-surface rounded-lg transition-colors text-srh-textSecondary hover:text-srh-primary"
                title="Refresh with AI"
              >
                <div className={isFetchingData ? "animate-spin text-srh-primary" : ""}>
                  <TrendingUp size={16} className="rotate-0" />
                </div>
              </button>
            </div>
            <div className="space-y-4">
              {scholarships.map(s => (
                <motion.div
                  key={s.id}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="p-4 glass-dark rounded-2xl border border-srh-primary/30 hover:border-srh-primary/30 transition-all cursor-pointer group relative overflow-hidden"
                >
                  {s.category && (
                    <div className={`absolute top-0 right-0 px-2 py-1 rounded-bl-xl text-[8px] font-bold uppercase tracking-wider
                      ${s.category === 'Most Applied' ? 'bg-srh-primary/20 text-srh-primary' : 'bg-srh-accent/20 text-srh-accent'}`}>
                      {s.category === 'Most Applied' ? '🔥 Top Choice' : '✅ Eligible'}
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2 mt-1">
                    <p className="font-bold text-xs flex-1 pr-6">{s.name}</p>
                    <div className="flex items-center gap-1.5 ml-2 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.status === 'Open' ? 'bg-srh-surface' : s.status === 'Closing Soon' ? 'bg-orange-400' : 'bg-srh-surface'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${s.status === 'Open' ? 'bg-srh-surface' : s.status === 'Closing Soon' ? 'bg-orange-500' : 'bg-srh-surface'}`}></span>
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${s.status === 'Open' ? 'text-srh-accent' : s.status === 'Closing Soon' ? 'text-orange-400' : 'text-srh-primary'}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] opacity-50">{s.provider}</p>

                  <div className="flex justify-between items-end mt-3">
                    <p className="text-srh-accent font-bold text-xs">{s.amount}</p>
                    <div className="text-right">
                      <p className="text-[9px] font-medium text-srh-textSecondary">
                        Deadline: <span className="text-srh-textPrimary font-bold">{s.deadline}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <a
                href="https://www.buddy4study.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 text-xs text-srh-accent/80 hover:text-srh-accent font-medium hover:bg-srh-surface rounded-xl transition-all"
              >
                View 250+ more on Buddy4Study ↗
              </a>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-srh-primary" />
                  <h3 className="font-bold text-lg">Top Universities</h3>
                </div>
                <button
                  onClick={() => fetchDynamicData('universities')}
                  disabled={isFetchingData}
                  className="p-2 hover:bg-srh-surface rounded-lg transition-colors text-srh-textSecondary hover:text-srh-primary"
                  title="Refresh with AI"
                >
                  <div className={isFetchingData ? "animate-spin text-srh-primary" : ""}>
                    <TrendingUp size={16} className="rotate-0" />
                  </div>
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 flex-wrap">
                {(['All', 'IIT', 'NIT', 'Private', 'Govt', 'GFTI'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setUniFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all border
                      ${uniFilter === filter
                        ? 'bg-srh-primary text-srh-textPrimary border-srh-primary'
                        : 'bg-srh-surface text-srh-textSecondary border-srh-primary/30 hover:bg-srh-surface'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
              {universities
                .filter(u => uniFilter === 'All' || u.type === uniFilter)
                .slice(0, 150) // Show all matches
                .map((u) => (
                  <motion.div
                    key={u.name}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-4 glass-dark rounded-2xl border border-srh-primary/30 hover:border-srh-primary/30 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 px-2 py-1 bg-srh-surface rounded-bl-xl text-[8px] font-bold text-srh-textPrimary/60">
                      Rank #{u.rank}
                    </div>

                    <div className="flex justify-between items-start mb-1 mt-2">
                      <p className="font-bold text-xs flex-1">{u.name}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] opacity-40">{u.location}</p>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider
                      ${u.type === 'IIT' ? 'bg-srh-surface text-srh-textPrimary border border-srh-primary/30' :
                          u.type === 'NIT' ? 'bg-srh-surface text-srh-textPrimary border border-srh-secondary/30' :
                            u.type === 'Private' ? 'bg-srh-surface text-srh-textPrimary border border-srh-accent/30' :
                              'bg-srh-primary/20 text-srh-primary'}`}>
                        {u.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </aside>
    </div>
  );
};

export default App;
