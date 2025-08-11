import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BookText, Wand2, Loader2, Presentation, FileText, ArrowLeft, ArrowRight,
  CheckCircle, PlusCircle, ImageIcon, X, Upload, Columns, Scissors, ArrowUp,
  ArrowDown, Quote, LayoutGrid, List, RefreshCw, Sparkles,
  Accessibility, Activity, Airplay, AlarmClock, AlertTriangle, Archive, Award,
  Backpack, BadgeCheck, Banknote, Bell, Bike, Binary, Bookmark, BrainCircuit,
  Briefcase, Brush, Bug, Building2, Bus, Calculator, Calendar, Camera, Car,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleUser, Clipboard,
  Clock, Cloud, Code, Cog, Coins, Compass, Computer, Copy, CreditCard, Crown,
  Database, Delete, Dna, DollarSign, Download, DraftingCompass, Drama, Dribbble,
  Droplet, Edit, Egg, Eraser, ExternalLink, Eye, Facebook, Feather, Figma, File,
  Film, Filter, Flag, Flame, FlaskConical, Folder, Footprints, GanttChart, Gem,
  Github, Gitlab, Globe, GraduationCap, Grid, Grip, HardDrive, Hash, Heart,
  HelpCircle, Home, Image, Inbox, Infinity, Info, Instagram, Key, Keyboard,

  Languages, Laptop, LifeBuoy, Lightbulb, Link, Linkedin, Lock, LogIn, LogOut,
  Mail, Map, Maximize, Menu, MessageCircle, Mic, Minimize, Monitor, Moon,
  MoreHorizontal, MousePointer, Move, Music, Newspaper, Package, Paintbrush,
  Paperclip, Pause, Pen, Percent, PersonStanding, Phone, PieChart, Pin, Play,
  Plug, Plus, Pocket, Podcast, Printer, Puzzle, Radio, Redo, Reply, Rocket,
  Rss, Save, School, ScreenShare, Send, Settings, Share2, Sheet, Shield,
  ShoppingBag, ShoppingCart, Sidebar, Signal, Smartphone, Smile, Speaker, Star, Sun, Table, Tablet, Tag, Target, Tent, Terminal, ThumbsDown,
  ThumbsUp, Timer, ToggleLeft, ToggleRight, Wrench, Trash2, TrendingUp, Truck,
  Twitter, Type, Underline, Undo, Unlink, Unlock, User, Users, Video, Voicemail,
  Volume2, Wallet, Watch, Wifi, Wind, Youtube, ZoomIn, ZoomOut, ListOrdered,
  Indent, Outdent, MessageSquare, BarChart2, Link2, AtSign, Mic2,
  Share, AppWindow, Square, Circle, Triangle, BarChart, LineChart,
  Palette, Heading1, Heading2, Search, Heading3, Heading4, AlertCircle, CheckSquare,
  ArrowDownToLine, Diamond, CircleDot, MoveRight, SplitSquareVertical
} from 'lucide-react';

// --- Mock Data ---
// This data simulates presentations that would be loaded from a database.
const MOCK_PRESENTATIONS = [
  {
    id: '1',
    title: 'Q2 Marketing Strategy',
    slides: Array(8).fill({}),
    theme: 'corporate_slate',
    created_date: new Date(2025, 5, 20).toISOString(),
  },
  {
    id: '2',
    title: 'The Future of Renewable Energy',
    slides: Array(12).fill({}),
    theme: 'oceanic_depth',
    created_date: new Date(2025, 5, 15).toISOString(),
  },
  {
    id: '3',
    title: 'Project Phoenix: Launch Plan',
    slides: Array(15).fill({}),
    theme: 'cyber_noir',
    created_date: new Date(2025, 4, 30).toISOString(),
  },
  {
    id: '4',
    title: 'A Brief History of Time',
    slides: Array(10).fill({}),
    theme: 'vintage_journal',
    created_date: new Date(2025, 3, 1).toISOString(),
  },
];

// --- Icon Library & Theme Definitions ---
// A mapping of icon names (strings) to their actual component from lucide-react.
const iconMap = {
  BookText, Wand2, Loader2, Presentation, FileText, ArrowLeft, ArrowRight,
  CheckCircle, PlusCircle, ImageIcon, X, Upload, Columns, Scissors, ArrowUp,
  ArrowDown, Quote, LayoutGrid, List, RefreshCw, Sparkles, Accessibility,
  Activity, Airplay, AlarmClock, AlertTriangle, Archive, Award, Backpack,
  BadgeCheck, Banknote, Bell, Bike, Binary, Bookmark, BrainCircuit, Briefcase,
  Brush, Bug, Building2, Bus, Calculator, Calendar, Camera, Car, ChevronDown,
  ChevronLeft, ChevronRight, ChevronUp, CircleUser, Clipboard, Clock, Cloud,
  Code, Cog, Coins, Compass, Computer, Copy, CreditCard, Crown, Database, Delete,
  Dna, DollarSign, Download, DraftingCompass, Drama, Dribbble, Droplet, Edit,
  Egg, Eraser, ExternalLink, Eye, Facebook, Feather, Figma, File, Film, Filter,
  Flag, Flame, FlaskConical, Folder, Footprints, GanttChart, Gem, Github, Gitlab,
  Globe, GraduationCap, Grid, Grip, HardDrive, Hash, Heart, HelpCircle, Home,
  Image, Inbox, Infinity, Info, Instagram, Key, Keyboard, Languages, Laptop,
  LifeBuoy, Lightbulb, Link, Linkedin, Lock, LogIn, LogOut, Mail, Map, Maximize,
  Menu, MessageCircle, Mic, Minimize, Monitor, Moon, MoreHorizontal, MousePointer,
  Move, Music, Newspaper, Package, Paintbrush, Paperclip, Pause, Pen, Percent,
  PersonStanding, Phone, PieChart, Pin, Play, Plug, Plus, Pocket, Podcast, Printer,
  Puzzle, Radio, Redo, Reply, Rocket, Rss, Save, School, ScreenShare, Send, Settings,
  Share2, Sheet, Shield, ShoppingBag, ShoppingCart, Sidebar, Signal, Smartphone,
  Smile, Speaker, Star, Sun, Table, Tablet, Tag, Target, Tent, Terminal,
  ThumbsDown, ThumbsUp, Timer, ToggleLeft, ToggleRight, Wrench, Trash2, TrendingUp,
  Truck, Twitter, Type, Underline, Undo, Unlink, Unlock, User, Users, Video,
  Voicemail, Volume2, Wallet, Watch, Wifi, Wind, Youtube, ZoomIn, ZoomOut,
  ListOrdered, Indent, Outdent, MessageSquare, BarChart2, Link2, AtSign, Mic2,
  Share, AppWindow, Square, Circle, Triangle, BarChart, LineChart, Palette,
  Heading1, Heading2, Search, Heading3, Heading4, AlertCircle, CheckSquare,
  ArrowDownToLine, Diamond, CircleDot, MoveRight, SplitSquareVertical
};

// A list of all available icon names for searching and selection.
const iconNames = Object.keys(iconMap);

// --- Theme Definitions ---
// Defines the color schemes and fonts for different presentation themes.
const themes = {
  oceanic_depth: {
    name: "Oceanic Depth",
    bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-extrabold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-light', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-white',
      subtitle: 'text-blue-200',
      text: 'text-gray-300',
      accent: 'text-cyan-400',
      blockquote_border: 'border-cyan-400'
    },
    styles: {
      placeholder: 'bg-black/20 backdrop-blur-sm',
      prose: 'prose-invert',
      image: 'rounded-lg shadow-lg',
      blockquote: 'border-l-4 italic'
    }
  },
  serene_sunrise: {
    name: "Serene Sunrise",
    bg: 'bg-gradient-to-br from-orange-200 via-rose-200 to-violet-300',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-gray-800',
      subtitle: 'text-gray-700',
      text: 'text-gray-600',
      accent: 'text-orange-600',
      blockquote_border: 'border-orange-600'
    },
    styles: {
      placeholder: 'bg-white/50 backdrop-blur-sm',
      prose: 'prose',
      image: 'rounded-xl shadow-md',
      blockquote: 'border-l-4 italic'
    }
  },
  corporate_slate: {
    name: "Corporate Slate",
    bg: 'bg-slate-100',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-extrabold', transform: 'uppercase' },
      subtitle: { family: 'font-inter', weight: 'font-semibold', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-slate-900',
      subtitle: 'text-slate-600',
      text: 'text-slate-500',
      accent: 'text-indigo-600',
      blockquote_border: 'border-indigo-600'
    },
    styles: {
      placeholder: 'bg-slate-200',
      prose: 'prose',
      image: 'rounded-md',
      blockquote: 'border-l-4'
    }
  },
  vintage_journal: {
    name: "Vintage Journal",
    bg: 'bg-[#fdf6e3]',
    slide: { padding: 'p-10 md:p-16' },
    font: {
      title: { family: 'font-roboto-slab', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'italic' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-[#586e75]',
      subtitle: 'text-[#657b83]',
      text: 'text-[#839496]',
      accent: 'text-[#cb4b16]',
      blockquote_border: 'border-[#cb4b16]'
    },
    styles: {
      placeholder: 'bg-[#eee8d5]/80',
      prose: 'prose',
      image: 'rounded-sm border-4 border-[#eee8d5] shadow-md',
      blockquote: 'border-l-4 italic'
    }
  },
  cyber_noir: {
    name: "Cyber Noir",
    bg: 'bg-black',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-orbitron', weight: 'font-bold', transform: 'uppercase' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'uppercase' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-fuchsia-400',
      subtitle: 'text-cyan-400',
      text: 'text-gray-300',
      accent: 'text-fuchsia-500',
      blockquote_border: 'border-fuchsia-500'
    },
    styles: {
      placeholder: 'bg-gray-900/80',
      prose: 'prose-invert',
      image: 'rounded-none border-2 border-fuchsia-500/50',
      blockquote: 'border-l-4 italic',
      title_glow: true
    }
  },
  monochrome_elegance: {
    name: "Monochrome Elegance",
    bg: 'bg-white',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-light', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-black',
      subtitle: 'text-gray-600',
      text: 'text-gray-800',
      accent: 'text-gray-900',
      blockquote_border: 'border-gray-900'
    },
    styles: {
      placeholder: 'bg-gray-200',
      prose: 'prose',
      image: 'rounded-lg shadow-md grayscale',
      blockquote: 'border-l-4'
    }
  },
  crimson_impact: {
    name: "Crimson Impact",
    bg: 'bg-gray-900',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-roboto-slab', weight: 'font-bold', transform: 'uppercase' },
      subtitle: { family: 'font-inter', weight: 'font-semibold', transform: 'uppercase' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-white',
      subtitle: 'text-red-300',
      text: 'text-gray-300',
      accent: 'text-red-500',
      blockquote_border: 'border-red-500'
    },
    styles: {
      placeholder: 'bg-red-900/20',
      prose: 'prose-invert',
      image: 'rounded-md',
      blockquote: 'border-l-4'
    }
  },
  forest_retreat: {
    name: "Forest Retreat",
    bg: 'bg-gradient-to-br from-green-50 to-[#e8f5e9]',
    slide: { padding: 'p-10 md:p-14' },
    font: {
      title: { family: 'font-roboto-slab', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-light' }
    },
    color: {
      title: 'text-green-900',
      subtitle: 'text-green-700',
      text: 'text-gray-700',
      accent: 'text-green-600',
      blockquote_border: 'border-green-600'
    },
    styles: {
      placeholder: 'bg-green-100',
      prose: 'prose',
      image: 'rounded-lg shadow-lg',
      blockquote: 'border-l-4'
    }
  },
  sunset_gradient: {
    name: "Sunset Gradient",
    bg: 'bg-gradient-to-tr from-yellow-200 via-red-300 to-pink-400',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-extrabold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-white',
      subtitle: 'text-pink-100',
      text: 'text-gray-800',
      accent: 'text-white',
      blockquote_border: 'border-white'
    },
    styles: {
      placeholder: 'bg-white/30',
      prose: 'prose',
      image: 'rounded-xl shadow-xl',
      blockquote: 'border-l-4 italic'
    }
  },
  blueprint: {
    name: "Blueprint",
    bg: 'bg-[#0a2342]',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-orbitron', weight: 'font-bold', transform: 'uppercase' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'uppercase' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-white',
      subtitle: 'text-cyan-300',
      text: 'text-blue-200',
      accent: 'text-cyan-400',
      blockquote_border: 'border-cyan-400'
    },
    styles: {
      placeholder: 'bg-blue-900/30',
      prose: 'prose-invert',
      image: 'rounded-none border-2 border-cyan-400/50',
      blockquote: 'border-l-2 border-dashed'
    }
  },
  art_deco: {
    name: "Art Deco",
    bg: 'bg-black',
    slide: { padding: 'p-12 md:p-16' },
    font: {
      title: { family: 'font-lexend', weight: 'font-extrabold', transform: 'uppercase' },
      subtitle: { family: 'font-inter', weight: 'font-light', transform: 'uppercase' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-yellow-300',
      subtitle: 'text-gray-400',
      text: 'text-gray-200',
      accent: 'text-yellow-400',
      blockquote_border: 'border-yellow-400'
    },
    styles: {
      placeholder: 'bg-gray-900',
      prose: 'prose-invert',
      image: 'rounded-none border-4 border-yellow-300',
      blockquote: 'border-l-0 border-r-4'
    }
  },
  pastel_dream: {
    name: "Pastel Dream",
    bg: 'bg-purple-50',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-purple-800',
      subtitle: 'text-pink-500',
      text: 'text-gray-700',
      accent: 'text-purple-600',
      blockquote_border: 'border-pink-500'
    },
    styles: {
      placeholder: 'bg-purple-100',
      prose: 'prose',
      image: 'rounded-full shadow-lg',
      blockquote: 'border-l-4 italic'
    }
  },
  academic: {
    name: "Academic",
    bg: 'bg-white',
    slide: { padding: 'p-10 md:p-14' },
    font: {
      title: { family: 'font-roboto-slab', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-semibold', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-light' }
    },
    color: {
      title: 'text-blue-900',
      subtitle: 'text-gray-700',
      text: 'text-gray-800',
      accent: 'text-blue-800',
      blockquote_border: 'border-blue-800'
    },
    styles: {
      placeholder: 'bg-gray-100',
      prose: 'prose',
      image: 'rounded-sm shadow-sm',
      blockquote: 'border-l-4 bg-gray-50 p-4'
    }
  },
  bubblegum: {
    name: "Bubblegum",
    bg: 'bg-pink-100',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-lexend', weight: 'font-extrabold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-pink-600',
      subtitle: 'text-purple-500',
      text: 'text-gray-700',
      accent: 'text-pink-500',
      blockquote_border: 'border-purple-500'
    },
    styles: {
      placeholder: 'bg-pink-200',
      prose: 'prose',
      image: 'rounded-2xl shadow-lg',
      blockquote: 'border-l-4 italic'
    }
  },
  earth_tones: {
    name: "Earth Tones",
    bg: 'bg-stone-200',
    slide: { padding: 'p-8 md:p-12' },
    font: {
      title: { family: 'font-roboto-slab', weight: 'font-bold', transform: 'normal-case' },
      subtitle: { family: 'font-inter', weight: 'font-normal', transform: 'normal-case' },
      body: { family: 'font-inter', weight: 'font-normal' }
    },
    color: {
      title: 'text-stone-800',
      subtitle: 'text-orange-900',
      text: 'text-stone-700',
      accent: 'text-orange-800',
      blockquote_border: 'border-orange-900'
    },
    styles: {
      placeholder: 'bg-stone-300',
      prose: 'prose',
      image: 'rounded-lg',
      blockquote: 'border-l-4'
    }
  }
};


