import { Popover } from '@base-ui/react/popover';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faCircleInfo } from '@/shared/icons/fontAwesome';
import { usePlatform } from '@/shared/context/platform';

/** Login-only help; Base UI owns positioning, dismissal and keyboard focus. */
export function RememberIdHelp() {
  const platform = usePlatform();

  return (
    <Popover.Root>
      <Popover.Trigger
        type="button"
        openOnHover
        aria-label="아이디 저장 주의사항"
        className={css({
          display: 'inline-flex',
          p: '0',
          border: '0',
          bg: 'transparent',
          color: 'text.tertiary',
          cursor: 'pointer',
          _focusVisible: { outline: '2px solid black', outlineOffset: '2px' },
        })}
      >
        <Icon fontAwesomeIcon={faCircleInfo} size="16px" />
      </Popover.Trigger>
      <Popover.Portal>
        <div className={`platform-${platform}`}>
          <Popover.Positioner side="top" sideOffset={10} className={css({ zIndex: '100' })}>
            <Popover.Popup
              className={css({
                w: '48',
                maxW: 'calc(100vw - 32px)',
                p: '4',
                bg: 'white.0',
                color: 'black.100',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.15)',
                outline: 'none',
              })}
            >
              <Popover.Title
                render={(props) => (
                  <Typography {...props} as="h2" variant="body4" weight="medium">
                    {props.children}
                  </Typography>
                )}
              >
                주의해주세요
              </Popover.Title>
              <Popover.Description
                render={(props) => (
                  <Typography {...props} as="p" variant="body5" className={css({ mt: '2' })}>
                    {props.children}
                  </Typography>
                )}
              >
                공용으로 사용하는 장소에서는 아이디 저장하기 사용에 유의해주세요.
              </Popover.Description>
              <Popover.Arrow
                className={css({
                  w: '3',
                  h: '3',
                  bg: 'white.0',
                  transform: 'rotate(45deg)',
                  '&[data-side=top]': { bottom: '-6px' },
                  '&[data-side=bottom]': { top: '-6px' },
                })}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}
