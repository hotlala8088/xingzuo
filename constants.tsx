
import { ZodiacData } from './types';

export const ZODIAC_SIGNS: ZodiacData[] = [
  {
    id: 'Aries' as any,
    symbol: '♈',
    dateRange: '3月21日 - 4月19日',
    element: 'Fire' as any,
    rulingPlanet: '火星',
    description: '黄道十二宫的先锋与开拓者。',
    traits: ['自信', '热血', '勇敢', '活力'],
    imageUrl: 'https://images.unsplash.com/photo-1629112469956-6218d6ca7738?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Taurus' as any,
    symbol: '♉',
    dateRange: '4月20日 - 5月20日',
    element: 'Earth' as any,
    rulingPlanet: '金星',
    description: '黄道十二宫的锚点与稳定者。',
    traits: ['耐心', '稳重', '可靠', '感性'],
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Gemini' as any,
    symbol: '♊',
    dateRange: '5月21日 - 6月20日',
    element: 'Air' as any,
    rulingPlanet: '水星',
    description: '宇宙中的交流者与双生灵。',
    traits: ['好奇', '灵活', '机智', '擅交际'],
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Cancer' as any,
    symbol: '♋',
    dateRange: '6月21日 - 7月22日',
    element: 'Water' as any,
    rulingPlanet: '月亮',
    description: '情感的抚育者与守护者。',
    traits: ['直觉', '忠诚', '体贴', '保护欲'],
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Leo' as any,
    symbol: '♌',
    dateRange: '7月23日 - 8月22日',
    element: 'Fire' as any,
    rulingPlanet: '太阳',
    description: '富有戏剧性与创造力的领导者。',
    traits: ['自信', '魅力', '慷慨', '骄傲'],
    imageUrl: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Virgo' as any,
    symbol: '♍',
    dateRange: '8月23日 - 9月22日',
    element: 'Earth' as any,
    rulingPlanet: '水星',
    description: '一丝不苟的治愈者与分析家。',
    traits: ['务实', '严谨', '善良', '勤奋'],
    imageUrl: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Libra' as any,
    symbol: '♎',
    dateRange: '9月23日 - 10月22日',
    element: 'Air' as any,
    rulingPlanet: '金星',
    description: '追求平衡的外交使者。',
    traits: ['优雅', '公平', '社交', '和谐'],
    imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e7de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Scorpio' as any,
    symbol: '♏',
    dateRange: '10月23日 - 11月21日',
    element: 'Water' as any,
    rulingPlanet: '冥王星',
    description: '深邃而神秘的转化者。',
    traits: ['热情', '机智', '勇敢', '谋略'],
    imageUrl: 'https://images.unsplash.com/photo-1629112469956-6218d6ca7738?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Sagittarius' as any,
    symbol: '♐',
    dateRange: '11月22日 - 12月21日',
    element: 'Fire' as any,
    rulingPlanet: '木星',
    description: '热爱冒险的真理寻求者。',
    traits: ['乐观', '随性', '正直', '睿智'],
    imageUrl: 'https://images.unsplash.com/photo-1515339760107-1952b7a08454?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Capricorn' as any,
    symbol: '♑',
    dateRange: '12月22日 - 1月19日',
    element: 'Earth' as any,
    rulingPlanet: '土星',
    description: '雄心勃勃且自律的攀登者。',
    traits: ['抱负', '谨慎', '耐心', '责任感'],
    imageUrl: 'https://images.unsplash.com/photo-1579546673265-927907f168f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Aquarius' as any,
    symbol: '♒',
    dateRange: '1月20日 - 2月18日',
    element: 'Air' as any,
    rulingPlanet: '天王星',
    description: '富有远见的人道主义者。',
    traits: ['独创', '独立', '前卫', '博爱'],
    imageUrl: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'Pisces' as any,
    symbol: '♓',
    dateRange: '2月19日 - 3月20日',
    element: 'Water' as any,
    rulingPlanet: '海王星',
    description: '充满神秘色彩的梦想家与共情者。',
    traits: ['慈悲', '艺术', '直觉', '温柔'],
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800'
  }
];

// Helper for mapping ID to Chinese Name
export const getZodiacName = (id: string) => {
  const map: Record<string, string> = {
    Aries: '白羊座', Taurus: '金牛座', Gemini: '双子座', Cancer: '巨蟹座',
    Leo: '狮子座', Virgo: '处女座', Libra: '天秤座', Scorpio: '天蝎座',
    Sagittarius: '射手座', Capricorn: '摩羯座', Aquarius: '水瓶座', Pisces: '双鱼座'
  };
  return map[id] || id;
};

export const getElementName = (el: string) => {
  const map: Record<string, string> = {
    Fire: '火象', Earth: '土象', Air: '风象', Water: '水象'
  };
  return map[el] || el;
};
