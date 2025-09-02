import { writable } from 'svelte/store';
import type { GameAccount } from './types';

export const mockAccounts: GameAccount[] = [
  {
    id: '1',
    accountName: 'Main Account',
    email: 'player@example.com',
    characters: [
      {
        id: '1',
        name: 'ShadowKnight',
        level: 87,
        className: 'Warrior',
        lastPlayed: '2 hours ago',
        totalPlaytime: '234h 12m'
      },
      {
        id: '2',
        name: 'MysticMage',
        level: 72,
        className: 'Mage',
        lastPlayed: '1 day ago',
        totalPlaytime: '156h 45m'
      },
      {
        id: '3',
        name: 'SwiftArrow',
        level: 65,
        className: 'Ranger',
        lastPlayed: '3 days ago',
        totalPlaytime: '98h 30m'
      }
    ]
  },
  {
    id: '2',
    accountName: 'Alt Account',
    email: 'alt@example.com',
    characters: [
      {
        id: '4',
        name: 'Ironman_Bob',
        level: 45,
        className: 'Ironman',
        lastPlayed: '1 week ago',
        totalPlaytime: '67h 22m'
      }
    ]
  }
];

export const accounts = writable<GameAccount[]>(mockAccounts);
export const expandedAccounts = writable<Set<string>>(new Set(['1']));
export const playingCharacter = writable<string | null>(null);