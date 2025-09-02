<script lang="ts">
  import { Play, User } from 'lucide-svelte';
  import type { Character } from '../lib/types';
  import type { Writable } from 'svelte/store';

  export let characters: Character[];
  export let playingCharacter: Writable<string | null>;
  export let onPlayCharacter: (characterId: string) => void;
</script>

{#if characters.length > 0}
  {#each characters as character (character.id)}
    <div class="character-card bg-base-300 rounded-lg p-3 border border-base-content/10">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="text-base-content font-semibold">{character.name}</h4>
            <div class="badge badge-secondary badge-sm">
              Lvl {character.level}
            </div>
            <div class="badge badge-outline badge-sm">
              {character.className}
            </div>
          </div>
          <div class="flex gap-4 text-sm text-base-content/70">
            <span>Last played: {character.lastPlayed}</span>
            <span>Playtime: {character.totalPlaytime}</span>
          </div>
        </div>
        <button
          class="play-button"
          class:loading={$playingCharacter === character.id}
          disabled={$playingCharacter === character.id}
          on:click={() => onPlayCharacter(character.id)}
        >
          {#if $playingCharacter === character.id}
            <span class="loading-spinner"></span>
          {:else}
            <Play class="w-4 h-4" />
            Play
          {/if}
        </button>
      </div>
    </div>
  {/each}
{:else}
  <div class="text-center py-6 text-base-content/50">
    <User class="w-8 h-8 mx-auto mb-2 opacity-50" />
    <p class="text-sm">No characters found</p>
    <p class="text-xs">Create a character to get started</p>
  </div>
{/if}