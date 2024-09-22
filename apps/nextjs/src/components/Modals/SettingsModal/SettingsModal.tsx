import { SettingsBody } from './SettingsBody/SettingsBody';
import { BaseModal, cn, type BaseModalProps } from 'side-ui';

export interface SettingsModalProps extends Omit<BaseModalProps, 'body' | 'size' | 'footer'> {
  /**
   * The content to display in the body of the modal.
   */
  className?: string;
}

export const SettingsModal = ({ className, ...restProps }: SettingsModalProps) => {
  const classes = cn('dark:bg-neutral-950', className);
  return (
    <BaseModal
      header={{ title: 'Shortcut Settings', hasCloseBtn: true }}
      body={<SettingsBody />}
      className={classes}
      {...restProps}
    />
  );
};
