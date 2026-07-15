<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let settings: { searchUrl: string; placeholder: string };

  const dispatch = createEventDispatcher<{ change: typeof settings }>();

  const PRESETS: Record<string, string> = {
    'https://duckduckgo.com/?q={q}': 'DuckDuckGo',
    'https://www.google.com/search?q={q}': 'Google',
    'https://www.startpage.com/search?q={q}': 'Startpage',
    'https://www.qwant.com/?q={q}': 'Qwant',
    'https://yandex.com/search/?text={q}': 'Yandex',
  };

  $: preset = PRESETS[settings.searchUrl] ? settings.searchUrl : 'custom';

  function onPresetChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    if (value !== 'custom') {
      settings.searchUrl = value;
      dispatch('change', settings);
    }
  }

  function emit() {
    dispatch('change', settings);
  }
</script>

<div class="form-group">
  <label for="preset">Search engine preset</label>
  <select id="preset" value={preset} on:change={onPresetChange}>
    <option value="custom">Custom</option>
    {#each Object.entries(PRESETS) as [url, name]}
      <option value={url}>{name}</option>
    {/each}
  </select>
</div>
<div class="form-group">
  <label for="searchUrl">Custom URL (use {'{q}'} for query)</label>
  <input id="searchUrl" type="text" bind:value={settings.searchUrl} on:change={emit} />
  <small>DuckDuckGo: https://duckduckgo.com/?q={'{q}'}</small>
</div>
<div class="form-group">
  <label for="placeholder">Placeholder text</label>
  <input id="placeholder" type="text" bind:value={settings.placeholder} on:change={emit} placeholder="Search the web…" />
</div>
