import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'User',
    path: '/admin/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Create User',
    path: '/admin/create',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Notes',
    path: '/user/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Create Notes',
    path: '/user/notes',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
];