<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let settings: { links: { url: string; label: string }[] };
  const dispatch = createEventDispatcher<{ change: typeof settings }>();

  function emit() {
    settings = { ...settings, links: [...settings.links] };
    dispatch('change', settings);
  }

  function addLink() {
    settings.links = [...settings.links, { url: '', label: '' }];
    emit();
  }

  function removeLink(i: number) {
    settings.links = settings.links.filter((_, idx) => idx !== i);
    emit();
  }
</script>

<div class="form-group">
  <span class="group-label">Bookmarks</span>
  {#each settings.links as link, i}
    <div class="bookmark-row">
      <input type="text" placeholder="Label" bind:value={link.label} on:change={emit} />
      <input type="text" placeholder="https://example.com" bind:value={link.url} on:change={emit} />
      <button type="button" class="btn-ghost" on:click={() => removeLink(i)}>✕</button>
    </div>
  {/each}
  <button type="button" class="btn-ghost" on:click={addLink}>+ Add bookmark</button>
</div>

<style lang="scss">
  .group-label { font-size: 13px; color: var(--subtext); font-weight: 500; display: block; margin-bottom: 6px; }
  .bookmark-row { display: flex; gap: 6px; margin-bottom: 6px; }
  .bookmark-row input { flex: 1; min-width: 0; }
</style>
