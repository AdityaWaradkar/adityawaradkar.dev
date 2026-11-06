export type Book = {
  id: string;
  title: string;
  author: string;
  status: "reading" | "finished";
  category: "technical" | "philosophy" | "psychology" | "fiction";
  rating: number; // 1 to 5
  note: string;
};

export const booksData: Book[] = [
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
    category: "technical",
    rating: 5,
    note: "The bible of distributed systems. It breaks down complex database architectures, consensus algorithms, and scalability patterns in a way that actually makes sense. Essential reading for any backend or DevOps engineer.",
  },
  {
    id: "psycho-cybernetics",
    title: "Psycho-Cybernetics",
    author: "Maxwell Maltz",
    status: "finished",
    category: "psychology",
    rating: 4,
    note: "A fascinating look at self-image and how the brain works like a servo-mechanism. It taught me that changing my internal self-image is the prerequisite for changing my external outcomes.",
  },
  {
    id: "almanack",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    status: "finished",
    category: "philosophy",
    rating: 5,
    note: "A masterclass in leverage, wealth creation, and escaping the status game. Naval's philosophy on specific knowledge and compounding relationships shifted how I view my career.",
  },
  {
    id: "white-nights",
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    status: "finished",
    category: "fiction",
    rating: 5,
    note: "A beautiful, heartbreaking short story about isolation, unrequited love, and the fleeting nature of happiness. Dostoevsky captures the agonizing ecstasy of dreaming like no one else.",
  },
  {
    id: "tuesdays-morrie",
    title: "Tuesdays with Morrie",
    author: "Mitch Albom",
    status: "finished",
    category: "philosophy",
    rating: 4,
    note: "A deeply moving memoir about life's most important lessons. It serves as a stark reminder to not get caught up in the trivialities of the world and to focus on love, forgiveness, and community.",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    status: "finished",
    category: "philosophy",
    rating: 5,
    note: "The definitive text on Stoicism. Aurelius wrote this for himself, not for an audience, making it incredibly raw. I return to it frequently to remind myself to focus only on what is within my control.",
  }
];