// Generic Icon component to render an icon by its string name.
const Icon = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || BookText; // Fallback to a default icon
  return <IconComponent {...props} />;
};

// --- Floating Sidebar Categories ---
const sidebarCategories = [
  { id: 'themes', label: 'Themes', icon: 'Palette' },
  { id: 'layout', label: 'Layout', icon: 'LayoutGrid' },
  { id: 'slides', label: 'Slides', icon: 'Columns' },
  { id: 'text', label: 'Text', icon: 'Type' },
  { id: 'images', label: 'Images', icon: 'Image' },
  { id: 'media', label: 'Media', icon: 'Video' },
  { id: 'shapes', label: 'Shapes', icon: 'Square' },
  { id: 'charts', label: 'Charts', icon: 'BarChart2' },
  { id: 'diagrams', label: 'Diagrams', icon: 'GanttChart' },
  { id: 'ai', label: 'AI Tools', icon: 'Sparkles' },
];

// --- FloatingSidebar Component ---
const FloatingSidebar = ({ sidebarCollapsed, setSidebarCollapsed, activeSidebarCategory, setActiveSidebarCategory }) => {
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleSidebarCategory = (categoryId) => {
    if (activeSidebarCategory === categoryId) {
      setActiveSidebarCategory(null);
    } else {
      setActiveSidebarCategory(categoryId);
      if (sidebarCollapsed) setSidebarCollapsed(false);
    }
  };
  return (
    <div className={`floating-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!sidebarCollapsed && <h3 className="sidebar-title">Tools</h3>}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} />
        </button>
      </div>
      <div className="sidebar-categories">
        {sidebarCategories.map(cat => (
          <div
            key={cat.id}
            className={`sidebar-category ${activeSidebarCategory === cat.id ? 'active' : ''}`}
            onClick={() => toggleSidebarCategory(cat.id)}
            title={cat.label}
          >
            <div className="sidebar-category-icon"><Icon name={cat.icon} /></div>
            {!sidebarCollapsed && <div className="sidebar-category-label">{cat.label}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SidebarPanel Component (for tools) ---
const SidebarPanel = ({ activeSidebarCategory, setActiveSidebarCategory, presentationTheme, setPresentationTheme, themes, slides, setSlides, currentSlideIndex, setCurrentSlideIndex, cycleLayout, revertLayout, SlideRenderer, theme, callGeminiAPI, setError }) => {
  // State for various tools within the panel
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [wikiSearchQuery, setWikiSearchQuery] = useState('');
  const [wikiResults, setWikiResults] = useState([]);
  const [isSearchingWiki, setIsSearchingWiki] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');

  // Adds a new element (text, table, etc.) to the current slide.
  const addElementToSlide = (element) => {
    const newSlides = [...slides];
    const current = newSlides[currentSlideIndex];
    if (!current.content.elements) current.content.elements = [];
    current.content.elements.push({ ...element, id: Date.now() });
    setSlides(newSlides);
  };

  // Adds a pre-styled text box to the slide.
  const addTextBox = (textType = 'default') => {
    let content = 'Editable text box';
    let width = 300, height = 50;
    let style = {};
    switch (textType) {
      case 'title': content = 'Title'; style = { fontSize: '48px', fontWeight: 800 }; width = 600; break;
      case 'h1': content = 'Heading 1'; style = { fontSize: '36px', fontWeight: 700 }; width = 500; break;
      case 'h2': content = 'Heading 2'; style = { fontSize: '30px', fontWeight: 600 }; width = 480; break;
      case 'h3': content = 'Heading 3'; style = { fontSize: '26px', fontWeight: 600 }; width = 460; break;
      case 'h4': content = 'Heading 4'; style = { fontSize: '22px', fontWeight: 600 }; width = 440; break;
      case 'blockquote': content = 'Blockquote text'; style = { fontSize: '20px', fontStyle: 'italic', paddingLeft: '20px', borderLeft: `4px solid ${theme.color.blockquote_border.replace('border-', '')}` }; width = 500; height = 120; break;
      case 'bulleted-list': content = '• Item 1\n• Item 2\n• Item 3'; height = 120; break;
      case 'numbered-list': content = '1. Item 1\n2. Item 2\n3. Item 3'; height = 120; break;
      case 'todo-list': content = '☐ Task 1\n☐ Task 2\n☐ Task 3'; height = 120; break;
      case 'note-box': content = 'Note: This is a note box'; style = { background: 'rgba(99,102,241,0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.4)' }; width = 380; break;
      case 'info-box': content = 'Info: This is an information box'; style = { background: 'rgba(14,165,233,0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(14,165,233,0.4)' }; width = 380; break;
      case 'warning-box': content = 'Warning: This is a warning box'; style = { background: 'rgba(245,158,11,0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.4)' }; width = 380; break;
      case 'caution-box': content = 'Caution: This is a caution box'; style = { background: 'rgba(239,68,68,0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.4)' }; width = 380; break;
      case 'success-box': content = 'Success: This is a success box'; style = { background: 'rgba(16,185,129,0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.4)' }; width = 380; break;
      case 'question-box': content = 'Question: This is a question box'; style = { background: 'rgba(139,92,246,0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(139,92,246,0.4)' }; width = 380; break;
      case 'table-2x2': return addTableToSlide(2, 2);
      case 'table-3x3': return addTableToSlide(3, 3);
      case 'table-4x4': return addTableToSlide(4, 4);
      default: break;
    }
    addElementToSlide({ type: 'text', content, x: 8, y: 10, width, height, style, textType });
  };

  // Adds a table to the slide.
  const addTableToSlide = (rows, cols) => {
    const data = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => (r === 0 ? `Header ${c + 1}` : `R${r}C${c + 1}`))
    );
    addElementToSlide({ type: 'table', rows, cols, data, x: 12, y: 18, width: cols * 120, height: rows * 60, style: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' } });
  };

  // Adds an image to the slide's background/main image area.
  const addImageToSlide = (imageUrl) => {
    const newSlides = [...slides];
    const current = newSlides[currentSlideIndex];
    current.content.imageData = imageUrl;
    current.content.showImage = true;
    setSlides(newSlides);
  };

  // Adds a basic shape (as an SVG) to the slide.
  const addShapeToSlide = (shape) => {
    let svg;
    const fill = theme.color.accent.replace('text-', '') || '#6366f1';
    if (shape === 'rect') {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect rx="8" x="8" y="15" width="84" height="70" fill="${fill}"/></svg>`;
    } else if (shape === 'circle') {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${fill}" /></svg>`;
    }
    if (svg) {
      const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
      addImageToSlide(dataUrl);
    }
  };

  // Adds a pre-made chart/diagram (as an SVG) to the slide.
  const addChartToSlide = (chartType) => {
    const accentColor = theme.color.accent.replace('text-', '') || '#6366f1';
    const secondaryColor = '#60a5fa';
    const tertiaryColor = '#93c5fd';
    const quaternaryColor = '#bfdbfe';
    let svg;
    switch (chartType) {
      case 'bar': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="10" y="30" width="15" height="60" fill="${accentColor}"/><rect x="35" y="20" width="15" height="70" fill="${secondaryColor}"/><rect x="60" y="10" width="15" height="80" fill="${tertiaryColor}"/><rect x="85" y="45" width="15" height="45" fill="${quaternaryColor}"/><line x1="0" y1="90" x2="120" y2="90" stroke="#666" stroke-width="1"/></svg>`; break;
      case 'column': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="10" y="60" width="15" height="30" fill="${accentColor}"/><rect x="35" y="40" width="15" height="50" fill="${secondaryColor}"/><rect x="60" y="20" width="15" height="70" fill="${tertiaryColor}"/><rect x="85" y="50" width="15" height="40" fill="${quaternaryColor}"/><line x1="0" y1="90" x2="120" y2="90" stroke="#666" stroke-width="1"/></svg>`; break;
      case 'line': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><polyline points="10,70 30,50 50,60 70,30 90,40 110,25" fill="none" stroke="${accentColor}" stroke-width="3"/><polyline points="10,65 30,45 50,55 70,25 90,35 110,20" fill="none" stroke="${secondaryColor}" stroke-width="3" opacity="0.7"/></svg>`; break;
      case 'pie': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${quaternaryColor}" /><path d="M50 50 L50 10 A40 40 0 0 1 90 50 Z" fill="${accentColor}"/><path d="M50 50 L90 50 A40 40 0 0 1 50 90 Z" fill="${secondaryColor}"/><path d="M50 50 L50 90 A40 40 0 0 1 10 50 Z" fill="${tertiaryColor}"/></svg>`; break;
      case 'donut': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${quaternaryColor}" /><circle cx="50" cy="50" r="18" fill="white"/><path d="M50 50 L50 10 A40 40 0 0 1 90 50 Z" fill="${accentColor}"/><path d="M50 50 L90 50 A40 40 0 0 1 50 90 Z" fill="${secondaryColor}"/><path d="M50 50 L50 90 A40 40 0 0 1 10 50 Z" fill="${tertiaryColor}"/></svg>`; break;
      case 'timeline-horizontal': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60"><line x1="10" y1="30" x2="130" y2="30" stroke="${accentColor}" stroke-width="2"/><circle cx="30" cy="30" r="6" fill="${accentColor}"/><circle cx="70" cy="30" r="6" fill="${secondaryColor}"/><circle cx="110" cy="30" r="6" fill="${tertiaryColor}"/><text x="30" y="50" font-size="8" text-anchor="middle">Start</text><text x="70" y="50" font-size="8" text-anchor="middle">Mid</text><text x="110" y="50" font-size="8" text-anchor="middle">End</text></svg>`; break;
      case 'timeline-vertical': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 140"><line x1="30" y1="10" x2="30" y2="130" stroke="${accentColor}" stroke-width="2"/><circle cx="30" cy="40" r="6" fill="${accentColor}"/><circle cx="30" cy="80" r="6" fill="${secondaryColor}"/><circle cx="30" cy="120" r="6" fill="${tertiaryColor}"/><text x="35" y="42" font-size="8">Phase 1</text><text x="35" y="82" font-size="8">Phase 2</text><text x="35" y="122" font-size="8">Phase 3</text></svg>`; break;
      case 'blank': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="10" y="10" width="100" height="80" fill="none" stroke="${accentColor}" stroke-dasharray="4 4"/><text x="60" y="55" text-anchor="middle" font-size="10" fill="${accentColor}">Blank</text></svg>`; break;
      case 'venn': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"><circle cx="50" cy="40" r="28" fill="${accentColor}" opacity="0.55"/><circle cx="70" cy="40" r="28" fill="${secondaryColor}" opacity="0.55"/><text x="40" y="40" font-size="10" fill="#111" text-anchor="middle">A</text><text x="80" y="40" font-size="10" fill="#111" text-anchor="middle">B</text><text x="60" y="40" font-size="10" fill="#111" text-anchor="middle">∩</text></svg>`; break;
      case 'chain': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60"><rect x="10" y="15" width="40" height="30" rx="6" fill="${accentColor}" /><rect x="60" y="15" width="40" height="30" rx="6" fill="${secondaryColor}" /><rect x="110" y="15" width="40" height="30" rx="6" fill="${tertiaryColor}" /><line x1="50" y1="30" x2="60" y2="30" stroke="#fff" stroke-width="3"/><line x1="100" y1="30" x2="110" y2="30" stroke="#fff" stroke-width="3"/></svg>`; break;
      case 'bullseye': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="${quaternaryColor}" /><circle cx="60" cy="60" r="36" fill="${tertiaryColor}" /><circle cx="60" cy="60" r="24" fill="${secondaryColor}" /><circle cx="60" cy="60" r="12" fill="${accentColor}" /></svg>`; break;
      case 'ribbon': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 70"><path d="M10 20 H150 L135 35 L150 50 H10 L25 35 Z" fill="${accentColor}" opacity="0.9"/><path d="M10 45 H150 L140 55 L150 65 H10 L20 55 Z" fill="${secondaryColor}" opacity="0.8"/></svg>`; break;
      case 'ideas': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120"><circle cx="70" cy="40" r="25" fill="${accentColor}"/><line x1="55" y1="55" x2="40" y2="85" stroke="#444" stroke-width="3"/><line x1="70" y1="60" x2="70" y2="88" stroke="#444" stroke-width="3"/><line x1="85" y1="55" x2="100" y2="85" stroke="#444" stroke-width="3"/><rect x="30" y="85" width="25" height="18" rx="4" fill="${secondaryColor}"/><rect x="60" y="85" width="25" height="18" rx="4" fill="${tertiaryColor}"/><rect x="90" y="85" width="25" height="18" rx="4" fill="${quaternaryColor}"/></svg>`; break;
      case 'inputs': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><rect x="65" y="70" width="30" height="25" rx="4" fill="${accentColor}"/><text x="80" y="86" font-size="10" fill="#111" text-anchor="middle">Output</text><rect x="20" y="20" width="30" height="18" rx="4" fill="${secondaryColor}"/><rect x="65" y="20" width="30" height="18" rx="4" fill="${tertiaryColor}"/><rect x="110" y="20" width="30" height="18" rx="4" fill="${quaternaryColor}"/><line x1="35" y1="38" x2="80" y2="70" stroke="#666" stroke-width="2"/><line x1="80" y1="38" x2="80" y2="70" stroke="#666" stroke-width="2"/><line x1="125" y1="38" x2="80" y2="70" stroke="#666" stroke-width="2"/></svg>`; break;
      case 'quadrant': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" fill="none" stroke="${accentColor}" stroke-width="2"/><line x1="60" y1="10" x2="60" y2="110" stroke="${accentColor}" stroke-width="2"/><line x1="10" y1="60" x2="110" y2="60" stroke="${accentColor}" stroke-width="2"/><text x="35" y="40" font-size="12" text-anchor="middle">Q1</text><text x="85" y="40" font-size="12" text-anchor="middle">Q2</text><text x="35" y="90" font-size="12" text-anchor="middle">Q3</text><text x="85" y="90" font-size="12" text-anchor="middle">Q4</text></svg>`; break;
      case 'swoosh': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><path d="M10 60 Q80 10 150 40" fill="none" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/><polygon points="142,34 154,41 141,46" fill="${accentColor}"/></svg>`; break;
      case 'versus': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 80"><rect x="20" y="20" width="50" height="40" rx="6" fill="${accentColor}"/><rect x="110" y="20" width="50" height="40" rx="6" fill="${secondaryColor}"/><text x="45" y="47" font-size="18" fill="#fff" text-anchor="middle">A</text><text x="135" y="47" font-size="18" fill="#fff" text-anchor="middle">B</text><text x="90" y="47" font-size="20" fill="#444" text-anchor="middle">VS</text></svg>`; break;
      case 'infinity': svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><path d="M50,50 C50,30 70,30 90,50 C110,70 130,70 150,50 C170,30 150,10 130,30 C110,50 90,50 70,30 C55,15 30,30 50,50 Z" fill="none" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/></svg>`; break;
      default: svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="10" y="10" width="100" height="80" fill="none" stroke="${accentColor}" stroke-dasharray="4 4"/><text x="60" y="55" text-anchor="middle" font-size="10" fill="${accentColor}">${chartType}</text></svg>`;
    }
    const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
    addImageToSlide(dataUrl);
  };

  // Calls the image generation API.
  const handleGenerateImage = async () => {
    if (!aiImagePrompt) return;
    setIsGeneratingImage(true);
    setError(null);
    try {
      const payload = { instances: [{ prompt: aiImagePrompt }], parameters: { sampleCount: 1 } };
      const apiKey = ""; // API key is handled by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (result.predictions && result.predictions[0]?.bytesBase64Encoded) {
        addImageToSlide(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
      } else {
        throw new Error('No image data received from API.');
      }
    } catch (e) {
      console.error("Image generation failed:", e);
      setError('Failed to generate AI image.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Searches Wikimedia Commons for images.
  const handleSearchWiki = async () => {
    if (!wikiSearchQuery) return;
    setIsSearchingWiki(true);
    setWikiResults([]);
    setError(null);
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${wikiSearchQuery}&srprop=snippet&format=json&origin=*`;
      const searchResp = await fetch(searchUrl);
      const searchData = await searchResp.json();
      const titles = searchData.query.search.map(item => item.title);

      if (titles.length) {
        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${titles.join('|')}&prop=pageimages&format=json&pithumbsize=500&origin=*`;
        const imgResp = await fetch(imageUrl);
        const imgData = await imgResp.json();
        const pages = imgData.query.pages;
        const results = Object.values(pages).filter(p => p.thumbnail).map(p => ({
          id: p.pageid, title: p.title, url: p.thumbnail.source
        }));
        setWikiResults(results);
      }
    } catch (e) {
      console.error("Wikimedia search failed:", e);
      setError('Failed to search Wikimedia.');
    } finally {
      setIsSearchingWiki(false);
    }
  };
  
  // Runs a specified AI tool on the current slide's content.
  const runAiTool = async (tool) => {
    const currentSlide = slides[currentSlideIndex];
    const textContent = `Title: ${currentSlide.content.title}\nSubtitle: ${currentSlide.content.subtitle}\nContent: ${currentSlide.content.items.map(i => i.text).join('\n- ')}`;
    let prompt;
    switch (tool) {
      case 'concise': prompt = `Make the following slide content more concise:\n\n${textContent}`; break;
      case 'talking_points': prompt = `Generate 3-4 brief talking points for a presenter based on this slide content:\n\n${textContent}`; break;
      default: return;
    }
    try {
      const result = await callGeminiAPI(prompt);
      alert(`AI Suggestion:\n\n${result}`);
    } catch {
      setError('AI tool failed.');
    }
  };

  // Adds various media types (local files, embeds) to the slide.
  const addMediaToSlide = async (mediaType) => {
    let mediaElement;
    const urlVal = mediaUrl.trim();
    const add = () => {
      if (mediaElement) {
        addElementToSlide(mediaElement);
        setMediaUrl('');
      }
    };
    switch (mediaType) {
      case 'gallery': {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = 'image/*'; input.multiple = true;
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => addImageToSlide(ev.target.result);
            reader.readAsDataURL(file);
          }
        };
        input.click();
        return;
      }
      case 'video-embed': {
        if (!urlVal) { setError('Enter a media URL first'); return; }
        mediaElement = { type: 'embed', embedType: 'video', url: urlVal, x: 10, y: 10, width: 560, height: 315 };
        add();
        return;
      }
      case 'youtube': {
        if (!urlVal) { setError('Enter YouTube URL'); return; }
        let videoId = '';
        try {
          if (urlVal.includes('youtu.be/')) videoId = urlVal.split('youtu.be/')[1].split(/[?&]/)[0];
          else videoId = new URL(urlVal).searchParams.get('v') || '';
        } catch { /* ignore invalid URL */ }
        if (!videoId) { setError('Invalid YouTube URL'); return; }
        mediaElement = { type: 'embed', embedType: 'youtube', videoId, x: 10, y: 10, width: 560, height: 315 };
        add();
        return;
      }
      case 'vimeo': {
        if (!urlVal) { setError('Enter Vimeo URL'); return; }
        const match = urlVal.match(/vimeo\.com\/(?:share\/video\/)?(\d+)/);
        if (!match) { setError('Invalid Vimeo URL'); return; }
        mediaElement = { type: 'embed', embedType: 'vimeo', videoId: match[1], x: 10, y: 10, width: 560, height: 315 };
        add();
        return;
      }
      case 'tiktok': {
        if (!urlVal) { setError('Enter TikTok URL'); return; }
        mediaElement = { type: 'embed', embedType: 'tiktok', url: urlVal, x: 10, y: 10, width: 325, height: 575 };
        add();
        return;
      }
      case 'spotify': {
        if (!urlVal) { setError('Enter Spotify URL'); return; }
        let spotifyId = '', spotifyType = '';
        if (urlVal.includes('/track/')) { spotifyType = 'track'; spotifyId = urlVal.split('/track/')[1].split('?')[0]; }
        else if (urlVal.includes('/playlist/')) { spotifyType = 'playlist'; spotifyId = urlVal.split('/playlist/')[1].split('?')[0]; }
        else if (urlVal.includes('/album/')) { spotifyType = 'album'; spotifyId = urlVal.split('/album/')[1].split('?')[0]; }
        else { setError('Unsupported Spotify URL'); return; }
        mediaElement = { type: 'embed', embedType: 'spotify', spotifyType, spotifyId, x: 10, y: 10, width: (spotifyType === 'track' ? 340 : 480), height: (spotifyType === 'track' ? 152 : 480) };
        add();
        return;
      }
      case 'wistia': {
        if (!urlVal) { setError('Enter Wistia URL'); return; }
        const match = urlVal.match(/wistia\.com\/(?:medias|embed)\/([a-zA-Z0-9]+)/);
        if (!match) { setError('Invalid Wistia URL'); return; }
        mediaElement = { type: 'embed', embedType: 'wistia', videoId: match[2], x: 10, y: 10, width: 560, height: 315 };
        add();
        return;
      }
      case 'loom': {
        if (!urlVal) { setError('Enter Loom URL'); return; }
        const match = urlVal.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
        if (!match) { setError('Invalid Loom URL'); return; }
        mediaElement = { type: 'embed', embedType: 'loom', videoId: match[2], x: 10, y: 10, width: 560, height: 315 };
        add();
        return;
      }
      default:
        setError(`Unsupported media type: ${mediaType}`);
    }
  };

  if (!activeSidebarCategory) return null;

  const currentSlideData = slides[currentSlideIndex];

  // Renders the content of the panel based on the active category.
  const panelContent = () => {
    switch (activeSidebarCategory) {
      case 'themes':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Presentation Themes</h4>
            <div className="panel-items">
              {Object.entries(themes).map(([key, t]) => (
                <div key={key} className={`panel-item ${presentationTheme === key ? 'active' : ''}`} onClick={() => setPresentationTheme(key)}>
                  <div className="panel-item-icon"><div className={`theme-preview ${t.bg}`}></div></div>
                  <div className="panel-item-title">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'layout':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Magic Layouts</h4>
            <button onClick={() => revertLayout(currentSlideIndex)} className="w-full flex items-center justify-center gap-2 text-sm px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md mb-4 text-white">
              <RefreshCw size={14} /> Revert to Original
            </button>
            <div className="space-y-2">
              {['default', 'image_top', 'icon_list', 'feature_grid', 'quote', 'centered_text', 'two_column_list', 'timeline'].map(layout => (
                <div key={layout}>
                  <p className="text-xs font-semibold text-cyan-400 mb-1 capitalize">{layout.replace(/_/g, ' ')}</p>
                  <div onClick={() => cycleLayout(currentSlideIndex, layout)} className={`p-1 rounded-md border-2 border-gray-700 cursor-pointer hover:border-cyan-500 transition-all ${currentSlideData?.layout_type === layout ? 'bg-cyan-900/50 border-cyan-500' : 'bg-gray-900'}`}>
                    <div className="w-full h-24">
                      <SlideRenderer slideData={{ ...currentSlideData, layout_type: layout }} theme={theme} isPreview={true} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'slides':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Slides</h4>
            <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2">
              {slides.map((slide, i) => (
                <div key={slide.id || i} className="relative group flex-shrink-0">
                  <span className="absolute top-1 right-1 text-xs bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center z-10">{i + 1}</span>
                  <button onClick={() => setCurrentSlideIndex(i)} className={`w-full aspect-video rounded-md border-2 transition-all ${currentSlideIndex === i ? 'border-indigo-500' : 'border-transparent hover:border-indigo-700'}`}>
                    <div className={`w-full h-full ${theme.bg} rounded-md overflow-hidden`}>
                      <SlideRenderer slideData={slide} theme={theme} isPreview={true} />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Basic Blocks</h4>
            <p className="text-sm text-gray-400 mb-3">Add structured text elements.</p>
            <h5 className="text-xs font-semibold text-gray-300 mb-2 mt-4">Text</h5>
            <div className="panel-items">
              {[['title', 'Type', 'Title'], ['h1', 'Heading1', 'Heading 1'], ['h2', 'Heading2', 'Heading 2'], ['h3', 'Heading3', 'Heading 3'], ['h4', 'Heading4', 'Heading 4'], ['blockquote', 'Quote', 'Blockquote']].map(([t, icon, label]) => (
                <button key={t} className="panel-item" onClick={() => addTextBox(t)}>
                  <div className="panel-item-icon"><Icon name={icon} size={24} style={{ color: '#6366f1' }} /></div>
                  <div className="panel-item-title">{label}</div>
                </button>
              ))}
            </div>
            <h5 className="text-xs font-semibold text-gray-300 mb-2 mt-4">Tables</h5>
            <div className="panel-items">
              {['table-2x2', 'table-3x3', 'table-4x4'].map(t => (
                <button key={t} className="panel-item" onClick={() => addTextBox(t)}>
                  <div className="panel-item-icon"><Icon name="Table" size={24} style={{ color: '#6366f1' }} /></div>
                  <div className="panel-item-title">{t.replace('table-', '')}</div>
                </button>
              ))}
            </div>
            <h5 className="text-xs font-semibold text-gray-300 mb-2 mt-4">Lists</h5>
            <div className="panel-items">
              {[['bulleted-list', 'List', 'Bulleted'], ['numbered-list', 'ListOrdered', 'Numbered'], ['todo-list', 'CheckSquare', 'Todo']].map(([t, icon, label]) => (
                <button key={t} className="panel-item" onClick={() => addTextBox(t)}>
                  <div className="panel-item-icon"><Icon name={icon} size={24} style={{ color: '#6366f1' }} /></div>
                  <div className="panel-item-title">{label}</div>
                </button>
              ))}
            </div>
            <h5 className="text-xs font-semibold text-gray-300 mb-2 mt-4">Callouts</h5>
            <div className="panel-items">
              {[['note-box', 'FileText', 'Note'], ['info-box', 'Info', 'Info'], ['warning-box', 'AlertTriangle', 'Warning'], ['caution-box', 'AlertCircle', 'Caution'], ['success-box', 'CheckCircle', 'Success'], ['question-box', 'HelpCircle', 'Question']].map(([t, icon, label]) => (
                <button key={t} className="panel-item" onClick={() => addTextBox(t)}>
                  <div className="panel-item-icon"><Icon name={icon} size={24} style={{ color: '#6366f1' }} /></div>
                  <div className="panel-item-title">{label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'images':
        return (
          <>
            <div className="panel-section">
              <h4 className="panel-section-title">AI Image Generation</h4>
              <div className="flex flex-col gap-2">
                <input type="text" value={aiImagePrompt} onChange={e => setAiImagePrompt(e.target.value)} placeholder="Describe an image..." className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white" />
                <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white disabled:opacity-50">
                  {isGeneratingImage ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} Generate
                </button>
              </div>
            </div>
            <div className="panel-section">
              <h4 className="panel-section-title">Search Wikimedia</h4>
              <div className="flex flex-col gap-2">
                <input type="text" value={wikiSearchQuery} onChange={e => setWikiSearchQuery(e.target.value)} placeholder="Search for images..." className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white" />
                <button onClick={handleSearchWiki} disabled={isSearchingWiki} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white disabled:opacity-50">
                  {isSearchingWiki ? <Loader2 className="animate-spin" size={16} /> : <Icon name="Search" size={16} />} Search
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {wikiResults.map(r => (<img key={r.id} src={r.url} alt={r.title} onClick={() => addImageToSlide(r.url)} className="w-full h-auto rounded-md cursor-pointer hover:opacity-80" />))}
              </div>
            </div>
          </>
        );
      case 'media':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Videos & Media</h4>
            <p className="text-sm text-gray-400 mb-3">Upload or embed from popular platforms.</p>
            <input type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="Enter media URL..." className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white mb-3" />
            <div className="grid grid-cols-2 gap-2">
              {[['gallery', 'Image', 'Gallery'], ['video-embed', 'Play', 'Video/Audio'], ['loom', 'Video', 'Loom'], ['youtube', 'Youtube', 'YouTube'], ['vimeo', 'Video', 'Vimeo'], ['wistia', 'Video', 'Wistia'], ['tiktok', 'Video', 'TikTok'], ['spotify', 'Music', 'Spotify']].map(([key, icon, label]) => (
                <button key={key} className="media-option-button" onClick={() => addMediaToSlide(key)}>
                  <div className="media-option-icon" style={{ background: 'rgba(99,102,241,0.15)' }}><Icon name={icon} size={22} style={{ color: '#6366f1' }} /></div>
                  <div className="media-option-label">{label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'shapes':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Add Shape</h4>
            <div className="panel-items">
              <button className="panel-item" onClick={() => addShapeToSlide('rect')}><div className="panel-item-icon"><Icon name="Square" size={24} /></div><div className="panel-item-title">Rectangle</div></button>
              <button className="panel-item" onClick={() => addShapeToSlide('circle')}><div className="panel-item-icon"><Icon name="Circle" size={24} /></div><div className="panel-item-title">Circle</div></button>
            </div>
          </div>
        );
      case 'charts':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Charts & Graphs</h4>
            <p className="text-sm text-gray-400 mb-3">Visualize data and information.</p>
            <h5 className="text-xs font-semibold text-gray-300 mb-2 mt-4">Charts</h5>
            <div className="panel-items">
              {[['column', 'BarChart2', 'Column'], ['bar', 'BarChart', 'Bar'], ['line', 'LineChart', 'Line'], ['pie', 'PieChart', 'Pie'], ['donut', 'Circle', 'Donut'], ['timeline-horizontal', 'ArrowRight', 'Timeline H'], ['timeline-vertical', 'ArrowDown', 'Timeline V'], ['blank', 'FileText', 'Blank']].map(([t, icon, label]) => (
                <button key={t} className="panel-item" onClick={() => addChartToSlide(t)}><div className="panel-item-icon"><Icon name={icon} size={22} /></div><div className="panel-item-title">{label}</div></button>
              ))}
            </div>
          </div>
        );
      case 'diagrams':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">Smart Diagrams</h4>
            <p className="text-sm text-gray-400 mb-3">Visual shapes & conceptual visuals.</p>
            <div className="panel-items">
              {[['venn', 'Circle', 'Venn'], ['chain', 'Link', 'Chain'], ['bullseye', 'Target', 'Bullseye'], ['ribbon', 'ArrowRight', 'Ribbon'], ['ideas', 'Lightbulb', 'Ideas'], ['inputs', 'ArrowDownToLine', 'Inputs'], ['quadrant', 'Grid', 'Quadrant'], ['swoosh', 'Wind', 'Swoosh'], ['versus', 'SplitSquareVertical', 'Versus'], ['infinity', 'Infinity', 'Infinity']].map(([t, icon, label]) => (
                <button key={t} className="panel-item" onClick={() => addChartToSlide(t)}><div className="panel-item-icon"><Icon name={icon} size={22} /></div><div className="panel-item-title">{label}</div></button>
              ))}
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="panel-section">
            <h4 className="panel-section-title">AI Content Tools</h4>
            <div className="panel-items grid-cols-1">
              <button className="panel-item" onClick={() => runAiTool('concise')}><div className="panel-item-icon"><Icon name="Scissors" size={24} /></div><div className="panel-item-title">Make Concise</div></button>
              <button className="panel-item" onClick={() => runAiTool('talking_points')}><div className="panel-item-icon"><Icon name="MessageSquare" size={24} /></div><div className="panel-item-title">Talking Points</div></button>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-400 p-4">Select a category.</div>;
    }
  };

  return (
    <div className={`sidebar-panel ${activeSidebarCategory ? 'active' : ''}`}>
      <div className="sidebar-panel-header">
        <h3 className="sidebar-panel-title">{sidebarCategories.find(c => c.id === activeSidebarCategory)?.label}</h3>
        <button className="sidebar-panel-close" onClick={() => setActiveSidebarCategory(null)}><Icon name="X" /></button>
      </div>
      <div className="sidebar-panel-content">{panelContent()}</div>
    </div>
  );
};

// --- PreviewScreen Component ---
const PreviewScreen = ({ slides, theme, currentSlideIndex, setCurrentSlideIndex, togglePreviewMode, SlideRenderer }) => {
  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) setCurrentSlideIndex(currentSlideIndex + 1);
  }, [currentSlideIndex, slides.length, setCurrentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  }, [currentSlideIndex, setCurrentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'Escape') togglePreviewMode();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, togglePreviewMode]);

  return (
    <div className={`fixed inset-0 z-50 ${theme.bg}`}>
      <button onClick={togglePreviewMode} className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 text-white"><X size={24} /></button>
      <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 disabled:opacity-30 text-white"><ChevronLeft size={24} /></button>
      <button onClick={nextSlide} disabled={currentSlideIndex === slides.length - 1} className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 disabled:opacity-30 text-white"><ChevronRight size={24} /></button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-sm bg-black bg-opacity-50 px-3 py-1 rounded-lg text-white">{currentSlideIndex + 1} / {slides.length}</div>
      <div className="h-screen w-screen flex items-center justify-center p-16 box-border">
        <div className={`max-w-6xl w-full h-full ${theme.styles.prose} flex flex-col justify-center`}>
          <SlideRenderer slideData={slides[currentSlideIndex]} theme={theme} isPresentationMode={true} />
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
const Dashboard = ({ setAppStep }) => {
  const [recentPresentations, setRecentPresentations] = useState([]);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, avgSlides: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 1000)); // Simulate API call
      const all = MOCK_PRESENTATIONS;
      setRecentPresentations(all.slice(0, 3));
      const thisMonth = new Date(); thisMonth.setDate(1);
      const thisMonthCount = all.filter(p => new Date(p.created_date) >= thisMonth).length;
      const avgSlides = all.length ? Math.round(all.reduce((s, p) => s + (p.slides?.length || 0), 0) / all.length) : 0;
      setStats({ total: all.length, thisMonth: thisMonthCount, avgSlides });
      setIsLoading(false);
    };
    loadDashboardData();
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Welcome to PresentAI</h1>
            <p className="text-purple-200 text-lg">Create stunning presentations with the power of AI</p>
          </div>
          <button onClick={() => setAppStep('start')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg rounded-lg flex items-center gap-2">
            <Icon name="Plus" className="w-5 h-5" /> Create New Presentation
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl p-6 rounded-xl">
            <div className="flex items-center justify-between pb-2"><h3 className="text-sm font-medium text-blue-200">Total Presentations</h3><Icon name="Presentation" className="w-4 h-4 text-blue-400" /></div>
            <div><div className="text-2xl font-bold">{stats.total}</div><p className="text-xs text-blue-300 mt-1">All time</p></div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-xl p-6 rounded-xl">
            <div className="flex items-center justify-between pb-2"><h3 className="text-sm font-medium text-green-200">This Month</h3><Icon name="TrendingUp" className="w-4 h-4 text-green-400" /></div>
            <div><div className="text-2xl font-bold">{stats.thisMonth}</div><p className="text-xs text-green-300 mt-1">New presentations</p></div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl p-6 rounded-xl">
            <div className="flex items-center justify-between pb-2"><h3 className="text-sm font-medium text-purple-200">Average Slides</h3><Icon name="Sparkles" className="w-4 h-4 text-purple-400" /></div>
            <div><div className="text-2xl font-bold">{stats.avgSlides}</div><p className="text-xs text-purple-300 mt-1">Per presentation</p></div>
          </div>
        </div>
        <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-xl">
          <div className="p-6 flex items-center justify-between">
            <div><h2 className="text-xl font-bold">Recent Presentations</h2><p className="text-purple-300 mt-1">Your latest creations</p></div>
            <button onClick={() => setAppStep('presentations')} className="px-4 py-2 border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 rounded-md text-sm">View All</button>
          </div>
          <div className="p-6 pt-0">
            {isLoading ? (
              <div className="space-y-4">{[...Array(3)].map((_, i) => (<div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl animate-pulse"><div className="w-16 h-12 bg-purple-500/20 rounded-lg"></div><div className="flex-1 space-y-2"><div className="h-4 bg-purple-500/20 rounded w-3/4"></div><div className="h-3 bg-purple-500/10 rounded w-1/2"></div></div></div>))}</div>
            ) : recentPresentations.length ? (
              <div className="space-y-4">
                {recentPresentations.map(p => (
                  <button key={p.id} className="w-full text-left" onClick={() => console.log(`Editing presentation ID: ${p.id}`)}>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-purple-500/30">
                      <div className="w-16 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"><Icon name="Presentation" className="w-6 h-6 text-white" /></div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{p.title || 'Untitled'}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-purple-300"><span className="flex items-center gap-1"><Icon name="Clock" className="w-4 h-4" />{formatDate(p.created_date)}</span><span>{p.slides?.length || 0} slides</span><span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs capitalize">{p.theme?.replace('_', ' ')}</span></div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Presentation" className="w-16 h-16 text-purple-400/50 mx-auto mb-4" /><h3 className="text-lg font-semibold mb-2">No presentations yet</h3><p className="text-purple-300 mb-6">Create your first AI-powered presentation</p>
                <button onClick={() => setAppStep('start')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"><Icon name="Plus" className="w-4 h-4" /> Get Started</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PresentationsPage Component ---
const PresentationsPage = ({ setAppStep }) => {
  const [presentations, setPresentations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 1000)); // Simulate API call
      setPresentations(MOCK_PRESENTATIONS);
      setIsLoading(false);
    };
    load();
  }, []);

  const deletePresentation = (id) => {
    console.log(`(Mock) Deleting presentation ID: ${id}`);
    setPresentations(p => p.filter(x => x.id !== id));
  };

  const filtered = presentations.filter(p =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.theme?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setAppStep('dashboard')} className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200"><Icon name="ArrowLeft" className="w-4 h-4" /> Back to Dashboard</button>
          <button onClick={() => setAppStep('start')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Icon name="Plus" className="w-4 h-4" /> New Presentation</button>
        </div>
        <div className="text-center mb-8"><h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">My Presentations</h1><p className="text-purple-200 text-lg">Manage and edit your presentations</p></div>
        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 mb-8 p-6 rounded-xl">
          <div className="relative"><Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" /><input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search presentations by title or theme..." className="w-full pl-10 pr-4 py-2 bg-white/10 border border-purple-500/30 text-white placeholder-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" /></div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => (<div key={i} className="bg-black/20 border border-purple-500/20 rounded-xl animate-pulse"><div className="aspect-video bg-purple-500/10 rounded-t-lg"></div><div className="p-4"><div className="h-4 bg-purple-500/20 rounded mb-2"></div><div className="h-3 bg-purple-500/10 rounded w-2/3"></div></div></div>))}</div>
        ) : filtered.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-black/20 backdrop-blur-xl border border-purple-500/20 group hover:border-purple-400/50 transition-all duration-300 rounded-xl flex flex-col">
                <div className="relative">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
                    <button onClick={() => console.log(`Editing presentation ID: ${p.id}`)} className="p-2 bg-blue-500/80 hover:bg-blue-600 rounded-md"><Icon name="Edit" className="w-4 h-4 text-white" /></button>
                    <button onClick={() => deletePresentation(p.id)} className="p-2 bg-red-500/80 hover:bg-red-600 rounded-md"><Icon name="Trash2" className="w-4 h-4 text-white" /></button>
                  </div>
                  <button onClick={() => console.log(`Viewing presentation ID: ${p.id}`)} className="w-full"><div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-t-lg flex items-center justify-center"><Icon name="Presentation" className="w-16 h-16 text-purple-400/50" /></div></button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <button onClick={() => console.log(`Viewing presentation ID: ${p.id}`)} className="text-left w-full"><h3 className="font-semibold mb-2 hover:text-purple-300 transition-colors">{p.title || 'Untitled Presentation'}</h3></button>
                  <div className="flex items-center justify-between text-sm text-purple-300 mt-auto pt-2"><span className="flex items-center gap-1"><Icon name="Clock" className="w-4 h-4" /> {formatDate(p.created_date)}</span><span>{p.slides?.length || 0} slides</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-xl">
            <div className="pt-12 pb-12 text-center">
              <Icon name="Presentation" className="w-16 h-16 text-purple-400/50 mx-auto mb-4" /><h3 className="text-lg font-semibold mb-2">{searchTerm ? 'No presentations found' : 'No presentations yet'}</h3><p className="text-purple-300 mb-6">{searchTerm ? 'Try adjusting your search terms' : 'Create your first AI-powered presentation'}</p>
              {!searchTerm && (<button onClick={() => setAppStep('start')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"><Icon name="Plus" className="w-4 h-4" /> Create Presentation</button>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  // State to manage the current view of the application (e.g., dashboard, editor).
  const [appStep, setAppStep] = useState('dashboard');
  // State for the presentation data
  const [outline, setOutline] = useState(null);
  const [sourceText, setSourceText] = useState('');
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // UI and loading state
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [presentationTheme, setPresentationTheme] = useState('oceanic_depth');
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  // Sidebar and panel state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSidebarCategory, setActiveSidebarCategory] = useState('themes');
  // Icon picker state
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const [editingIconDetails, setEditingIconDetails] = useState(null);

  // Load external scripts (fonts, docx parser) on component mount.
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Lexend:wght@700;800&family=Roboto+Slab:wght@700&family=Orbitron:wght@800&display=swap";
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    if (!document.querySelector('script[src*="mammoth"]')) {
      const s = document.createElement('script');
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
      s.async = true;
      s.onload = () => setScriptsLoaded(true);
      s.onerror = () => setError('Could not load file processor. .docx uploads will not work.');
      document.body.appendChild(s);
    } else {
      setScriptsLoaded(true);
    }
  }, []);

  // Wrapper for calling the Gemini API for text generation.
  const callGeminiAPI = async (prompt, schema = null) => {
    const apiKey = ""; // The environment will provide the key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    if (schema) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: schema
      };
    }
    try {
      const resp = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const txt = await resp.text();
      if (!resp.ok) throw new Error(txt);
      const result = JSON.parse(txt);
      if (result.candidates?.[0]?.content?.parts?.[0]) {
        const part = result.candidates[0].content.parts[0];
        return schema ? JSON.parse(part.text) : part.text;
      }
      throw new Error('Unexpected API response structure.');
    } catch (e) {
      console.error("Gemini API Error:", e);
      throw e;
    }
  };

  // Callbacks to handle transitions between app steps.
  const handleOutlineGenerated = (generatedOutline, originalText) => {
    setOutline(generatedOutline);
    setSourceText(originalText);
    setAppStep('edit');
  };

  const handlePresentationGenerated = (generatedSlides) => {
    const slidesWithState = generatedSlides.map(s => ({
      ...s,
      content: { ...s.content, showImage: s.layout_type === 'default' || s.layout_type === 'image_top' }
    }));
    setSlides(slidesWithState);
    setAppStep('present');
  };

  const handleGenerateFromPrompt = async (prompt) => {
    setLoadingMessage('Generating presentation from your prompt...');
    setError(null);
    try {
        const apiPrompt = `Generate a full presentation deck in JSON format about "${prompt}". The presentation should have a main title and around 5-7 slides. Each slide needs a layout_type (one of default, image_top, icon_list, feature_grid, quote, centered_text, two_column_list, timeline), and content with a title, subtitle, and a list of items. Each item should have an icon name, text, and indent level (0 for normal, 1 for sub-bullet). Also generate a creative image_prompt for each slide. Icons must be from this list: ${JSON.stringify(iconNames)}.`;

        const schema = {
            type: "OBJECT",
            properties: {
                slides: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            layout_type: { type: "STRING" },
                            content: {
                                type: "OBJECT",
                                properties: {
                                    title: { type: "STRING" },
                                    subtitle: { type: "STRING" },
                                    items: { type: "ARRAY", items: { type: "OBJECT", properties: { icon: { type: "STRING" }, text: { type: "STRING" }, indent: { type: "NUMBER" } } } },
                                    quote: { type: "STRING" },
                                    author: { type: "STRING" },
                                    image_prompt: { type: "STRING" }
                                },
                                required: ["title", "subtitle", "items", "image_prompt"]
                            }
                        },
                        required: ["layout_type", "content"]
                    }
                }
            }
        };

        const result = await callGeminiAPI(apiPrompt, schema);
        if (result?.slides && result.slides.length > 0) {
            const slidesWithOrig = result.slides.map(s => ({ ...s, original_layout_type: s.layout_type, id: Date.now() + Math.random() }));
            handlePresentationGenerated(slidesWithOrig);
        } else {
            throw new Error('AI did not return a valid presentation structure.');
        }
    } catch (e) {
        console.error(e);
        setError(e.message || 'Failed to generate presentation from prompt.');
        setAppStep('start'); // Go back to start on error
    } finally {
        setLoadingMessage('');
    }
  };

  const handleBackToStart = () => {
    setAppStep('start');
    setOutline(null);
    setSlides([]);
    setError(null);
    setLoadingMessage('');
  };

  // Functions for managing slides.
  const addSlide = () => {
    const slide = { id: Date.now(), layout_type: 'default', original_layout_type: 'default', content: { title: 'New Slide', subtitle: 'Add your content here', items: [{ icon: 'CheckCircle', text: 'Click to edit this item', indent: 0 }], image_prompt: 'A placeholder image', showImage: true } };
    const newSlides = [...slides, slide];
    setSlides(newSlides);
    setCurrentSlideIndex(newSlides.length - 1);
  };

  const cycleLayout = (idx, newLayout) => {
    const newSlides = [...slides];
    newSlides[idx].layout_type = newLayout;
    setSlides(newSlides);
  };

  const revertLayout = (idx) => {
    const newSlides = [...slides];
    newSlides[idx].layout_type = newSlides[idx].original_layout_type;
    setSlides(newSlides);
  };

  const deleteSlide = (index) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const togglePreviewMode = () => setAppStep(prev => prev === 'preview' ? 'present' : 'preview');

  const currentTheme = themes[presentationTheme] || themes.oceanic_depth;

  // Function to export the presentation as a self-contained HTML file.
  const exportPresentation = () => {
    const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${slides[0]?.content?.title || 'AI Generated Presentation'}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Lexend:wght@700;800&family=Roboto+Slab:wght@700&family=Orbitron:wght@800&display=swap" rel="stylesheet"><style>body{margin:0;padding:0;font-family:Inter,system-ui,sans-serif;scroll-snap-type:y mandatory;}.slide{width:100vw;height:100vh;display:flex;flex-direction:column;justify-content:center;padding:5vw;box-sizing:border-box;scroll-snap-align:start;}.slide-content{max-width:1200px;margin:0 auto;width:100%;}h1{font-size:3.5rem;margin:0 0 1rem;font-weight:800;}h2{font-size:1.75rem;margin:0 0 2rem;font-weight:600;}ul{list-style:none;padding:0;margin:0;}li{margin-bottom:1rem;display:flex;align-items:flex-start;font-size:1.25rem;}.icon-placeholder{width:20px;height:20px;margin-right:12px;border-radius:4px;background:#999;flex-shrink:0;margin-top:4px;}.pagination{position:fixed;bottom:1rem;right:1rem;background:rgba(0,0,0,.5);color:#fff;padding:.5rem 1rem;border-radius:2rem;font-size:.75rem;}.embed-wrapper{position:relative;margin-top:1.5rem;max-width:100%;}iframe,video{max-width:100%;border:0;border-radius:8px;}</style></head><body>${slides.map((s, i) => { const c = s.content; return `<section class="slide"><div class="slide-content"><h1>${c.title || ''}</h1><h2>${c.subtitle || ''}</h2><ul>${(c.items || []).map(it => `<li><div class="icon-placeholder"></div><span>${it.text || ''}</span></li>`).join('')}</ul></div><div class="pagination">Slide ${i + 1} / ${slides.length}</div></section>`; }).join('')}<script>document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key===' '){window.scrollBy(0,window.innerHeight);} else if(e.key==='ArrowLeft'){window.scrollBy(0,-window.innerHeight);}});</script></body></html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slides[0]?.content?.title?.replace(/\s+/g, '_') || 'presentation'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- SlideRenderer Component ---
  // This component is responsible for rendering a single slide in various contexts (editor, preview, etc.).
  const SlideRenderer = ({ slideData, theme, isPreview = false, isPresentationMode = false, ...handlers }) => {
    if (!slideData || !slideData.content) {
      return <div className="w-full h-full flex items-center justify-center"><p className={theme.color.text}>Loading...</p></div>;
    }
    const { layout_type, content } = slideData;
    const isEditable = !isPreview && !isPresentationMode;

    // Renders embedded media like YouTube videos.
    const renderEmbed = (el) => {
        const commonStyle = { width: el.width, height: el.height, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: 8, overflow: 'hidden' };
        const iframeProps = { width: el.width, height: el.height, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, style: { border: 0 } };
        switch (el.embedType) {
            case 'youtube': return <iframe title="YouTube" src={`https://www.youtube.com/embed/${el.videoId}`} {...iframeProps}></iframe>;
            case 'vimeo': return <iframe title="Vimeo" src={`https://player.vimeo.com/video/${el.videoId}`} {...iframeProps}></iframe>;
            case 'spotify': return <iframe title="Spotify" src={`https://open.spotify.com/embed/${el.spotifyType}/${el.spotifyId}`} {...iframeProps}></iframe>;
            case 'wistia': return <iframe title="Wistia" src={`https://fast.wistia.net/embed/iframe/${el.videoId}?seo=false&videoFoam=true`} {...iframeProps}></iframe>;
            case 'loom': return <iframe title="Loom" src={`https://www.loom.com/embed/${el.videoId}`} {...iframeProps}></iframe>;
            case 'tiktok': return <div style={commonStyle}><a href={el.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Open TikTok</a></div>;
            case 'video': if (/\.(mp4|webm|ogg)$/i.test(el.url)) { return <video src={el.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />; } return <iframe title="Embed" src={el.url} {...iframeProps}></iframe>;
            default: return <div style={commonStyle}>Unsupported media</div>;
        }
    };

    // Renders all the floating elements (text boxes, tables, etc.) on a slide.
    const renderElements = (elements) => {
        return elements?.map((el, idx) => {
            const selected = handlers.selectedElement === idx;
            const baseStyle = { position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, cursor: isEditable ? 'move' : 'default', border: selected ? '2px solid #6366f1' : (isEditable ? '1px dashed rgba(255,255,255,0.2)' : 'none'), padding: el.type === 'text' ? '4px' : '0' };
            const onMouseDown = isEditable ? (e) => handlers.handleElementMouseDown(e, idx) : undefined;
            let inner = null;

            if (el.type === 'text') {
                inner = <div contentEditable={isEditable} suppressContentEditableWarning onMouseDown={e => e.stopPropagation()} onBlur={e => handlers.handleElementUpdate(idx, { content: e.target.innerText })} style={{ whiteSpace: 'pre-wrap', minWidth: el.width, minHeight: el.height, color: 'inherit', ...el.style }} className={`${theme.color.text} ${theme.font.body.family}`}>{el.content}</div>;
            } else if (el.type === 'table') {
                inner = (
                    <div style={{ ...el.style, background: 'rgba(0,0,0,0.15)', padding: 8, borderRadius: 6 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {el.data.map((row, r) => (
                                    <tr key={r}>
                                        {row.map((cell, c) => (
                                            <td key={c} contentEditable={isEditable} suppressContentEditableWarning
                                                onBlur={(e) => {
                                                    if (!isEditable) return;
                                                    handlers.handleElementUpdate(idx, (prevElement) => {
                                                        const newData = JSON.parse(JSON.stringify(prevElement.data));
                                                        newData[r][c] = e.target.innerText;
                                                        return { data: newData };
                                                    });
                                                }}
                                                style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '4px 8px', background: r === 0 ? 'rgba(255,255,255,0.1)' : 'transparent', fontWeight: r === 0 ? 600 : 400, fontSize: 14 }}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            } else if (el.type === 'icon') {
                inner = <Icon name={el.iconName} size={el.size} className={el.color} />;
            } else if (el.type === 'embed') {
                inner = <div style={{ width: el.width, height: el.height }}>{renderEmbed(el)}</div>;
            }

            return (
                <div key={el.id || idx} style={baseStyle} onMouseDown={onMouseDown}>
                    {selected && isEditable && (<button onClick={(e) => { e.stopPropagation(); handlers.deleteElement(idx); }} className="absolute -top-3 -right-3 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white z-10"><X size={14} /></button>)}
                    {inner}
                </div>
            );
        });
    };

    // Renders the main content items (bullet points, lists).
    const renderItems = (items) => items?.map((it, i) => (
        <li key={i} style={{ marginLeft: `${(it.indent || 0) * 1.5}rem` }} className={`group flex items-start ${isPreview ? 'text-xs' : 'text-lg'} ${theme.color.text} ${theme.font.body.family} ${theme.font.body.weight} relative py-1`}>
            {isEditable && (
                <button
                    onClick={() => handlers.deleteListItem(i)}
                    className="absolute -left-7 top-1/2 -translate-y-1/2 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Delete item"
                >
                    <X size={12} />
                </button>
            )}
            {it.icon && (
                 <button
                    onClick={() => isEditable && handlers.openIconPicker(handlers.currentSlideIndex, i)}
                    className="flex-shrink-0"
                    title="Change icon"
                >
                    <Icon name={it.icon} className={`w-5 h-5 mt-1 mr-3 ${theme.color.accent}`} />
                </button>
            )}
            <span
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={e => handlers.handleContentUpdate('text', e.target.innerText, i)}
                className="w-full"
            >
                {it.text}
            </span>
        </li>
    ));

    const ImagePlaceholder = ({ prompt, src }) => (<img src={src || `https://placehold.co/600x400/png?text=${encodeURIComponent(prompt || 'Placeholder')}`} alt={prompt || 'Placeholder'} className={`w-full h-full object-contain ${theme.styles.placeholder} ${theme.styles.image}`} onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/png?text=Image+Error'; }} />);

    // Renders a simplified, non-interactive preview of a slide.
    if (isPreview) {
        return (
            <div className={`w-full h-full flex flex-col p-2 overflow-hidden ${theme.bg}`}>
                <div className={`w-3/4 h-3 rounded mb-1 ${theme.color.title.replace('text-', 'bg-')}`}></div>
                <div className={`w-1/2 h-2 rounded mb-2 ${theme.color.subtitle.replace('text-', 'bg-')}`}></div>
                <div className="flex-grow flex gap-2">
                    <div className="w-full space-y-1">{[...Array(3)].map((_, i) => (<div key={i} className={`h-2 rounded ${theme.color.text.replace('text-', 'bg-')} w-${10 - i * 2}/12`}></div>))}</div>
                </div>
            </div>
        );
    }
    
    // Determines the layout of the slide's main content.
    const layoutContent = () => {
        const titleClasses = `text-4xl md:text-5xl break-words min-h-[1em] ${theme.font.title.family} ${theme.font.title.weight} ${theme.font.title.transform} ${theme.color.title} ${theme.styles.title_glow ? 'glow' : ''}`;
        const subtitleClasses = `mt-1 text-lg min-h-[1.2em] ${theme.font.subtitle.family} ${theme.font.subtitle.weight} ${theme.font.subtitle.transform} ${theme.color.subtitle}`;

        switch (layout_type) {
            case 'quote':
                return (
                    <div className="m-auto text-center group relative">
                        {isEditable && (
                            <button
                                onClick={() => {
                                    handlers.handleContentUpdate('quote', '');
                                    handlers.handleContentUpdate('author', '');
                                }}
                                className="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                title="Delete quote"
                            >
                                <X size={12} />
                            </button>
                        )}
                        <Quote className={`w-16 h-16 mx-auto mb-4 ${theme.color.accent}`} />
                        <p contentEditable={isEditable} suppressContentEditableWarning onBlur={e => handlers.handleContentUpdate('quote', e.target.innerText)} className={`text-4xl ${theme.styles.blockquote} ${theme.color.blockquote_border} ${theme.font.title.family} ${theme.color.title}`}>"{content?.quote || ''}"</p>
                        <p contentEditable={isEditable} suppressContentEditableWarning onBlur={e => handlers.handleContentUpdate('author', e.target.innerText)} className={`mt-4 text-2xl ${theme.font.subtitle.family} ${theme.color.subtitle}`}>- {content?.author || ''}</p>
                    </div>
                );
            default:
                return (
                    <>
                        <header className="mb-4 relative group">
                            {isEditable && content?.title && (
                                <button
                                    onClick={() => handlers.handleContentUpdate('title', '')}
                                    className="absolute -top-2 right-0 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    title="Delete title"
                                >
                                    <X size={12} />
                                </button>
                            )}
                            <h3 contentEditable={isEditable} suppressContentEditableWarning onBlur={e => handlers.handleContentUpdate('title', e.target.innerText)} className={titleClasses}>{content?.title || ''}</h3>
                            
                            <div className="relative">
                                {isEditable && content?.subtitle && (
                                    <button
                                        onClick={() => handlers.handleContentUpdate('subtitle', '')}
                                        className="absolute -top-0 right-0 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        title="Delete subtitle"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                                <p contentEditable={isEditable} suppressContentEditableWarning onBlur={e => handlers.handleContentUpdate('subtitle', e.target.innerText)} className={subtitleClasses}>{content?.subtitle || ''}</p>
                            </div>
                        </header>
                        <div className="flex-grow flex gap-8 items-start pt-4 relative">
                            <ul className={content.showImage ? "w-1/2 space-y-3" : "w-full space-y-3"}>
                                {renderItems(content?.items)}
                            </ul>
                            {content.showImage && (
                                <div className="w-1/2 h-full rounded-md flex flex-col items-center justify-center p-4 relative group">
                                    {isEditable && (
                                        <button
                                            onClick={handlers.deleteImage}
                                            className="absolute top-2 right-2 z-10 p-1.5 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete image"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                    <ImagePlaceholder src={content.imageData} prompt={content?.image_prompt} />
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="relative w-full h-full">
            {layoutContent()}
            {isEditable && renderElements(content.elements)}
        </div>
    );
  };
  
  // The main router for the app, rendering different components based on `appStep`.
  return (
    <div className="min-h-screen w-full flex flex-col text-gray-300 bg-slate-900 transition-colors duration-500">
      <style>{`
        :root { --panel-bg: rgba(30,41,59,0.8); --border-color: #475569; --text-color: #e2e8f0; --hover-bg: rgba(51,65,85,0.5); --primary-color: #6366f1; }
        .font-lexend{font-family:'Lexend',sans-serif;} .font-inter{font-family:'Inter',sans-serif;} .font-roboto-slab{font-family:'Roboto Slab',serif;} .font-orbitron{font-family:'Orbitron',sans-serif;}
        [contentEditable="true"]:hover{outline:2px dashed rgba(139,92,246,.5);cursor:text;} [contentEditable="true"]:focus{outline:2px solid rgba(139,92,246,1);}
        .floating-sidebar{position:fixed;left:0;top:0;bottom:0;width:250px;background:var(--panel-bg);backdrop-filter:blur(10px);border-right:1px solid var(--border-color);z-index:50;transition:width .3s;display:flex;flex-direction:column;overflow:hidden;}
        .floating-sidebar.collapsed{width:60px;}
        .sidebar-header{display:flex;justify-content:space-between;align-items:center;padding:1rem;border-bottom:1px solid var(--border-color);}
        .sidebar-title{font-weight:600;color:#fff;}
        .sidebar-toggle{background:none;border:none;color:var(--text-color);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:.5rem;border-radius:4px;}
        .sidebar-toggle:hover{background:var(--hover-bg);}
        .sidebar-categories{display:flex;flex-direction:column;padding:.5rem 0;overflow-y:auto;flex-grow:1;}
        .sidebar-category{padding:.75rem 1rem;cursor:pointer;display:flex;align-items:center;gap:.75rem;color:var(--text-color);transition:background .2s;border-left:3px solid transparent;}
        .sidebar-category:hover{background:var(--hover-bg);}
        .sidebar-category.active{background:var(--hover-bg);color:#fff;border-left-color:var(--primary-color);}
        .sidebar-category-icon{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;}
        .sidebar-category-label{font-weight:500;white-space:nowrap;}
        .floating-sidebar.collapsed .sidebar-category-label{opacity:0;width:0;pointer-events:none;}
        .sidebar-panel{position:fixed;top:0;left:250px;bottom:0;width:300px;background:var(--panel-bg);backdrop-filter:blur(10px);border-right:1px solid var(--border-color);transform:translateX(-100%);transition:transform .3s;z-index:40;display:flex;flex-direction:column;}
        .sidebar-panel.active{transform:translateX(0);}
        .sidebar-panel-header{display:flex;justify-content:space-between;align-items:center;padding:1rem;border-bottom:1px solid var(--border-color);}
        .sidebar-panel-title{font-size:1.1rem;font-weight:600;color:#fff;}
        .sidebar-panel-close{background:none;border:none;color:var(--text-color);cursor:pointer;}
        .sidebar-panel-content{padding:1rem;overflow-y:auto;flex-grow:1;}
        .panel-section{margin-bottom:1.5rem;}
        .panel-section-title{font-size:.8rem;text-transform:uppercase;color:#94a3b8;margin-bottom:.75rem;letter-spacing:.05em;}
        .panel-items{display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;}
        .panel-items.grid-cols-1{grid-template-columns:1fr;}
        .panel-item{display:flex;flex-direction:column;align-items:center;padding:.75rem;border-radius:6px;border:1px solid transparent;background:rgba(255,255,255,0.05);cursor:pointer;transition:.2s;color:var(--text-color);position:relative;}
        .panel-item:hover{background:rgba(255,255,255,0.1);border-color:#6366f1;}
        .panel-item.active{border-color:#818cf8;background:rgba(99,102,241,0.2);}
        .panel-item-icon{display:flex;align-items:center;justify-content:center;width:100%;height:48px;margin-bottom:.5rem;}
        .panel-item-title{font-size:.7rem;text-align:center;font-weight:500;}
        .media-option-button{display:flex;flex-direction:column;align-items:center;padding:.75rem;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;transition:.2s;color:#e2e8f0;}
        .media-option-button:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);transform:translateY(-2px);}
        .media-option-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;margin-bottom:.5rem;}
        .media-option-label{font-size:.7rem;font-weight:600;}
        .content-area{transition:margin-left .3s ease;padding:1rem;height:100%;}
        .content-area.sidebar-open{margin-left:250px;} .content-area.sidebar-open.panel-open{margin-left:550px;}
        .content-area.sidebar-collapsed{margin-left:60px;} .content-area.sidebar-collapsed.panel-open{margin-left:360px;}
        .theme-preview { width: 100%; height: 48px; border-radius: 4px; }
        .glow { text-shadow: 0 0 10px currentColor; }
      `}</style>
      <div className="h-full">
        {appStep === 'dashboard' && <Dashboard setAppStep={setAppStep} />}
        {appStep === 'presentations' && <PresentationsPage setAppStep={setAppStep} />}
        {appStep === 'start' && <StartScreen onOutlineGenerated={handleOutlineGenerated} onGenerateFromPrompt={handleGenerateFromPrompt} setLoading={setLoadingMessage} setError={setError} scriptsLoaded={scriptsLoaded} />}
        {appStep === 'edit' && <EditorScreen initialOutline={outline} sourceText={sourceText} onGenerate={handlePresentationGenerated} setLoading={setLoadingMessage} setError={setError} presentationTheme={presentationTheme} setPresentationTheme={setPresentationTheme} callGeminiAPI={callGeminiAPI} />}
        {(appStep === 'generating' || loadingMessage) && <LoadingScreen message={loadingMessage} theme={currentTheme} />}
        {appStep === 'present' && (
          <>
            <button onClick={() => setAppStep('dashboard')} className="absolute top-4 left-4 z-50 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
              <Icon name="LayoutGrid" size={16} /> Dashboard
            </button>
            <div className="h-full flex">
              <FloatingSidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} activeSidebarCategory={activeSidebarCategory} setActiveSidebarCategory={setActiveSidebarCategory} />
              <SidebarPanel activeSidebarCategory={activeSidebarCategory} setActiveSidebarCategory={setActiveSidebarCategory} presentationTheme={presentationTheme} setPresentationTheme={setPresentationTheme} themes={themes} slides={slides} setSlides={setSlides} currentSlideIndex={currentSlideIndex} setCurrentSlideIndex={setCurrentSlideIndex} cycleLayout={cycleLayout} revertLayout={revertLayout} SlideRenderer={SlideRenderer} theme={currentTheme} callGeminiAPI={callGeminiAPI} setError={setError} />
              <main className={`content-area ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-open'} ${activeSidebarCategory ? 'panel-open' : ''}`}>
                <PresentationScreen slides={slides} onBack={handleBackToStart} theme={currentTheme} setSlides={setSlides} isIconPickerOpen={isIconPickerOpen} setIsIconPickerOpen={setIsIconPickerOpen} iconSearch={iconSearch} setIconSearch={setIconSearch} editingIconDetails={editingIconDetails} setEditingIconDetails={setEditingIconDetails} currentSlideIndex={currentSlideIndex} setCurrentSlideIndex={setCurrentSlideIndex} addSlide={addSlide} deleteSlide={deleteSlide} togglePreviewMode={togglePreviewMode} exportPresentation={exportPresentation} SlideRenderer={SlideRenderer} />
              </main>
            </div>
          </>
        )}
        {appStep === 'preview' && <PreviewScreen slides={slides} theme={currentTheme} currentSlideIndex={currentSlideIndex} setCurrentSlideIndex={setCurrentSlideIndex} togglePreviewMode={togglePreviewMode} SlideRenderer={SlideRenderer} />}
        {error && <ErrorDisplay message={error} onClear={() => setError(null)} />}
      </div>
    </div>
  );
}

// --- Child Components ---

// A simple rich text editor component.
const RichTextEditorInput = ({ value, onChange, placeholder, setError }) => {
  const editorRef = useRef(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  useEffect(() => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const plain = div.textContent || div.innerText || '';
    setIsPlaceholderVisible(!plain.trim());
  }, [value]);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handlePaste = useCallback(e => {
    e.preventDefault();
    const html = (e.clipboardData || window.clipboardData).getData('text/html');
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    if (html) {
      document.execCommand('insertHTML', false, html);
    } else if (text) {
      const inserted = text.split(/\r?\n/).filter(l => l.trim() !== '').map(l => `<p>${l}</p>`).join('');
      document.execCommand('insertHTML', false, inserted);
    }
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  useEffect(() => {
    const ed = editorRef.current;
    if (ed) {
      ed.addEventListener('paste', handlePaste);
      return () => ed.removeEventListener('paste', handlePaste);
    }
  }, [handlePaste]);

  const formatDoc = (cmd) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(cmd, false, null);
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <>
      <style>{`.editor-wrapper-container{border:1px solid #4a5568;border-radius:.75rem;}.editor-wrapper-container:focus-within{box-shadow:0 0 0 2px #6366f1;border-color:#6366f1;}.editor-toolbar{display:flex;gap:.5rem;padding:.5rem;background:rgba(30,41,59,0.5);border-bottom:1px solid #4a5568;border-top-left-radius:.75rem;border-top-right-radius:.75rem;}.editor-toolbar button{background:transparent;border:none;color:#cbd5e1;padding:.25rem;border-radius:.25rem;cursor:pointer;}.editor-toolbar button:hover{background:rgba(71,85,105,0.5);}.editor-wrapper{position:relative;width:100%;background:rgba(15,23,42,0.5);overflow:auto;min-height:40vh;resize:vertical;border-bottom-left-radius:.75rem;border-bottom-right-radius:.75rem;}.rich-text-editor-input{min-height:40vh;padding:1rem;color:#fff;outline:none;line-height:1.6;}.editor-placeholder{position:absolute;top:1rem;left:1rem;color:#64748b;pointer-events:none;}`}</style>
      <div className="editor-wrapper-container">
        <div className="editor-toolbar">
          <button onClick={() => formatDoc('insertUnorderedList')} title="Bulleted List"><List size={20} /></button>
          <button onClick={() => formatDoc('insertOrderedList')} title="Numbered List"><ListOrdered size={20} /></button>
          <button onClick={() => formatDoc('indent')} title="Indent"><Indent size={20} /></button>
          <button onClick={() => formatDoc('outdent')} title="Outdent"><Outdent size={20} /></button>
        </div>
        <div className="editor-wrapper">
          {isPlaceholderVisible && <div className="editor-placeholder">{placeholder}</div>}
          <div ref={editorRef} contentEditable onInput={e => onChange(e.currentTarget.innerHTML)} className="rich-text-editor-input" />
        </div>
      </div>
    </>
  );
};

// The initial screen for creating a new presentation.
const StartScreen = ({ onOutlineGenerated, onGenerateFromPrompt, setLoading, setError, scriptsLoaded }) => {
  const [inputType, setInputType] = useState(null);

  const handleContinue = async (sourceType, data) => {
    setError(null);
    if (sourceType === 'prompt') {
        await onGenerateFromPrompt(data);
    } else {
        setLoading('Loading editor...');
        try {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            let title = 'Untitled Presentation';
            const first = temp.querySelector('p,h1,h2,h3,h4,h5,h6,li');
            if (first && first.textContent.trim()) {
                const t = first.textContent.trim();
                if (t.length < 100) { title = t; first.remove(); }
            }
            const body = temp.innerHTML;
            onOutlineGenerated({ presentation_title: title, card_titles: [] }, body);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading('');
        }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600 mb-2">What would you like to create?</h1>
        <p className="text-slate-400 text-lg">Choose a format to start generating with AI.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <InputCard icon="Presentation" title="Presentation" description="Generate a deck of slides from a single prompt." onClick={() => setInputType('prompt')} />
        <InputCard icon="FileText" title="Paste in text" description="Transform existing text into a new format." onClick={() => setInputType('text')} />
        <InputCard icon="Upload" title="Upload" description="Generate content from a file or document." onClick={() => setInputType('file')} />
      </div>
      {inputType && (<InputModal type={inputType} onClose={() => setInputType(null)} onGenerate={handleContinue} setError={setError} scriptsLoaded={scriptsLoaded} />)}
    </div>
  );
};

const InputCard = ({ icon, title, description, onClick }) => (
  <button onClick={onClick} className="group bg-black/20 border border-slate-700 rounded-xl p-6 text-left hover:border-indigo-500 hover:bg-slate-800 transition-all duration-300">
    <div className="mb-4"><Icon name={icon} className="w-9 h-9 text-indigo-400 group-hover:scale-110 transition-transform" /></div>
    <h3 className="text-xl font-bold text-slate-200 mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </button>
);

const InputModal = ({ type, onClose, onGenerate, setError, scriptsLoaded }) => {
  const [text, setText] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    if (file.name.endsWith('.docx')) {
      reader.onload = ev => {
        if (scriptsLoaded && window.mammoth) {
          window.mammoth.convertToHtml({ arrayBuffer: ev.target.result }).then(res => {
            setFileContent(res.value);
          }).catch(() => setError('Failed to read .docx file.'));
        } else {
          setError('File processor not ready.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = ev => setFileContent(ev.target.result);
      reader.readAsText(file);
    }
  };

  const submit = () => {
    if (type === 'prompt' && text) onGenerate('prompt', text);
    else if (type === 'text' && text) onGenerate('text', text);
    else if (type === 'file' && fileContent) onGenerate('file', fileContent);
    onClose();
  };

  const body = () => {
    switch (type) {
      case 'prompt': return <textarea value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="e.g., 'The Future of Renewable Energy'" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-200 resize-none" />;
      case 'text': return <RichTextEditorInput value={text} onChange={setText} placeholder="Paste your article or notes... Use 'xxx' to separate slides." setError={setError} />;
      case 'file': return (<div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500 hover:bg-slate-800/50 transition-colors"><input type="file" id="fileInput" className="hidden" accept=".txt,.md,.docx" onChange={handleFileChange} /><label htmlFor="fileInput" className="cursor-pointer"><Icon name="Upload" className="mx-auto mb-4 w-12 h-12 text-slate-500" /><p className="text-slate-400">{fileName || 'Click to browse or drag & drop'}</p><p className="text-xs text-slate-500 mt-1">Supported: .txt, .md, .docx</p></label></div>);
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col max-h-[90vh]">
        <div className="p-8 pb-4"><button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"><Icon name="X" /></button><h2 className="text-2xl font-bold text-slate-100">{type === 'prompt' && 'Describe your presentation'}{type === 'text' && 'Paste your text'}{type === 'file' && 'Upload a file'}</h2></div>
        <div className="px-8 flex-grow overflow-y-auto">{body()}</div>
        <div className="p-8 pt-4"><button onClick={submit} className="w-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 rounded-lg py-3 font-bold text-lg flex items-center justify-center gap-3">Continue <Icon name="ArrowRight" className="w-5 h-5" /></button></div>
      </div>
    </div>
  );
};

// The screen for editing the raw text before final generation.
const EditorScreen = ({ initialOutline, sourceText, onGenerate, setLoading, setError, presentationTheme, setPresentationTheme, callGeminiAPI }) => {
  const [editorBody, setEditorBody] = useState(`<h1>${initialOutline.presentation_title}</h1>${sourceText}`);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  const handleFinalGenerate = async () => {
    setLoading('Generating full presentation...');
    setError(null);
    const slideHtmls = editorBody.replace(/<p>xxx<\/p>/gi, '<hr class="slide-break">').split('<hr class="slide-break">');
    const temp = document.createElement('div');
    temp.innerHTML = slideHtmls[0];
    const presentationTitle = temp.querySelector('h1,h2,h3,p,li')?.textContent?.trim() || 'Untitled Presentation';
    const slideContents = slideHtmls.map(h => h.trim()).filter(Boolean);
    try {
      const prompt = `Generate slides (JSON) from HTML blocks. Title: "${presentationTitle}" Blocks:\n${slideContents.map((h, i) => `Slide ${i + 1}: <div>${h}</div>`).join('\n')}
Each slide: layout_type (one of default,image_top,icon_list,feature_grid,quote,centered_text,two_column_list,timeline), and content with title, subtitle, items[{icon,text,indent}], image_prompt, optionally quote & author. Icons from: ${JSON.stringify(iconNames)}.`;
      const schema = { type: "OBJECT", properties: { slides: { type: "ARRAY", items: { type: "OBJECT", properties: { layout_type: { type: "STRING" }, content: { type: "OBJECT", properties: { title: { type: "STRING" }, subtitle: { type: "STRING" }, items: { type: "ARRAY", items: { type: "OBJECT", properties: { icon: { type: "STRING" }, text: { type: "STRING" }, indent: { type: "NUMBER" } } } }, quote: { type: "STRING" }, author: { type: "STRING" }, image_prompt: { type: "STRING" } }, required: ["title", "subtitle", "items", "image_prompt"] } }, required: ["layout_type", "content"] } } } };
      const result = await callGeminiAPI(prompt, schema);
      if (result?.slides) {
        const withOrig = result.slides.map(s => ({ ...s, original_layout_type: s.layout_type }));
        onGenerate(withOrig);
      } else {
        throw new Error('Malformed AI response.');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading('');
    }
  };

  const handleGetCutSuggestions = async () => {
    setIsGeneratingSuggestions(true);
    try {
      const prompt = `Make wording concise but keep HTML structure unchanged. Preserve 'xxx' markers.\n\n${editorBody}`;
      const suggestion = await callGeminiAPI(prompt);
      setEditorBody(suggestion);
    } catch (e) {
      setError('Failed to get AI suggestions.');
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const cardCount = useMemo(() => (editorBody.match(/<p>xxx<\/p>/gi) || []).length + 1, [editorBody]);

  return (
    <div className="flex flex-col h-full">
      <header className="text-center py-4"><h1 className="text-2xl font-bold text-slate-300">Prompt editor</h1></header>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 overflow-y-auto pb-24">
        <aside className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <div className="space-y-6">
            <details className="group" open>
              <summary className="font-semibold text-slate-300 cursor-pointer flex items-center justify-between">Visuals</summary>
              <div className="p-4 mt-2 bg-black/20 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400 mb-3">Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(themes).map(([key, t]) => {
                    const themePreviewClasses = `w-full h-16 rounded-md ${t.bg} flex items-center justify-center p-2`;
                    return (
                        <button key={key} onClick={() => setPresentationTheme(key)} className={`p-2 rounded-lg border-2 transition-all ${presentationTheme === key ? 'border-cyan-400 scale-105' : 'border-gray-700 hover:border-gray-500'}`}>
                            <div className={themePreviewClasses}>
                                <div className="w-full text-left">
                                    <div className={`h-2 w-1/2 rounded ${t.color.title.replace('text-', 'bg-')}`}></div>
                                    <div className={`h-1.5 w-3/4 rounded mt-2 ${t.color.text.replace('text-', 'bg-')}`}></div>
                                    <div className={`h-1.5 w-2/3 rounded mt-1 ${t.color.text.replace('text-', 'bg-')}`}></div>
                                </div>
                            </div>
                            <p className="mt-2 font-semibold text-xs text-center text-white">{t.name}</p>
                        </button>
                    );
                  })}
                </div>
              </div>
            </details>
            <details className="group" open>
              <summary className="font-semibold text-slate-300 cursor-pointer flex items-center justify-between">AI Tools</summary>
              <div className="p-4 mt-2 bg-black/20 rounded-lg border border-slate-700">
                <button onClick={handleGetCutSuggestions} className="w-full text-left p-2 rounded-md transition-colors text-sm hover:bg-slate-700 flex items-center gap-2" disabled={isGeneratingSuggestions}>
                  {isGeneratingSuggestions ? <Loader2 size={16} className="animate-spin" /> : <Scissors size={16} />} AI Cut Suggestions
                </button>
              </div>
            </details>
          </div>
        </aside>
        <main className="lg:col-span-9"><h2 className="text-xl font-bold mb-4">Content</h2><div className="bg-black/20 rounded-lg border border-slate-700 p-6 space-y-6"><RichTextEditorInput value={editorBody} onChange={setEditorBody} placeholder="Start with a title. Use 'xxx' on a line (as <p>xxx</p>) to separate slides." setError={setError} /></div></main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 flex justify-center items-center"><span className="text-sm text-slate-400 mr-4">{cardCount} cards total</span><button onClick={handleFinalGenerate} className="bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 rounded-lg px-8 py-3 font-bold text-lg flex items-center gap-2"><Wand2 className="w-5 h-5" /> Generate</button></div>
    </div>
  );
};

// The main presentation editor screen.
const PresentationScreen = ({ slides, onBack, theme, setSlides, isIconPickerOpen, setIsIconPickerOpen, iconSearch, setIconSearch, editingIconDetails, setEditingIconDetails, currentSlideIndex, setCurrentSlideIndex, addSlide, deleteSlide, togglePreviewMode, exportPresentation, SlideRenderer }) => {
  const presentationAreaRef = useRef(null);
  const slideContainerRef = useRef(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleElementUpdate = (index, updated) => {
    const newSlides = [...slides];
    const elements = newSlides[currentSlideIndex].content.elements || [];
    if (typeof updated === 'function') {
      elements[index] = { ...elements[index], ...updated(elements[index]) };
    } else {
      elements[index] = { ...elements[index], ...updated };
    }
    newSlides[currentSlideIndex].content.elements = elements;
    setSlides(newSlides);
  };

  const deleteElement = (index) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex].content.elements.splice(index, 1);
    setSlides(newSlides);
    setSelectedElement(null);
  };

  const deleteListItem = (itemIndex) => {
    const newSlides = [...slides];
    const currentSlide = newSlides[currentSlideIndex];
    if (currentSlide.content.items && currentSlide.content.items[itemIndex] !== undefined) {
        currentSlide.content.items.splice(itemIndex, 1);
        setSlides(newSlides);
    }
  };

  const deleteImage = () => {
      const newSlides = [...slides];
      const currentSlide = newSlides[currentSlideIndex];
      currentSlide.content.imageData = null;
      currentSlide.content.image_prompt = '';
      currentSlide.content.showImage = false;
      setSlides(newSlides);
  };

  const handleElementMouseDown = (e, index) => {
    e.stopPropagation();
    setSelectedElement(index);
    const slideRect = slideContainerRef.current.getBoundingClientRect();
    const elementRect = e.currentTarget.getBoundingClientRect();
    const offsetX = ((e.clientX - elementRect.left) / slideRect.width) * 100;
    const offsetY = ((e.clientY - elementRect.top) / slideRect.height) * 100;
    setDraggingElement({ index, offsetX, offsetY });
  };

  const handleMouseMove = (e) => {
    if (!draggingElement) return;
    e.preventDefault();
    const slideRect = slideContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - slideRect.left) / slideRect.width) * 100 - draggingElement.offsetX;
    const y = ((e.clientY - slideRect.top) / slideRect.height) * 100 - draggingElement.offsetY;
    handleElementUpdate(draggingElement.index, { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleMouseUp = () => setDraggingElement(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElement !== null) deleteElement(selectedElement);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, slides, currentSlideIndex]);

  const handleContentUpdate = (field, value, itemIndex = null) => {
    const newSlides = JSON.parse(JSON.stringify(slides));
    const content = newSlides[currentSlideIndex].content;
    if (itemIndex !== null && content.items[itemIndex]) {
      content.items[itemIndex][field] = value;
    } else {
      content[field] = value;
    }
    setSlides(newSlides);
  };

  const openIconPicker = (slideIndex, itemIndex) => {
    setEditingIconDetails({ slideIndex, itemIndex });
    setIsIconPickerOpen(true);
  };

  const updateIcon = (iconName) => {
    if (!editingIconDetails) return;
    const newSlides = [...slides];
    newSlides[editingIconDetails.slideIndex].content.items[editingIconDetails.itemIndex].icon = iconName;
    setSlides(newSlides);
    setIsIconPickerOpen(false);
    setEditingIconDetails(null);
    setIconSearch('');
  };

  const toggleImage = (slideIndex) => {
    const newSlides = [...slides];
    newSlides[slideIndex].content.showImage = !newSlides[slideIndex].content.showImage;
    setSlides(newSlides);
  };

  const handlePaste = useCallback(e => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = ev => {
          const newSlide = { id: Date.now(), layout_type: 'image_top', original_layout_type: 'image_top', content: { title: 'Pasted Image', subtitle: 'You can edit this text', items: [], image_prompt: 'Pasted from clipboard', imageData: ev.target.result, showImage: true } };
          const newSlides = [...slides, newSlide];
          setSlides(newSlides);
          setCurrentSlideIndex(newSlides.length - 1);
        };
        reader.readAsDataURL(blob);
        break;
      }
    }
  }, [slides, setSlides, setCurrentSlideIndex]);

  useEffect(() => {
    const area = presentationAreaRef.current;
    if (area) {
      area.addEventListener('paste', handlePaste);
      return () => area.removeEventListener('paste', handlePaste);
    }
  }, [handlePaste]);

  const filteredIcons = iconNames.filter(n => n.toLowerCase().includes(iconSearch.toLowerCase()));
  const currentSlideData = slides[currentSlideIndex];

  return (
    <div className="flex flex-col h-full relative" ref={presentationAreaRef}>
      <div className="flex-grow flex gap-4 min-h-0">
        <div className="flex-grow flex flex-col">
          <div className="flex-shrink-0 mb-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button onClick={addSlide} className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex items-center gap-2 text-white"><Icon name="Plus" size={16} /> Add Slide</button>
              <button onClick={() => deleteSlide(currentSlideIndex)} disabled={slides.length <= 1} className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 disabled:opacity-50 flex items-center gap-2 text-white"><Icon name="Trash2" size={16} /> Delete Slide</button>
              <button onClick={togglePreviewMode} className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-500 flex items-center gap-2 text-white"><Icon name="Play" size={16} /> Preview</button>
              <button onClick={exportPresentation} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 flex items-center gap-2 text-white"><Icon name="Download" size={16} /> Export</button>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-center min-h-0" ref={slideContainerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onClick={() => { setSelectedElement(null); }}>
            <div className="w-full max-w-none md:max-w-7xl mx-auto aspect-video relative">
              <div className={`w-full h-full rounded-lg flex flex-col border-2 border-gray-700 shadow-2xl transition-all duration-500 ${theme.bg} ${theme.slide.padding} overflow-y-auto relative`}>
                <SlideRenderer 
                    slideData={currentSlideData} 
                    theme={theme} 
                    handleElementMouseDown={handleElementMouseDown} 
                    handleElementUpdate={handleElementUpdate} 
                    handleContentUpdate={handleContentUpdate} 
                    openIconPicker={openIconPicker} 
                    selectedElement={selectedElement} 
                    deleteElement={deleteElement}
                    deleteListItem={deleteListItem}
                    deleteImage={deleteImage}
                    currentSlideIndex={currentSlideIndex}
                />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 pt-4 flex items-center justify-center gap-4">
            <button onClick={() => setCurrentSlideIndex(i => Math.max(0, i - 1))} disabled={currentSlideIndex === 0} className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-600 flex items-center gap-2 text-white"><Icon name="ArrowLeft" size={16} /> Previous</button>
            <span className="text-gray-400 font-semibold">Slide {currentSlideIndex + 1} of {slides.length}</span>
            <button onClick={() => setCurrentSlideIndex(i => Math.min(slides.length - 1, i + 1))} disabled={currentSlideIndex >= slides.length - 1} className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-600 flex items-center gap-2 text-white">Next <Icon name="ArrowRight" size={16} /></button>
          </div>
          <div className="flex-shrink-0 pt-3 flex items-center justify-center gap-4">
            {(currentSlideData?.layout_type === 'default' || currentSlideData?.layout_type === 'image_top') && (<button onClick={() => toggleImage(currentSlideIndex)} className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2"><Icon name="ImageIcon" size={16} /> Toggle Image</button>)}
          </div>
        </div>
      </div>
      {isIconPickerOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-[70vh] bg-gray-800 rounded-xl shadow-2xl flex flex-col p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Choose an Icon</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => updateIcon(null)} className="text-sm px-3 py-1 bg-red-600 hover:bg-red-500 rounded-md text-white">Remove</button>
                <button onClick={() => setIsIconPickerOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
            </div>
            <input type="text" value={iconSearch} onChange={e => setIconSearch(e.target.value)} placeholder="Search icon..." className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 text-white" />
            <div className="flex-grow overflow-y-auto pr-2">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {filteredIcons.map(n => (<button key={n} onClick={() => updateIcon(n)} className="flex flex-col items-center justify-center p-2 bg-gray-900 rounded-md hover:bg-cyan-800 transition-colors text-center aspect-square"><Icon name={n} className="w-8 h-8 text-gray-300" /><p className="text-xs mt-1 text-gray-400 truncate w-full">{n}</p></button>))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Utility Components ---

const LoadingScreen = ({ message, theme }) => (
  <div className="flex flex-col items-center justify-center flex-grow">
    <Loader2 className={`w-12 h-12 animate-spin ${theme.color.accent}`} />
    <p className={`${theme.color.text} mt-4 text-lg`}>{message}</p>
  </div>
);

const ErrorDisplay = ({ message, onClear }) => (
  <div className="fixed top-5 right-5 bg-red-800/90 border border-red-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-4 z-50">
    <span>Error: {message}</span>
    <button onClick={onClear}><Icon name="X" className="w-5 h-5" /></button>
  </div>
);
