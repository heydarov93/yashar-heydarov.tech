export const homeMenus = {
  auth: [
    {
      name: 'Login',
      link: '/login',
    },
    {
      name: 'Register',
      link: '/register',
    },
    {
      name: 'Logout',
      link: '/logout',
    },
  ],
  navItems: [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About',
      link: '#aboutSection',
    },
    {
      name: 'Experience',
      link: '#experienceSection',
    },
    {
      name: 'Projects',
      link: '#portfolioSection',
    },
    {
      name: 'Tech Stack',
      link: '#techStackSection',
    },
    {
      name: 'My notes',
      link: '/blogs',
    },
    {
      name: 'Education',
      link: '#eduSection',
    },
    {
      name: 'Contact',
      link: '#contactSection',
    },
  ],
};

export const otherPageMenus = {
  auth: homeMenus.auth,
  navItems: homeMenus.navItems.map((item) => {
    if (item.name !== 'Home')
      return {
        name: item.name,
        link: `/${item.link}`,
      };

    return item;
  }), // copy the array
};
