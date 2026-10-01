import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  PhoneCall, 
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface SeekerProfile {
  id: string;
  name: string;
  role: string;
  category: string;
  rate: string;
  rating: number;
  reviewsCount: number;
  location: string;
  distance: string;
  skills: string[];
  avatarBg: string;
  isVerified: boolean;
  status: 'available' | 'busy';
}

const SAMPLE_SEEKERS: SeekerProfile[] = [
  {
    id: 'sk-1',
    name: 'Sipho Ndlovu',
    role: 'Licensed Electrician & Solar Installer',
    category: 'Trades',
    rate: 'R280/hr',
    rating: 4.9,
    reviewsCount: 38,
    location: 'Sandton, JHB',
    distance: '1.4 km away',
    skills: ['Solar PV', 'Wiring', 'COC Compliance', 'Inverters'],
    avatarBg: 'bg-amber-600',
    isVerified: true,
    status: 'available'
  },
  {
    id: 'sk-2',
    name: 'Thabo Maseko',
    role: 'Master Plumber & Pipe Specialist',
    category: 'Trades',
    rate: 'R250/hr',
    rating: 4.8,
    reviewsCount: 52,
    location: 'Rosebank, JHB',
    distance: '2.1 km away',
    skills: ['Leak Detection', 'Geysers', 'Drain Unblocking'],
    avatarBg: 'bg-blue-600',
    isVerified: true,
    status: 'available'
  },
  {
    id: 'sk-3',
    name: 'Naledi Khumalo',
    role: 'Web Developer & React Engineer',
    category: 'Tech & IT',
    rate: 'R350/hr',
    rating: 5.0,
    reviewsCount: 29,
    location: 'Midrand, JHB',
    distance: '4.8 km away',
    skills: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    avatarBg: 'bg-indigo-600',
    isVerified: true,
    status: 'available'
  },
  {
    id: 'sk-4',
    name: 'Precious Sithole',
    role: 'Executive Home & Office Cleaner',
    category: 'Cleaning',
    rate: 'R180/hr',
    rating: 4.9,
    reviewsCount: 64,
    location: 'Fourways, JHB',
    distance: '3.2 km away',
    skills: ['Deep Clean', 'Sanitization', 'Airbnb Turnover'],
    avatarBg: 'bg-emerald-600',
    isVerified: true,
    status: 'available'
  },
  {
    id: 'sk-5',
    name: 'Dumisani Zulu',
    role: 'Carpentry & Custom Furniture Maker',
    category: 'Trades',
    rate: 'R290/hr',
    rating: 4.7,
    reviewsCount: 21,
    location: 'Randburg, JHB',
    distance: '2.9 km away',
    skills: ['Cabinetry', 'Decking', 'Wood Restoration'],
    avatarBg: 'bg-amber-700',
    isVerified: true,
    status: 'busy'
  },
  {
    id: 'sk-6',
    name: 'Zanele Dlamini',
    role: 'High School Math & Physics Tutor',
    category: 'Tutoring',
    rate: 'R220/hr',
    rating: 4.9,
    reviewsCount: 41,
    location: 'Braamfontein, JHB',
    distance: '1.8 km away',
    skills: ['Calculus', 'Physical Science', 'Exam Prep'],
    avatarBg: 'bg-violet-600',
    isVerified: true,
    status: 'available'
  }
];

export const SeekersView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [contactedId, setContactedId] = useState<string | null>(null);

  const categories = ['All', 'Trades', 'Tech & IT', 'Cleaning', 'Tutoring'];

  const filteredSeekers = useMemo(() => {
    return SAMPLE_SEEKERS.filter((seeker) => {
      const matchesCategory = selectedCategory === 'All' || seeker.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText = 
        seeker.name.toLowerCase().includes(q) ||
        seeker.role.toLowerCase().includes(q) ||
        seeker.location.toLowerCase().includes(q) ||
        seeker.skills.some(skill => skill.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [searchQuery, selectedCategory]);

  const handleContact = (seeker: SeekerProfile) => {
    setContactedId(seeker.id);
    setTimeout(() => setContactedId(null), 3000);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-3.5rem)] bg-slate-50 flex flex-col select-none">
      
      {/* 1. Floating Search Bar in Seekers (Top, leaving space for 3-bar menu at left-3) */}
      <div className="sticky top-3 left-0 right-0 z-30 px-3 pl-16 max-w-md mx-auto w-full">
        <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-slate-200/90 overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/30">
          <div className="pl-3.5 pr-2 text-slate-400 flex items-center">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search seekers, skills or trades..."
            className="w-full py-2.5 text-xs text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="pr-3 pl-1 text-[10px] font-bold text-sky-700 bg-sky-50 py-1 px-2 rounded-xl mr-1 border border-sky-200/60 shrink-0">
            {filteredSeekers.length} Found
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Seekers List Content */}
      <div className="flex-1 max-w-md mx-auto w-full px-3 pt-3 pb-6 flex flex-col gap-3">
        {filteredSeekers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">No seekers found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
              Try searching with another skill or clear filters.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs font-bold text-sky-600 hover:underline cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredSeekers.map((seeker) => (
            <div 
              key={seeker.id}
              className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col gap-2.5"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl ${seeker.avatarBg} text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0`}>
                    {seeker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-slate-900">{seeker.name}</h4>
                      {seeker.isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">{seeker.role}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {seeker.rating} ({seeker.reviewsCount})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {seeker.distance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-950 block">{seeker.rate}</span>
                  <span className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold mt-1 ${
                    seeker.status === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {seeker.status === 'available' ? 'Available' : 'On GiG'}
                  </span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1">
                {seeker.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="text-[9.5px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleContact(seeker)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    contactedId === seeker.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-black text-white'
                  }`}
                >
                  {contactedId === seeker.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Request Sent!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Seeker</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
