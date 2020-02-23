import BoardList from './../Views/Pages/Dashboard/PersonalBoards/BoardList';
import BoardWrapper from '../Views/Pages/Dashboard/ViewBoard/BoardWrapper/BoardWrapper';
import Calendar from './../Views/Pages/Dashboard/Calendar';
import ProfileInfo from './../Views/Pages/Dashboard/Profile/ProfileInfo';
import EditProfile from './../Views/Pages/Dashboard/Profile/EditProfile';

export const UserRoutes = [
  {
    path: '/',
    exact: true,
    component: BoardList
  },
  {
    path: '/board/:id',
    exact: true,
    component: BoardWrapper
  },
  {
    path: '/calendar',
    exact: true,
    component: Calendar
  },
  {
    path: '/profile',
    exact: true,
    component: ProfileInfo
  },
  {
    path: '/profile/edit',
    exact: true,
    component: EditProfile
  }
];
