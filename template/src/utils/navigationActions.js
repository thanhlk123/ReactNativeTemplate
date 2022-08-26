import {
  StackActions,
  NavigationActions,
  CommonActions,
} from '@react-navigation/native';

class NavigationServices {
  setNavigator = _navigator => {
    this.navigation = _navigator;
  };

  navigate = (routeName, params, action) => {
    const navigateAction = CommonActions.navigate({
      name: routeName,
      params,
      action,
    });

    if (this.navigation) {
      this.navigation.dispatch(navigateAction);
    }
  };

  goBack = () => {
    const navigateAction = CommonActions.goBack();
    if (this.navigation) {
      this.navigation.dispatch(navigateAction);
    }
  };

  push = (routeName, params) => {
    console.log('push', this.navigation);
    if (this.navigation) {
      const pushAction = StackActions.push(routeName, params);
      this.navigation.dispatch(pushAction);
    }
  };

  replace = (routeName, params) => {
    const replaceAction = StackActions.replace(routeName, params);
    if (this.navigation) {
      this.navigation.dispatch(replaceAction);
    }
  };

  pop = params => {
    if (this.navigation) {
      const popAction = StackActions.pop(params);
      this.navigation.dispatch(popAction);
    }
  };

  resetTo = params => {
    if (this.navigation) {
      const resetAction = CommonActions.reset({
        index: 1,
        actions: [NavigationActions.navigate(params)],
      });
      this.navigation.dispatch(resetAction);
    }
  };

  resetActionTo = screen => {
    console.log('???2', this.navigation);

    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: screen}],
    });
    this.navigation.dispatch(resetAction);
  };

  toggleDrawer = params => {
    if (this.navigation) {
      this.navigation.toggleDrawer(params);
      // this.navigation.dispatch(pushAction);
    }
  };
}

const navigationServices = new NavigationServices();
export default navigationServices;
