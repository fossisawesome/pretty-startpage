<script lang="ts">
  export let settings: { links: { url: string; label: string }[] };

  function faviconUrl(url: string): string {
    try {
      const host = new URL(url).hostname;
      return `https://icons.duckduckgo.com/ip3/${host}.ico`;
    } catch {
      return '';
    }
  }
</script>

<div class="w-bookmarks">
  {#each settings.links as link}
    <a class="w-bookmark" href={link.url} target="_self" rel="noopener">
      <img src={faviconUrl(link.url)} alt="" width="16" height="16" />
      <span>{link.label}</span>
    </a>
  {:else}
    <div class="w-bookmarks-empty">No bookmarks yet — add some in settings.</div>
  {/each}
</div>

<style lang="scss">
  .w-bookmarks {
    width: 100%; height: 100%; background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px; display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 6px; align-content: start; overflow: auto;
  }
  .w-bookmark {
    display: flex; align-items: center; gap: 6px; padding: 6px 8px; border-radius: 6px;
    color: var(--text); text-decoration: none; font-size: 13px; overflow: hidden;
  }
  .w-bookmark:hover { background: var(--border); }
  .w-bookmark span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .w-bookmarks-empty { font-size: 12px; color: var(--subtext); padding: 8px; }
</style>
