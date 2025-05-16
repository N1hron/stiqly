import clsx from 'clsx';

import styles from './style.module.scss';

type ButtonProps = {
  color?: 'red' | 'green';
  ghost?: boolean;
} & React.ComponentPropsWithRef<'button'>;

function Button({ className, color, ghost, ...props }: ButtonProps) {
  const cn = clsx(
    styles.button,
    color && styles.colored,
    color && styles[color],
    ghost && styles.ghost,
    className
  );

  return <button className={cn} type='button' {...props} />;
}

export { Button };
