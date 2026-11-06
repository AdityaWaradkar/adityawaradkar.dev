// frontend/lib/artData.ts

export type ArtPiece = {
  id: string;
  title: string;
  category: "sketches" | "paintings";
  imageUrl: string;
  medium: string;
  year: string;
  dimensions: string;
  note: string;
};

export const artData: ArtPiece[] = [
  {
    id: "luffy",
    title: "The Future Pirate King",
    category: "paintings",
    imageUrl: "/images/art/painting-3.jpg",
    medium: "Acrylic Markers on Paper",
    year: "2024",
    dimensions: "A3",
    note: "A vibrant tribute to Monkey D. Luffy, focusing on bold colors, clean linework, and his iconic, carefree laugh.",
  },
  {
    id: "cillian-murphy",
    title: "Thomas Shelby Study",
    category: "sketches",
    imageUrl: "/images/art/sketch-3.jpg",
    medium: "Graphite on Paper",
    year: "2023",
    dimensions: "A4",
    note: "A realistic portrait study capturing the intense gaze and sharp features of Cillian Murphy's character.",
  },
  {
    id: "Thor",
    title: "The Avengers",
    category: "sketches",
    imageUrl: "/images/art/sketch-2.jpg",
    medium: "Graphite on Paper",
    year: "2024",
    dimensions: "A3",
    note: "A detailed graphite rendering of Arthur Morgan, focusing on the texture of the beard and the weathering on his face. Drawn using a grid method.",
  },
  {
    id: "wish-you-were-here",
    title: "The Handshake",
    category: "paintings",
    imageUrl: "/images/art/painting-2.jpg",
    medium: "Acrylic Paint on Paper",
    year: "2023",
    dimensions: "A3",
    note: "A stylized scene inspired by Breaking Bad and Better Call Saul, capturing the tension and duality of the characters against a stark blue sky.",
  },
  {
    id: "walter-white",
    title: "Heisenberg",
    category: "sketches",
    imageUrl: "/images/art/sketch-1.jpg",
    medium: "Graphite on Paper",
    year: "2023",
    dimensions: "A3",
    note: "A high-contrast portrait focusing on the deep shadows, glasses, and distinct facial hair of Walter White.",
  },
  {
    id: "sukuna",
    title: "King of Curses",
    category: "paintings",
    imageUrl: "/images/art/painting-1.jpg",
    medium: "Acrylic Markers on Paper",
    year: "2024",
    dimensions: "A4",
    note: "A dynamic, high-contrast piece of Ryomen Sukuna from Jujutsu Kaisen, utilizing a mostly black background to make the reds and oranges pop.",
  }
];