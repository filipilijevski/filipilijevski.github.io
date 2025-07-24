/* Hard-coded sample data shown for every search
   ──────────────────────────────────────────── */
export interface Coach {
  id: number;
  name: string;
  pricePerHour: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  region: string;
  languages: string[];
  availability: string;
  avatar: string;
}

export interface Client {
  id: number;
  name: string;
  lookingFor: 'Beginner' | 'Intermediate' | 'Advanced';
  budget: string;
  region: string;
  languages: string[];
  avatar: string;
}

/* ─── named exports guaranteed ─── */
export const coaches: Coach[] = [
  {
    id: 1,
    name: 'Monsieur Coach',
    pricePerHour: '45',
    level: 'Advanced',
    region: 'Toronto, ON',
    languages: ['English', 'Mandarin'],
    availability: 'Weeknights & Weekends',
    avatar: 'assets/malong.jpg',
  },
  {
    id: 2,
    name: 'Mister Coach',
    pricePerHour: '35',
    level: 'Intermediate',
    region: 'Montreal, QC',
    languages: ['English', 'French', 'Spanish'],
    availability: 'Weekdays 9-17h',
    avatar: 'assets/wangzhen.webp',
  },
  {
    id: 3,
    name: 'Sir Coach',
    pricePerHour: '55',
    level: 'Advanced',
    region: 'Vancouver, BC',
    languages: ['English', 'German'],
    availability: 'Sat & Sun only',
    avatar: 'assets/edwardly.webp',
  },
];

export const clients: Client[] = [
  {
    id: 101,
    name: 'Mister Client',
    lookingFor: 'Beginner',
    budget: '$40 - $60',
    region: 'Ottawa, ON',
    languages: ['English', 'Korean'],
    avatar: 'assets/edwardly.webp',
  },
  {
    id: 102,
    name: 'Monsieur Client',
    lookingFor: 'Intermediate',
    budget: '$30 - $50',
    region: 'Calgary, AB',
    languages: ['English', 'Mandarin'],
    avatar: 'assets/coachpic3.webp',
  },
  {
    id: 103,
    name: 'Sir Client',
    lookingFor: 'Advanced',
    budget: '$50 - $70',
    region: 'Montreal, QC',
    languages: ['French', 'English'],
    avatar: 'assets/olympics.jpg',
  },
];
