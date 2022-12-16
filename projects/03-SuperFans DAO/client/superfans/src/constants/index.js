import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'DAOs',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'BUIDL',
    imgUrl: createCampaign,
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
