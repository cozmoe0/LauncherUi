import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronDown, ChevronUp, Plus, Play, Trash2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Character {
  id: string;
  name: string;
  level: number;
  className: string;
  lastPlayed: string;
  totalPlaytime: string;
}

interface GameAccount {
  id: string;
  accountName: string;
  email: string;
  characters: Character[];
}

const mockAccounts: GameAccount[] = [
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

export function GameLauncher() {
  const [accounts, setAccounts] = useState<GameAccount[]>(mockAccounts);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set(['1']));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountEmail, setNewAccountEmail] = useState('');
  const [playingCharacter, setPlayingCharacter] = useState<string | null>(null);

  const toggleAccount = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const removeAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    const newExpanded = new Set(expandedAccounts);
    newExpanded.delete(accountId);
    setExpandedAccounts(newExpanded);
  };

  const addAccount = () => {
    if (!newAccountName.trim() || !newAccountEmail.trim()) return;
    
    const newAccount: GameAccount = {
      id: Date.now().toString(),
      accountName: newAccountName,
      email: newAccountEmail,
      characters: []
    };
    
    setAccounts([...accounts, newAccount]);
    setNewAccountName('');
    setNewAccountEmail('');
    setIsAddDialogOpen(false);
  };

  const playCharacter = (characterId: string) => {
    setPlayingCharacter(characterId);
    // Simulate launching game
    setTimeout(() => {
      setPlayingCharacter(null);
    }, 2000);
  };

  const getAccountInitials = (accountName: string) => {
    return accountName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#1e2124] p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Game Launcher</h1>
          <p className="text-[#b0b3b8]">Manage your accounts and characters</p>
        </div>

        <AnimatePresence>
          {accounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-[#2f3136] border-[#40444b]">
                <Collapsible
                  open={expandedAccounts.has(account.id)}
                  onOpenChange={() => toggleAccount(account.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer flex-1">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-[#5865f2] text-white">
                              {getAccountInitials(account.accountName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-white">{account.accountName}</h3>
                            <p className="text-[#b0b3b8] text-sm">{account.email}</p>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedAccounts.has(account.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-[#b0b3b8]" />
                          </motion.div>
                        </div>
                      </CollapsibleTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAccount(account.id)}
                        className="text-[#ed4245] hover:text-[#ff6b6b] hover:bg-[#ed4245]/10 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <CollapsibleContent>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <Separator className="my-4 bg-[#40444b]" />
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-[#dcddde]">
                            <User className="w-4 h-4" />
                            <span className="text-sm uppercase tracking-wide">Characters</span>
                          </div>
                          
                          {account.characters.length > 0 ? (
                            account.characters.map((character) => (
                              <motion.div
                                key={character.id}
                                className="bg-[#36393f] rounded-lg p-3 border border-[#40444b]"
                                whileHover={{ backgroundColor: '#40444b' }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="text-white">{character.name}</h4>
                                      <Badge 
                                        variant="secondary" 
                                        className="bg-[#4f545c] text-[#dcddde] text-xs"
                                      >
                                        Lvl {character.level}
                                      </Badge>
                                      <Badge 
                                        variant="outline"
                                        className="border-[#4f545c] text-[#dcddde] text-xs"
                                      >
                                        {character.className}
                                      </Badge>
                                    </div>
                                    <div className="flex gap-4 text-sm text-[#b0b3b8]">
                                      <span>Last played: {character.lastPlayed}</span>
                                      <span>Playtime: {character.totalPlaytime}</span>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => playCharacter(character.id)}
                                    disabled={playingCharacter === character.id}
                                    className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6"
                                  >
                                    {playingCharacter === character.id ? (
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                      />
                                    ) : (
                                      <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Play
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-6 text-[#b0b3b8]">
                              <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No characters found</p>
                              <p className="text-xs">Create a character to get started</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-6">
                <Plus className="w-5 h-5 mr-2" />
                Add Jagex Account
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-[#2f3136] border-[#40444b] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Game Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="account-name" className="text-[#dcddde]">
                  Account Name
                </Label>
                <Input
                  id="account-name"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  placeholder="Enter account name"
                  className="bg-[#40444b] border-[#4f545c] text-white placeholder:text-[#b0b3b8]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-email" className="text-[#dcddde]">
                  Email
                </Label>
                <Input
                  id="account-email"
                  type="email"
                  value={newAccountEmail}
                  onChange={(e) => setNewAccountEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-[#40444b] border-[#4f545c] text-white placeholder:text-[#b0b3b8]"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-[#4f545c] text-[#dcddde] hover:bg-[#40444b]"
              >
                Cancel
              </Button>
              <Button
                onClick={addAccount}
                disabled={!newAccountName.trim() || !newAccountEmail.trim()}
                className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
              >
                Add Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}