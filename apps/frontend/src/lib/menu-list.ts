import { Grid2x2CheckIcon, HomeIcon, LogInIcon, type LucideIcon } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/',
          label: 'Home',
          active: pathname === '/',
          icon: HomeIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Example',
      menus: [
        {
          href: '',
          label: 'Data view',
          active: pathname.includes('/example'),
          icon: Grid2x2CheckIcon,
          submenus: [
            {
              href: '/example/simple-data-view',
              label: 'Simple data view',
              active: pathname.includes('/simple-data-view'),
            },
          ],
        },
        {
          href: '/signin',
          label: 'Signin',
          active: pathname.includes('/signin'),
          icon: LogInIcon,
          submenus: [],
        },
      ],
    },
  ];
}
