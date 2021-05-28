import logo from './../assets/img/logo.png';
import kBase from './../assets/img/k-base.png';
import requests from './../assets/img/requests.png';
import staff from './../assets/img/staff.png';
import clients from './../assets/img/clients.png';
import assets from './../assets/img/assets.png';
import settings from './../assets/img/settings.png';

export const navLinks = [
  {
    id: 1,
    path: '/',
    thumbnail: {
      src: logo
    },
  },
  {
    id: 2,
    path: '/k-base',
    title: 'База знаний',
    thumbnail: {
      src: kBase,
      alt: 'Knowledge base',
    },
  },
  {
    id: 3,
    path: '/tasks',
    title: 'Заявки',
    thumbnail: {
      src: requests,
      alt: 'Tasks',
    },
  },
  {
    id: 4,
    path: '/staff',
    title: 'Сотрудники',
    thumbnail: {
      src: staff,
      alt: 'Staff',
    },
  },
  {
    id: 5,
    path: '/clients',
    title: 'Клиенты',
    thumbnail: {
      src: clients,
      alt: 'Clients',
    },
  },
  {
    id: 6,
    path: '/assets',
    title: 'Активы',
    thumbnail: {
      src: assets,
      alt: 'Assets',
    },
  },
  {
    id: 7,
    path: '/settings',
    title: 'Настройки',
    thumbnail: {
      src: settings,
      alt: 'Settings',
    },
  },
]