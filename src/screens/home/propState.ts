import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParam } from "@src/navigations/AppNavigation";
import { APP_NAVIGATION } from "@src/navigations/routes";

export interface Props {
  navigation: StackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.HOME>;
}