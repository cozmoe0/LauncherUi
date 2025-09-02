<script lang="ts">
  import { ChevronDown, Trash2, User } from 'lucide-svelte';
  import type { GameAccount } from '../lib/types';
  import type { Writable } from 'svelte/store';
  import CharacterList from './CharacterList.svelte';

  export let account: GameAccount;
  export let isExpanded: boolean;
  export let playingCharacter: Writable<string | null>;
  export let onToggle: () => void;
  export let onRemove: () => void;
  export let onPlayCharacter: (characterId: string) => void;

  function getAccountInitials(accountName: string): string {
    return accountName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
</script>

<div class="card bg-base-200 border border-base-300 shadow-lg">
  <div class="card-body p-4">
    <div class="flex items-center justify-between">
      <button 
        class="flex items-center gap-3 cursor-pointer flex-1 hover:bg-base-300/50 rounded-lg p-2 transition-colors"
        on:click={onToggle}
      >
        <div class="account-avatar">
          <div class="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center">
            <span class="text-sm font-bold">{getAccountInitials(account.accountName)}</span>
          </div>
        </div>
        <div class="flex-1 text-left">
          <h3 class="text-base-content font-semibold">{account.accountName}</h3>
          <p class="text-base-content/70 text-sm">{account.email}</p>
        </div>
        <div class="transform transition-transform duration-200" class:rotate-180={isExpanded}>
          <ChevronDown class="w-5 h-5 text-base-content/70" />
        </div>
      </button>
      <button
        class="btn btn-ghost btn-sm text-error hover:bg-error/10 ml-2"
        on:click={onRemove}
      >
        <Trash2 class="w-4 h-4" />
      </button>
    </div>

    {#if isExpanded}
      <div class="slide-down">
        <div class="divider my-4"></div>
        
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-base-content">
            <User class="w-4 h-4" />
            <span class="text-sm uppercase tracking-wide font-medium">Characters</span>
          </div>
          
          <CharacterList 
            characters={account.characters}
            {playingCharacter}
            {onPlayCharacter}
          />
        </div>
      </div>
    {/if}
  </div>
</div>