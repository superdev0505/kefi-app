import {FontIcons} from '../../assets/icons';
import * as Screens from '../../screens/index';
import _ from 'lodash';

export const MainRoutes = [
  {
    id: 'LoginMenu',
    title: 'Auth',
    icon: FontIcons.login,
    screen: Screens.LoginMenu,
    children: [
      {
        id: 'Login2',
        title: 'Login V2',
        screen: Screens.LoginV2,
        children: []
      },
      {
        id: 'SignUp',
        title: 'Sign Up',
        screen: Screens.SignUp,
        children: []
      },
      {
        id: 'password',
        title: 'Password Recovery',
        screen: Screens.PasswordRecovery,
        children: []
      },
    ]
  },
  {
    id: 'ArticlesMenu',
    title: 'Articles',
    icon: FontIcons.article,
    screen: Screens.ArticleMenu,
    children: [
      {
          id: 'Articles1',
          title: 'Article List V1',
          screen: Screens.Articles1,
          children: []
      },
        {
            id: 'ArticlesTag',
            title: 'Article Tag List',
            screen: Screens.ArticlesTag,
            children: []
        },
      {
          id: 'Article',
          title: 'Article View',
          screen: Screens.Article,
          children: []
      }
    ]
  },
    {
        id: 'home1',
        title: 'Start',
        screen: Screens.Home1,
        children: []
    },
  {
    id: 'promo1',
    title: 'promo1',
    icon: FontIcons.mobile,
    screen: Screens.Promo1,
    children: []
  },
  {
      id: 'promo2',
      title: 'promo2',
      icon: FontIcons.mobile,
      screen: Screens.Promo2,
      children: []
  },

  {
      id: 'setReminderTime',
      title: 'setReminderTime',
      icon: FontIcons.mobile,
      screen: Screens.SetReminderTime,
      children: []
  },

  {
      id: 'walkthrough2',
      title: 'walkthrough2',
      icon: FontIcons.mobile,
      screen: Screens.Walkthrough2,
      children: []
  },

  {
      id: 'walkthrough1',
      title: 'walkthrough1',
      icon: FontIcons.mobile,
      screen: Screens.Walkthrough1,
      children: []
  },

  {
      id: 'WalkthroughMenu',
      title: 'Walkthroughs',
      icon: FontIcons.mobile,
      screen: Screens.WalkthroughMenu,
      children: [{
          id: 'Walkthrough',
          title: 'Walkthrough',
          screen: Screens.WalkthroughScreen,
          children: []
      }
      ]
  },
  {
    id: 'NavigationMenu',
    icon: FontIcons.navigation,
    title: 'Navigation',
    screen: Screens.NavigationMenu,
    children: [
      {
        id: 'List',
        title: 'List Menu',
        screen: Screens.ListMenu,
        children: []
      },
      {
        id: 'Side',
        title: 'Side Menu',
        action: 'DrawerOpen',
        screen: Screens.SideMenu,
        children: []
      }
    ]
  },
  {
    id: 'OtherMenu',
    title: 'Other',
    icon: FontIcons.other,
    screen: Screens.OtherMenu,
    children: [
        {
            id: 'Settings',
            title: 'Settings',
            screen: Screens.Settings,
            children: []
        },
        {
            id: 'legal',
            title: 'Legal',
            screen: Screens.Legal,
            children: []
        }
    ]
  },
  {
    id: 'Themes',
    title: 'Themes',
    icon: FontIcons.theme,
    screen: Screens.Themes,
    children: []
  },
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'homeAnimation',
    // id: 'Articles1',
  title: 'Start',
    // screen: Screens.Articles1,
  screen: Screens.HomeAnimation,
  children: []
},);

export const MenuRoutes = menuRoutes;

