import { expect, type Page, test } from '@playwright/test'

/** Демо с ?e2e=1 — без фейковых push через 3/5/6 с */
async function openDemo(page: Page) {
  await page.goto('/?e2e=1')
  await expect(page.getByTestId('demo-chat-app')).toBeVisible()
  await expect(page.getByTestId('chat-list')).toBeVisible()
}

function chatItem(page: Page, chatId: string | number) {
  return page.locator(`[data-testid="chat-item"][data-chat-id="${chatId}"]`)
}

test.describe('Chotto demo E2E', () => {
  test('выбор чата открывает ленту с сообщениями', async ({ page }) => {
    await openDemo(page)

    await chatItem(page, 2).click()

    await expect(page.getByTestId('feed')).toBeVisible()
    await expect(page.getByTestId('feed-scroll')).toBeVisible()
    await expect(page.getByTestId('feed-message').first()).toBeVisible()
    await expect(page.locator('[data-testid="feed-message"][data-message-id="45"]')).toBeVisible()
  })

  test('отправка текста добавляет сообщение в ленту', async ({ page }) => {
    await openDemo(page)
    await chatItem(page, 4).click()
    await expect(page.getByTestId('chat-input-textarea')).toBeVisible()

    const text = `e2e-send-${Date.now()}`
    await page.getByTestId('chat-input-textarea').fill(text)
    await page.getByTestId('chat-input-send').click()

    await expect(page.getByTestId('feed-message').filter({ hasText: text })).toBeVisible()
  })

  test('reply: dblclick показывает quote-line, send с reply виден в ленте', async ({ page }) => {
    await openDemo(page)
    await chatItem(page, 2).click()
    await expect(page.getByTestId('feed-message').first()).toBeVisible()

    const target = page.locator('[data-testid="feed-message"][data-message-id="45"]')
    await target.scrollIntoViewIfNeeded()
    await target.dblclick()

    const replyLine = page.getByTestId('chat-input-reply-line')
    await expect(replyLine).toBeVisible()

    const text = `e2e-reply-${Date.now()}`
    await page.getByTestId('chat-input-textarea').fill(text)
    await page.getByTestId('chat-input-send').click()

    const sent = page.getByTestId('feed-message').filter({ hasText: text })
    await expect(sent).toBeVisible()
    await expect(sent.getByTestId('feed-reply-quote')).toBeVisible()
  })

  test('смена чата не оставляет сообщения предыдущего чата', async ({ page }) => {
    await openDemo(page)

    await chatItem(page, 2).click()
    await expect(page.locator('[data-testid="feed-message"][data-message-id="45"]')).toBeVisible()

    await chatItem(page, 4).click()
    await expect(page.getByTestId('feed')).toBeVisible()
    await expect(page.locator('[data-testid="feed-message"][data-message-id="45"]')).toHaveCount(0)

    // у chat 4 есть характерный длинный текст
    await expect(
      page.getByTestId('feed-message').filter({
        hasText: 'Оченьдлинноесообщениебезпробелов',
      }).first(),
    ).toBeVisible()
  })
})
