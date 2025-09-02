<script lang="ts">
  import { accounts, expandedAccounts, playingCharacter } from '../lib/stores';
  import { ChevronDown, Plus, Play, Trash2, User } from 'lucide-svelte';
  import type { GameAccount } from '../lib/types';
  import AccountCard from './AccountCard.svelte';
  import AddAccountModal from './AddAccountModal.svelte';

  let isAddDialogOpen = false;

  function toggleAccount(accountId: string) {
    expandedAccounts.update(expanded => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(accountId)) {
        newExpanded.delete(accountId);
      } else {
        newExpanded.add(accountId);
      }
      return newExpanded;
    });
  }

  function removeAccount(accountId: string) {
    accounts.update(accountList => 
      accountList.filter(account => account.id !== accountId)
    );
    expandedAccounts.update(expanded => {
      const newExpanded = new Set(expanded);
      newExpanded.delete(accountId);
      return newExpanded;
    });
  }

  function addAccount(newAccount: GameAccount) {
    accounts.update(accountList => [...accountList, newAccount]);
    isAddDialogOpen = false;
  }

  function playCharacter(characterId: string) {
    playingCharacter.set(characterId);
    // Simulate launching game
    setTimeout(() => {
      playingCharacter.set(null);
    }, 2000);
  }
</script>

<div class="min-h-screen bg-base-100 p-6" data-theme="dark">
  <div class="max-w-2xl mx-auto space-y-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-base-content mb-2">Game Launcher</h1>
      <p class="text-base-content/70">Manage your accounts and characters</p>
    </div>

    <div class="space-y-4">
      {#each $accounts as account (account.id)}
        <div class="fade-in">
          <AccountCard 
            {account}
            isExpanded={$expandedAccounts.has(account.id)}
            {playingCharacter}
            onToggle={() => toggleAccount(account.id)}
            onRemove={() => removeAccount(account.id)}
            onPlayCharacter={playCharacter}
          />
        </div>
      {/each}
    </div>

    <button 
      class="btn btn-primary btn-lg w-full gap-2 hover:scale-[1.02] transition-transform"
      on:click={() => isAddDialogOpen = true}
    >
      <Plus class="w-5 h-5" />
      Add Jagex Account
    </button>

    <AddAccountModal 
      bind:isOpen={isAddDialogOpen}
      onAddAccount={addAccount}
    />
  </div>
</div>