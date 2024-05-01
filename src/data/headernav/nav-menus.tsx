import { NavMenuItem } from "@/interFace/interFace";

const nav_menus_list:NavMenuItem[] = [
  {id:1,
    link: '/',
    title: 'Home',
    hasDropdown: true,
    megamenu: false,
    dropdownItems: [
      { link: '/', title: 'Home Style 01' },
      { link: '/home-two', title: 'Home Style 02' },
      { link: '/home-three', title: 'Home Style 03' },
    ]
  },
  {id:2,
    link: '/shop',
    title: 'Shop',
    hasDropdown: true,
    megamenu: false,
    dropdownItems: [
      { link: '/shop', title: 'Shop' },
      { link: '/wishlist', title: 'Wishlist' },
      { link: '/cart', title: 'Cart' },
      { link: '/checkout', title: 'Checkout' },
    ]
  },
  {
    id:3,
    link: '/shop',
    title: 'Pages',
    hasDropdown: true,
    megamenu: false,
    dropdownItems: [
      { link: '/about', title: 'About' },
      { link: '/team', title: 'Team' },
      { link: '/register', title: 'Register' },
      { link: '/login', title: 'Login' },
      { link: '/faq', title: 'FAQ' },
      { link: '/privacy-policy', title: 'Privacy Policy' },
      
    ]
  },
  {id:4,
    link: '/blog',
    title: 'Blog',
  },
  {id:5,
    link: '/contact',
    title: 'Contact',
  },
  {id:5,
    link: '/track-order',
    title: 'Track Order',
  },
]

export default nav_menus_list;