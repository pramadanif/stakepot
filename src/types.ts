import { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialCard {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  likes: string;
}
