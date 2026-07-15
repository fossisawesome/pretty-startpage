<script lang="ts">
  export let settings: { searchUrl: string; placeholder: string };

  let query = '';

  function engineName(url: string): string {
    try { return new URL(url.replace('{q}', 'x')).hostname.replace('www.', '').split('.')[0]; }
    catch { return 'web'; }
  }

  function onSubmit() {
    const q = query.trim();
    if (!q) return;
    window.location.href = settings.searchUrl.replace('{q}', encodeURIComponent(q));
  }
</script>

<div class="w-search">
  <form class="w-search-form" on:submit|preventDefault={onSubmit}>
    <input
      class="search-input"
      type="text"
      bind:value={query}
      placeholder={settings.placeholder || `Search ${engineName(settings.searchUrl)}…`}
      autocomplete="off"
      aria-label="Search query"
    />
    <button class="btn-primary" type="submit">Search</button>
  </form>
</div>

<style lang="scss">
  .w-search { width: 100%; height: 100%; display: flex; align-items: center; }
  .w-search-form { width: 100%; display: flex; gap: 8px; }
  .search-input {
    flex: 1; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border);
    border-radius: 6px; color: var(--text); font-size: 15px; outline: none;
  }
  .search-input:focus { border-color: var(--accent); }
  .btn-primary {
    padding: 10px 16px; background: var(--accent); color: var(--bg); border: none;
    border-radius: 6px; cursor: pointer; font-weight: 600;
  }
</style>
