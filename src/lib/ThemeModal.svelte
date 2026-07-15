<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { THEMES, type ThemeName } from './themes';
  import { focusTrap } from './actions/focusTrap';

  export let open: boolean;
  export let current: ThemeName;
  const dispatch = createEventDispatcher<{ close: void; save: { theme: ThemeName } }>();

  let selected: ThemeName = current;
  $: if (open) selected = current;
</script>

{#if open}
  <div class="modal-overlay open" role="presentation" on:click={(e) => { if (e.target === e.currentTarget) dispatch('close'); }}>
    <div class="modal-content" role="dialog" aria-modal="true" aria-label="Settings" use:focusTrap>
      <h2>Settings</h2>
      <div class="form-group">
        <label for="theme">Theme</label>
        <select id="theme" bind:value={selected}>
          {#each Object.entries(THEMES) as [key, theme]}
            <option value={key}>{theme.name}</option>
          {/each}
        </select>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost" on:click={() => dispatch('close')}>Cancel</button>
        <button class="btn-primary" on:click={() => dispatch('save', { theme: selected })}>Save</button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-overlay { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.45); z-index: 200; }
  .modal-content { width: min(520px, 94%); background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px; }
  .modal-content h2 { margin: 0 0 20px; font-size: 17px; color: var(--text); }
  .modal-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
</style>
