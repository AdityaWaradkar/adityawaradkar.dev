// frontend/lib/booksData.ts

export type Book = {
  id: string;
  title: string;
  author: string;
  status: "reading" | "finished";
  category: "technical" | "philosophy" | "psychology" | "fiction";
  coverUrl?: string; // Added this
  note: string;
};

export const booksData: Book[] = [
  {
    id: "psycho-cybernetics",
    title: "Psycho-Cybernetics",
    author: "Maxwell Maltz",
    status: "reading",
    category: "psychology",
    coverUrl: "/images/books/psycho.jpg",
    note: "A fascinating look at self-image and how the brain works like a servo-mechanism. It taught me that changing my internal self-image is the prerequisite for changing my external outcomes.",
  },
    {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    status: "finished",
    category: "psychology",
    coverUrl: "/images/books/subtle-art.jpg",
    note: "A refreshingly blunt take on self-help. It strips away the toxic positivity and reminds you that you only have a limited number of 'f*cks' to give, so you should spend them on things that actually matter. It shifted my perspective on what problems are worth solving.",
  },
  {
    id: "almanack",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    status: "finished",
    category: "philosophy",
    coverUrl: "/images/books/naval.jpg",
    note: "A masterclass in leverage, wealth creation, and escaping the status game. Naval's philosophy on specific knowledge and compounding relationships shifted how I view my career.",
  },
  {
    id: "white-nights",
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    status: "finished",
    category: "fiction",
    coverUrl: "/images/books/whitenights.jpg",
    note: "A beautiful, heartbreaking short story about isolation, unrequited love, and the fleeting nature of happiness. Dostoevsky captures the agonizing ecstasy of dreaming like no one else.",
  },
  {
    id: "tuesdays-morrie",
    title: "Tuesdays with Morrie",
    author: "Mitch Albom",
    status: "finished",
    category: "philosophy",
    coverUrl: "/images/books/morrie.jpg",
    note: "A deeply moving memoir about life's most important lessons. It serves as a stark reminder to not get caught up in the trivialities of the world and to focus on love, forgiveness, and community.",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    status: "finished",
    category: "philosophy",
    coverUrl: "/images/books/meditations.jpg",
    note: "The definitive text on Stoicism. Aurelius wrote this for himself, not for an audience, making it incredibly raw. I return to it frequently to remind myself to focus only on what is within my control.",
  }
];