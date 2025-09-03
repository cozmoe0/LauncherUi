import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Play,
  Trash2,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./Sidebar";

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
    id: "1",
    accountName: "Cozmoe0#2241",
    email: "cozmoe0@example.com",
    characters: [
      {
        id: "1",
        name: "Cozmoe000",
        level: 87,
        className: "Members",
        lastPlayed: "2 hours ago",
        totalPlaytime: "234h 12m",
      },
      {
        id: "2",
        name: "CozmoeDev",
        level: 72,
        className: "Free-to-Play",
        lastPlayed: "1 day ago",
        totalPlaytime: "156h 45m",
      },
      {
        id: "3",
        name: "KyleEscobar",
        level: 65,
        className: "Ironman",
        lastPlayed: "3 days ago",
        totalPlaytime: "98h 30m",
      },
    ],
  },
  {
    id: "2",
    accountName: "kyleescobar#9984",
    email: "kyleescobar@example.com",
    characters: [
      {
        id: "4",
        name: "KileGuzman",
        level: 45,
        className: "Hardcore-Ironman",
        lastPlayed: "1 week ago",
        totalPlaytime: "67h 22m",
      },
    ],
  },
];

export function GameLauncher() {
  const [accounts, setAccounts] =
    useState<GameAccount[]>(mockAccounts);
  const [expandedAccounts, setExpandedAccounts] = useState<
    Set<string>
  >(new Set(["1"]));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountEmail, setNewAccountEmail] = useState("");
  const [playingCharacter, setPlayingCharacter] = useState<
    string | null
  >(null);
  const [activeTab, setActiveTab] = useState("accounts");

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
    setAccounts(
      accounts.filter((account) => account.id !== accountId),
    );
    const newExpanded = new Set(expandedAccounts);
    newExpanded.delete(accountId);
    setExpandedAccounts(newExpanded);
  };

  const addAccount = () => {
    if (!newAccountName.trim() || !newAccountEmail.trim())
      return;

    const newAccount: GameAccount = {
      id: Date.now().toString(),
      accountName: newAccountName,
      email: newAccountEmail,
      characters: [],
    };

    setAccounts([...accounts, newAccount]);
    setNewAccountName("");
    setNewAccountEmail("");
    setIsAddDialogOpen(false);
  };

  const createCharacter = (accountId: string) => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "", // Blank name until set in-game
      level: 1,
      className: "New Character",
      lastPlayed: "Never",
      totalPlaytime: "0h 0m",
    };

    setAccounts(
      accounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              characters: [...account.characters, newCharacter],
            }
          : account,
      ),
    );
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
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "accounts":
        return (
          <>
            <div className="text-center mb-8">
              <motion.h1
                className="text-4xl text-white mb-2 tracking-wide relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Rune
                <span className="text-emerald-400">
                  Launcher
                </span>
              </motion.h1>
              <p className="text-slate-400">
                Custom Jagex Launcher for Any Java/Native Client
                binary
              </p>
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
                  <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                    <Collapsible
                      open={expandedAccounts.has(account.id)}
                      onOpenChange={() =>
                        toggleAccount(account.id)
                      }
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer flex-1">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-emerald-600 text-white">
                                  {getAccountInitials(
                                    account.accountName,
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="text-white">
                                  {account.accountName}
                                </h3>
                                <p className="text-slate-400 text-sm">
                                  {account.email}
                                </p>
                              </div>
                              <motion.div
                                animate={{
                                  rotate: expandedAccounts.has(
                                    account.id,
                                  )
                                    ? 180
                                    : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                              </motion.div>
                            </div>
                          </CollapsibleTrigger>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeAccount(account.id)
                            }
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <CollapsibleContent>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <Separator className="my-4 bg-slate-700" />

                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-slate-300">
                                <User className="w-4 h-4" />
                                <span className="text-sm uppercase tracking-wide">
                                  Characters
                                </span>
                              </div>

                              {account.characters.map(
                                (character) => (
                                  <motion.div
                                    key={character.id}
                                    className="bg-slate-750 rounded-lg p-3 border border-slate-700"
                                    whileHover={{
                                      backgroundColor:
                                        "rgb(51 65 85)",
                                    }}
                                    transition={{
                                      duration: 0.2,
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4
                                            className={`${character.name ? "text-white" : "text-slate-400 italic"}`}
                                          >
                                            {character.name ||
                                              "Unnamed Character"}
                                          </h4>
                                          <Badge
                                            variant="secondary"
                                            className="bg-slate-600 text-slate-200 text-xs"
                                          >
                                            Lvl{" "}
                                            {character.level}
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className={`border-slate-600 text-xs ${
                                              character.className ===
                                              "New Character"
                                                ? "text-amber-400 border-amber-400"
                                                : "text-slate-300"
                                            }`}
                                          >
                                            {
                                              character.className
                                            }
                                          </Badge>
                                        </div>
                                        <div className="flex gap-4 text-sm text-slate-400">
                                          <span>
                                            Last played:{" "}
                                            {
                                              character.lastPlayed
                                            }
                                          </span>
                                          <span>
                                            Playtime:{" "}
                                            {
                                              character.totalPlaytime
                                            }
                                          </span>
                                        </div>
                                      </div>
                                      <Button
                                        onClick={() =>
                                          playCharacter(
                                            character.id,
                                          )
                                        }
                                        disabled={
                                          playingCharacter ===
                                          character.id
                                        }
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                                      >
                                        {playingCharacter ===
                                        character.id ? (
                                          <motion.div
                                            animate={{
                                              rotate: 360,
                                            }}
                                            transition={{
                                              duration: 1,
                                              repeat: Infinity,
                                              ease: "linear",
                                            }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                          />
                                        ) : (
                                          <>
                                            <Play className="w-4 h-4 mr-2" />
                                            {character.name
                                              ? "Play"
                                              : "Create & Play"}
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </motion.div>
                                ),
                              )}

                              {/* Create Character Button */}
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  onClick={() =>
                                    createCharacter(account.id)
                                  }
                                  variant="outline"
                                  className="w-full border-slate-600 text-slate-300 bg-slate-600 hover:bg-slate-700 hover:text-white border-dashed py-3"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Create New Character
                                </Button>
                              </motion.div>

                              {account.characters.length ===
                                0 && (
                                <div className="text-center py-4 text-slate-400">
                                  <User className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                  <p className="text-xs">
                                    No characters yet
                                  </p>
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

            <Dialog
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
            >
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Game Account
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Add New Game Account
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="account-name"
                      className="text-slate-300"
                    >
                      Account Name
                    </Label>
                    <Input
                      id="account-name"
                      value={newAccountName}
                      onChange={(e) =>
                        setNewAccountName(e.target.value)
                      }
                      placeholder="Enter account name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="account-email"
                      className="text-slate-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="account-email"
                      type="email"
                      value={newAccountEmail}
                      onChange={(e) =>
                        setNewAccountEmail(e.target.value)
                      }
                      placeholder="Enter email address"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addAccount}
                    disabled={
                      !newAccountName.trim() ||
                      !newAccountEmail.trim()
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Add Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        );

      case "games":
        return (
          <div className="text-center py-20">
            <h2 className="text-white mb-4">Games Library</h2>
            <p className="text-slate-400">
              Games Selection (Old School / RS3)
            </p>
          </div>
        );

      case "downloads":
        return (
          <div className="text-center py-20">
            <h2 className="text-white mb-4">Downloads</h2>
            <p className="text-slate-400">
              Download manager coming soon
            </p>
          </div>
        );

      case "recent":
        return (
          <div className="text-center py-20">
            <h2 className="text-white mb-4">Recent Activity</h2>
            <p className="text-slate-400">
              Recent activity tracking coming soon
            </p>
          </div>
        );

      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-white mb-4">Settings</h2>
            <p className="text-slate-400">Launcher settings</p>
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-white mb-4">Coming Soon</h2>
            <p className="text-slate-400">
              This feature is under development
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="relative z-10 h-screen flex flex-col pr-20">
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <motion.h1
                className="text-4xl text-white mb-2 tracking-wide relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Rune
                <span className="text-emerald-400">
                  Launcher
                </span>
              </motion.h1>
              <p className="text-slate-400">
                Custom Jagex Launcher for Any Java/Native Client
                binary
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {renderContent()}
          </div>
        </div>

        {/* Fixed Footer with Add Game Account Button */}
        <div className="flex-shrink-0 p-6">
          <div className="max-w-2xl mx-auto">
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
            >
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Game Account
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Add New Game Account
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="account-name"
                      className="text-slate-300"
                    >
                      Account Name
                    </Label>
                    <Input
                      id="account-name"
                      value={newAccountName}
                      onChange={(e) =>
                        setNewAccountName(e.target.value)
                      }
                      placeholder="Enter account name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="account-email"
                      className="text-slate-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="account-email"
                      type="email"
                      value={newAccountEmail}
                      onChange={(e) =>
                        setNewAccountEmail(e.target.value)
                      }
                      placeholder="Enter email address"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addAccount}
                    disabled={
                      !newAccountName.trim() ||
                      !newAccountEmail.trim()
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Add Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
