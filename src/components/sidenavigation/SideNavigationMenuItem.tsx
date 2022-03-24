import { Back, Bandage } from '@navikt/ds-icons';
import cn from 'classnames';
import { BodyShort, Button } from '@navikt/ds-react';
import React from 'react';
import Link from 'next/link';

import { cleanId } from '../../utils/stringUtils';

import { Pages, useActivePage } from './useActivePage';
import styles from './SideNavigationMenuItem.module.css';

interface BaseProps {
    href: string;
    children: string;
    className?: string;
    external?: 'proxy' | 'relative';
}

interface SimpleSideNavigationMenuItemProps extends BaseProps {
    Icon: typeof Bandage;
}

export function SimpleSideNavigationMenuItem({
    href,
    className,
    Icon,
    children,
    external,
}: SimpleSideNavigationMenuItemProps): JSX.Element {
    const id = cleanId(children);

    const content = (
        <>
            <Icon className={styles.icon} />
            {children}
        </>
    );

    const buttonProps = {
        id,
        as: 'a' as const,
        variant: 'tertiary' as const,
        className: cn(styles.menuItem, className),
    };

    if (external === 'relative') {
        return (
            <li aria-labelledby={id}>
                <Button target="_blank" rel="noopener noreferrer" href={href} {...buttonProps}>
                    {content}
                </Button>
            </li>
        );
    }
    return (
        <li aria-labelledby={id}>
            <Link href={href} passHref>
                <Button {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...buttonProps}>
                    {content}
                </Button>
            </Link>
        </li>
    );
}

interface SideNavigationMenuItemProps extends BaseProps {
    page?: Pages;
    childPage?: Pages;
    icons: {
        Normal: typeof Bandage;
        Notify: typeof Bandage;
    };
    notify: boolean;
}

export function SideNavigationMenuItem({
    children,
    href,
    className,
    external,
    page,
    childPage,
    notify,
    icons: { Normal, Notify },
}: SideNavigationMenuItemProps): JSX.Element {
    const id = cleanId(children);
    const activePage = useActivePage();

    const isThisPage = activePage === page;
    const isChildPage = activePage === childPage;
    let icon: 'normal' | 'notify' | 'back';
    if (isChildPage) {
        icon = 'back';
    } else if (isThisPage) {
        icon = 'normal';
    } else if (notify) {
        icon = 'notify';
    } else {
        icon = 'normal';
    }

    const content = (
        <>
            {icon === 'normal' && <Normal className={styles.icon} />}
            {icon === 'notify' && <Notify className={cn(styles.icon, styles.notifyingIcon)} />}
            {icon === 'back' && <Back className={styles.icon} />}
            {children}
            {!isThisPage && notify && <div className={styles.fakeBorderHack} />}
        </>
    );

    const buttonProps = {
        id,
        as: 'a' as const,
        variant: 'tertiary' as const,
        className: cn(styles.menuItem, className, {
            [styles.activeMenuItem]: isThisPage,
            [styles.notifyingMenuItem]: !isThisPage && notify,
        }),
    };

    if (external === 'relative') {
        return (
            <li aria-labelledby={id}>
                <Button target="_blank" rel="noopener noreferrer" href={href} {...buttonProps}>
                    {content}
                </Button>
            </li>
        );
    }

    return (
        <li aria-labelledby={id}>
            <Link href={href} passHref>
                <Button {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...buttonProps}>
                    {content}
                </Button>
            </Link>
        </li>
    );
}

export function ActiveSubItem({
    Icon,
    className,
    children,
}: {
    Icon: typeof Bandage;
    className?: string;
    children: string;
}): JSX.Element {
    const id = cleanId(children);
    return (
        <li aria-labelledby={id}>
            <div className={cn(styles.activeSubItem, className)}>
                <Icon />
                <BodyShort id={id} size="small">
                    {children}
                </BodyShort>
            </div>
        </li>
    );
}
