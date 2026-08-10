import { createApp, type App } from 'vue'
import ConfirmDeleteMessage from '@/components/2_modals/ConfirmDeleteMessage/ConfirmDeleteMessage.vue'

function resolveTheme(theme?: string): string {
  if (theme) return theme
  return document.querySelector('[data-theme]')?.getAttribute('data-theme') || 'light'
}

/** Показывает диалог «Удалить сообщение?» и возвращает true при подтверждении */
export function useConfirmDeleteMessage(theme?: string): Promise<boolean> {
  return new Promise((resolve) => {
    const mountEl = document.createElement('div')
    document.body.appendChild(mountEl)

    let app: App | null = null

    const cleanup = (confirmed: boolean) => {
      if (app) {
        app.unmount()
        app = null
      }
      if (mountEl.parentNode) {
        mountEl.parentNode.removeChild(mountEl)
      }
      resolve(confirmed)
    }

    app = createApp(ConfirmDeleteMessage, {
      theme: resolveTheme(theme),
      onConfirm: () => cleanup(true),
      onCancel: () => cleanup(false),
    })
    app.mount(mountEl)
  })
}
