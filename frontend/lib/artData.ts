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
    title: "Monkey D. Luffy",
    category: "paintings",
    imageUrl: "/images/art/painting-3.jpg",
    medium: "Poster color on paper",
    year: "2025",
    dimensions: "A3",
    note: "I felt compelled to draw Luffy because of his relentless optimism. He never gives up, always smiles through tough situations, and relentlessly chases his dream. Capturing that energy on paper was my way of reflecting on those qualities.",
  },
  {
    id: "cillian-murphy",
    title: "Cillian Murphy (Oppenheimer)",
    category: "sketches",
    imageUrl: "/images/art/sketch-3.jpg",
    medium: "Graphite pencils on paper",
    year: "2023",
    dimensions: "A3",
    note: "As a huge fan of movies, this specific shot from Oppenheimer stuck in my mind and I felt compelled to try sketching it. It ended up being one of my best pieces. The funny part is that I actually drew this before I had even watched the film.",
  },
  {
    id: "thor",
    title: "Thor (Ragnarok)",
    category: "sketches",
    imageUrl: "/images/art/sketch-2.jpg",
    medium: "Graphite pencil on paper",
    year: "2023",
    dimensions: "A3",
    note: "I always liked Thor more than anyone else in the Marvel universe, until Loki became my favorite after his series. This is also the first highly detailed and realistic sketch I ever made. It took me a whole year to complete, and I will never forget the process.",
  },
  {
    id: "wish-you-were-here",
    title: "Wish You Were Here",
    category: "paintings",
    imageUrl: "/images/art/painting-2.jpg",
    medium: "Poster color on paper",
    year: "2026",
    dimensions: "A3",
    note: "I really like the Wish You Were Here album by Pink Floyd, not just for the music but for the concept behind it. The album cover is so iconic that I felt inspired to recreate it.",
  },
   {
    id: "walter-white",
    title: "Heisenberg",
    category: "sketches",
    imageUrl: "/images/art/sketch-1.jpg",
    medium: "Graphite pencil on paper",
    year: "2024",
    dimensions: "A3",
    note: "This is the best sketch I have ever made to date. I have watched Breaking Bad three times, so making this piece was an absolute necessity.",
  },
  {
    id: "sukuna",
    title: "Ryomen Sukuna",
    category: "paintings",
    imageUrl: "/images/art/painting-1.jpg",
    medium: "Poster color on paper",
    year: "2026",
    dimensions: "A3",
    note: "I really like Sukuna; he is incredibly cool and full of aura. I was inspired to paint this right after watching the Sukuna vs. Mahoraga fight scene, and I simply couldn't hold back from making it.",
  },
    {
    id: "zenitsu",
    title: "Zenitsu Agatsuma",
    category: "paintings",
    imageUrl: "/images/art/painting-4.jpg",
    medium: "Poster color on paper",
    year: "2025",
    dimensions: "A3",
    note: "I made this painting right after watching the Demon Slayer: Infinity Castle movie. The intense lighting on his face and the contrast against the black background made it a really fun piece to work on.",
  },
    {
    id: "zoro",
    title: "Roronoa Zoro (Wano)",
    category: "paintings",
    imageUrl: "/images/art/painting-5.jpg",
    medium: "Poster color on paper",
    year: "2024",
    dimensions: "A3",
    note: "I made this painting because it showcases Zoro's best outfit from the Wano arc. I also included the Japanese text on the right side, which translates to 'King of Hell'.",
  },
    {
    id: "jon-snow",
    title: "Jon Snow (Kit Harington)",
    category: "sketches",
    imageUrl: "/images/art/sketch-4.jpg",
    medium: "Graphite pencil on paper",
    year: "2025",
    dimensions: "A3",
    note: "I made this sketch right after finishing Game of Thrones. Kit Harington's portrayal of the King in the North is iconic, and I wanted to capture his brooding expression and distinct facial hair.",
  },
    {
    id: "cillian-murphy-process",
    title: "Cillian Murphy Hairs",
    category: "sketches",
    imageUrl: "/images/art/sketch-5.jpg",
    medium: "Graphite pencil on paper",
    year: "2023",
    dimensions: "A3",
    note: "This is a progress shot of a portrait I was working on. I wanted to capture the most realistic hair I had ever drawn, which took a tremendous amount of time and patience to get right. It shows the process before the face was complete.",
  },
    {
    id: "sanemi",
    title: "Sanemi Shinazugawa",
    category: "paintings",
    imageUrl: "/images/art/painting-6.jpg",
    medium: "Poster color on paper",
    year: "2023",
    dimensions: "A3",
    note: "I made this painting right after the official Hashira posters for Demon Slayer were launched on social media. The design looked incredibly cool, so I felt inspired to recreate it.",
  },
    {
    id: "robert-downey-jr",
    title: "Robert Downey Jr.",
    category: "sketches",
    imageUrl: "/images/art/sketch-6.jpg",
    medium: "Graphite on paper",
    year: "2022",
    dimensions: "A3",
    note: "I chose to sketch this specific photo because it has incredibly interesting facial features. Capturing the eyes behind the tinted goggles and the texture of the beard was a unique and challenging study in shading.",
  },
];