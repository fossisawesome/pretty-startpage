export function focusTrap(node: HTMLElement) {
  const previouslyFocused = document.activeElement as HTMLElement | null;

  function focusables(): HTMLElement[] {
    return Array.from(node.querySelectorAll('button, input, select, textarea'));
  }

  setTimeout(() => focusables()[0]?.focus(), 30);

  function onKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const els = focusables();
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }

  node.addEventListener('keydown', onKeydown);

  return {
    destroy() {
      node.removeEventListener('keydown', onKeydown);
      previouslyFocused?.focus?.();
    },
  };
}
