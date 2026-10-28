import { expect, within } from 'storybook/test';

/** Verify the shared frame using rendered geometry, including the optional introduction. */
export async function assertAccountFormLayout(
  canvasElement: HTMLElement,
  contentWidth: number,
  actionSpacing?: number,
) {
  await canvasElement.ownerDocument.fonts.ready;

  const canvas = within(canvasElement);
  const main = canvas.getByRole('main');
  const heading = canvas.getByRole('heading', { level: 1 });
  const header = heading.parentElement!;
  const content = header.nextElementSibling!;
  const frame = main.firstElementChild!;
  const mobile = Boolean(main.closest('.platform-mobile'));
  const view = canvasElement.ownerDocument.defaultView!;

  await expect(canvas.getAllByRole('main')).toHaveLength(1);
  await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  await expect(
    content.getBoundingClientRect().top - header.getBoundingClientRect().bottom,
  ).toBeCloseTo(mobile ? 32 : 40, 1);
  await expect(view.getComputedStyle(frame).maxWidth).toBe(`${contentWidth}px`);
  await expect(frame.getBoundingClientRect().width).toBeCloseTo(
    Math.min(contentWidth, main.getBoundingClientRect().width - (mobile ? 32 : 40)),
    1,
  );
  await expect(view.getComputedStyle(heading).fontSize).toBe(mobile ? '22px' : '28px');
  await expect(view.getComputedStyle(heading).fontWeight).toBe('900');

  if (actionSpacing !== undefined) {
    const actions = frame.lastElementChild!;
    const previous = actions.previousElementSibling!;
    const actionButtons = within(actions as HTMLElement).getAllByRole('button');

    await expect(view.getComputedStyle(actions).display).toBe('grid');
    await expect(view.getComputedStyle(actions).columnGap).toBe('8px');
    await expect(actionButtons).toHaveLength(2);
    await expect(actionButtons[0].getBoundingClientRect().width).toBeCloseTo(
      actionButtons[1].getBoundingClientRect().width,
      1,
    );
    await expect(
      actions.getBoundingClientRect().top - previous.getBoundingClientRect().bottom,
    ).toBeCloseTo(actionSpacing, 1);

    const submit = actionButtons.find((button) => button.getAttribute('type') === 'submit') as
      HTMLButtonElement | undefined;
    if (submit) await expect(submit.form).toBe(frame.querySelector('form'));
  }

  const description = within(header).queryByRole('paragraph');
  if (description) {
    await expect(
      description.getBoundingClientRect().top - heading.getBoundingClientRect().bottom,
    ).toBeCloseTo(12, 1);
  }
}
