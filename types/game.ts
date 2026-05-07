export type Game = {
  id: string;          // Jedinstveni ID dokumenta iz Firestore-a
  title: string;       // Naslov igre
  description: string; // Kratki opis o čemu se radi
  imageUrl: string;    // Link na sliku koju ćemo prikazati
};