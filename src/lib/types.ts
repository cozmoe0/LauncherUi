export interface Character {
  id: string;
  name: string;
  level: number;
  className: string;
  lastPlayed: string;
  totalPlaytime: string;
}

export interface GameAccount {
  id: string;
  accountName: string;
  email: string;
  characters: Character[];
}