import { createDAO, dashboard, payment, profile } from '../assets';

export const navlinks = [
  {
    name: 'DAOs',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'BUIDL',
    imgUrl: createDAO,
    link: '/create-dao',
  },
  {
    name: 'Promotions',
    imgUrl: payment,
    link: '/promotions',
  },
  // {
  //   name: 'Promote',
  //   imgUrl: payment,
  //   link: '/create-promotion',
  // },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
];
