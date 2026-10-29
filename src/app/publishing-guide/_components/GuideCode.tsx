import { css } from 'styled-system/css';

const codeTag = css({ color: 'blue.100' });
const codeAttribute = css({ color: 'mossGreen.100' });
const codeString = css({ color: 'red.80' });
const codePunctuation = css({ color: 'black.60' });

const codeTokenPattern =
  /(<\/?)([A-Za-z][\w.]*)|([A-Za-z][\w-]*)(?==)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([{}=/>])/g;

export function renderGuideCode(code: string) {
  const tokens = [];
  let previousIndex = 0;

  for (const match of code.matchAll(codeTokenPattern)) {
    const index = match.index ?? 0;
    if (index > previousIndex) tokens.push(code.slice(previousIndex, index));

    const className =
      match[1] || match[2]
        ? codeTag
        : match[3]
          ? codeAttribute
          : match[4]
            ? codeString
            : codePunctuation;
    tokens.push(
      <span key={`${index}-${match[0]}`} className={className}>
        {match[0]}
      </span>,
    );
    previousIndex = index + match[0].length;
  }

  if (previousIndex < code.length) tokens.push(code.slice(previousIndex));
  return tokens;
}
