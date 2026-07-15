export interface Program {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  schedule: string;
  price: number;
  duration: string;
  image?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}