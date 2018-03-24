import Path from 'path-parser';
import { NavigationActions } from 'react-navigation';

const paths = [
  {
    routeName: 'YourScreenRoute',
    path: new Path('/base/path/:paramA/:paramB'),
  },
  {
    routeName: 'TasksScreen',
    path: new Path('/leap/list/:listId')
  }
];

const findPath = url => paths.find(path => path.path.test(url));

export default (url, store) => {
  const pathObject = findPath(url);

  console.tron.log(url);
  if (!pathObject) return;

  const navigateAction = NavigationActions.navigate({
    routeName: pathObject.routeName,
    params: { public: true, remote: true, ...pathObject.path.test(url) },
  });

  store.dispatch(navigateAction);
};
