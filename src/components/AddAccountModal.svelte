<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import type { GameAccount } from '../lib/types';

  export let isOpen: boolean;
  export let onAddAccount: (account: GameAccount) => void;

  let newAccountName = '';
  let newAccountEmail = '';
  let modal: HTMLDialogElement;

  $: if (isOpen && modal) {
    modal.showModal();
  } else if (!isOpen && modal) {
    modal.close();
  }

  function handleSubmit() {
    if (!newAccountName.trim() || !newAccountEmail.trim()) return;
    
    const newAccount: GameAccount = {
      id: Date.now().toString(),
      accountName: newAccountName,
      email: newAccountEmail,
      characters: []
    };
    
    onAddAccount(newAccount);
    newAccountName = '';
    newAccountEmail = '';
    isOpen = false;
  }

  function handleCancel() {
    newAccountName = '';
    newAccountEmail = '';
    isOpen = false;
  }

  function handleModalClick(event: MouseEvent) {
    if (event.target === modal) {
      handleCancel();
    }
  }
</script>

<dialog 
  bind:this={modal}
  class="modal modal-bottom sm:modal-middle"
  on:click={handleModalClick}
>
  <div class="modal-box bg-base-200 border border-base-300">
    <h3 class="font-bold text-lg text-base-content mb-4">Add New Game Account</h3>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div class="form-control">
        <label class="label" for="account-name">
          <span class="label-text">Account Name</span>
        </label>
        <input
          id="account-name"
          type="text"
          placeholder="Enter account name"
          class="input input-bordered w-full bg-base-300 border-base-content/20"
          bind:value={newAccountName}
          required
        />
      </div>
      
      <div class="form-control">
        <label class="label" for="account-email">
          <span class="label-text">Email</span>
        </label>
        <input
          id="account-email"
          type="email"
          placeholder="Enter email address"
          class="input input-bordered w-full bg-base-300 border-base-content/20"
          bind:value={newAccountEmail}
          required
        />
      </div>
      
      <div class="modal-action">
        <button
          type="button"
          class="btn btn-ghost"
          on:click={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={!newAccountName.trim() || !newAccountEmail.trim()}
        >
          Add Account
        </button>
      </div>
    </form>
  </div>
</dialog>