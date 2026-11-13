// frontend/lib/booksData.ts

export type Book = {
  id: string;
  title: string;
  author: string;
  status: "reading" | "finished";
  category: "technical" | "philosophy" | "psychology" | "fiction";
  coverUrl?: string;
  summary: string; // Renamed from 'note' to 'summary'
};

export const booksData: Book[] = [
  {
    id: "psycho-cybernetics",
    title: "Psycho-Cybernetics",
    author: "Maxwell Maltz",
    status: "reading",
    category: "psychology",
    coverUrl: "/images/books/psycho.jpg",
    summary: "A foundational psychology book that explores how the brain acts as a 'servo-mechanism' to achieve goals. It focuses on the concept of self-image and how altering your internal perception is key to changing your external reality.",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    status: "finished",
    category: "psychology",
    coverUrl: "/images/books/subtle-art.jpg",
    summary: "A counterintuitive self-help book that argues against constant positivity. It emphasizes accepting life's struggles and choosing which values and problems are actually worth caring about.",
  },
  {
    id: "almanack",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    status: "finished",
    category: "philosophy",
    coverUrl: "/images/books/naval.jpg",
    summary: "A curated collection of wisdom from entrepreneur Naval Ravikant. It covers topics like building specific knowledge, using leverage, creating wealth, and finding happiness through a philosophical lens.",
  },
  {
    id: "white-nights",
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    status: "finished",
    category: "fiction",
    coverUrl: "/images/books/whitenights.jpg",
    summary: "A classic short story about a lonely dreamer who meets a young woman over four nights in St. Petersburg. It explores themes of isolation, unrequited love, and the fleeting nature of human connection.",
  },
  {
    id: "tuesdays-morrie",
    title: "Tuesdays with Morrie",
    author: "Mitch Albom",
    status: "finished",
    category: "philosophy",
    coverUrl: "/images/books/morrie.jpg",
    summary: "A memoir recounting the author's weekly visits to his former sociology professor, Morrie Schwartz, who is dying of ALS. The book captures their discussions on life, love, work, and death.",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    status: "finished",
    category: "philosophy",
    coverUrl: "/images/books/meditations.jpg",
    summary: "The personal writings of Roman Emperor Marcus Aurelius. As a cornerstone of Stoic philosophy, it offers practical guidance on self-discipline, emotional resilience, and focusing only on what is within one's control.",
  }
];