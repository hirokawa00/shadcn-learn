import { Bookmark, HomeIcon, type LucideIcon, Settings, SquarePen, Tag, Users } from 'lucide-react';

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
          active: pathname.includes('/dashboard'),
          icon: HomeIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Menu',
      menus: [
        {
          href: '',
          label: '販売管理',
          active: pathname.includes('/sales'),
          icon: SquarePen,
          submenus: [
            {
              href: '/sales/detail',
              label: '売上明細',
              active: pathname === '/sales/detail',
            },
            {
              href: '/sales/summary',
              label: '売上集計',
              active: pathname === '/sales/summary',
            },
          ],
        },
        {
          href: '/categories',
          label: 'Categories',
          active: pathname.includes('/categories'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: '/tags',
          label: 'Tags',
          active: pathname.includes('/tags'),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/settings/user',
          label: 'ユーザー管理',
          active: pathname.includes('/user'),
          icon: Users,
          submenus: [],
        },
        {
          href: '/settings/store',
          label: '店舗管理',
          active: pathname.includes('/store'),
          icon: Settings,
          submenus: [],
        },
        {
          href: '/settings/product',
          label: '商品管理',
          active: pathname.includes('/product'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
