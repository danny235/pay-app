import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddBankScreen,
  AssetScreen,
  ConvertAssetScreen,
  DiscoverScreen,
  EditProfileScreen,
  GenerateRequestLinkScreen,
  GeneratedCodeScreen,
  GeneratedLinkScreen,
  HomeScreen,
  NotificationScreen,
  OnboardingScreen,
  PaymentCompleteScreen,
  PayoutScreen,
  RecieveModalScreen,
  RootAuth,
  ScanScreen,
  SettingsScreen,
  SignIn,
  SingleCoinViewScreen,
  TransactionDetailScreen,
  TransactionPinScreen,
  TransactionsScreen,
} from '../screens';
import CreateAccount from '../screens/authentication/CreateAccount';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import NewPassword from '../screens/authentication/NewPassword';
import PhoneNumber from '../screens/authentication/PhoneNumber';
import SecureCode from '../screens/authentication/SecureCode';
import SetPassword from '../screens/authentication/SetPassword';
import ConfirmPayment from '../screens/main/home/PayFlow/ConfirmPayment';
import PayHome from '../screens/main/home/PayFlow/Pay';
import SendPayment from '../screens/main/home/PayFlow/SendPayment';
import MainTabs from './MainTabs';

export type RootStackParamList = {
  Home: undefined;
  Pay: undefined;
  Scan: undefined;
  SendPayment: undefined;
  ConfirmPayment: undefined;
  TransactionPin: undefined;
  PaymentComplete: undefined;
  GenerateLink: undefined;
  Notification: undefined;
  Recieve: undefined;
  GeneratedLink: undefined;
  GeneratedCode: undefined;
  Assets: undefined;
  EditProfile: undefined;
  SingleCoin: undefined;
  ConvertAsset: undefined;
  Transactions: undefined;
  TransactionDetail: undefined;
  Payouts: undefined;
  AddBank: undefined;
  ConnectQr: undefined;

  // Define other screens and their parameters here
};

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const DiscoverStack = createNativeStackNavigator();
const AssetStack = createNativeStackNavigator();

export function HomeStackScreen(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}>
      <HomeStack.Screen name="Dashboard" component={HomeScreen} />
      <HomeStack.Screen name="Pay" component={PayHome} />
      <HomeStack.Screen name="Scan" component={ScanScreen} />
      <HomeStack.Screen name="SendPayment" component={SendPayment} />
      <HomeStack.Screen name="ConfirmPayment" component={ConfirmPayment} />
      <HomeStack.Screen
        name="TransactionPin"
        component={TransactionPinScreen}
      />
      <HomeStack.Screen
        name="PaymentComplete"
        component={PaymentCompleteScreen}
      />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="GeneratedLink" component={GeneratedLinkScreen} />
      <HomeStack.Screen name="GeneratedCode" component={GeneratedCodeScreen} />

      <HomeStack.Screen
        options={{
          presentation: 'transparentModal',
          animation: 'fade_from_bottom',
        }}
        name="Recieve"
        component={RecieveModalScreen}
      />
      {/* Assets */}
      <HomeStack.Screen name="Assets" component={AssetScreen} />
      {/* Discover */}
      <HomeStack.Screen name="DiscoverS" component={DiscoverScreen} />
      <HomeStack.Screen
        name="GenerateLink"
        component={GenerateRequestLinkScreen}
      />
      <HomeStack.Screen name='Transactions' component={TransactionsScreen} />
      <HomeStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    </HomeStack.Navigator>
  );
}

export function DiscoverStackScreen(): React.JSX.Element {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <DiscoverStack.Screen name="DiscoverS" component={DiscoverScreen} />
      <DiscoverStack.Screen
        name="GenerateLink"
        component={GenerateRequestLinkScreen}
      />
      <DiscoverStack.Screen name='Payouts' component={PayoutScreen} />
      <DiscoverStack.Screen name="AddBank" component={AddBankScreen} />
    </DiscoverStack.Navigator>
  );
}

export function SettingsStackScreen(): React.JSX.Element {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="Setting" component={SettingsScreen} />
      <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
      <SettingsStack.Screen
        name="Transactions"
        component={TransactionsScreen}
      />
      <SettingsStack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </SettingsStack.Navigator>
  );
}

export function AssetStackScreen(): React.JSX.Element {
  return (
    <AssetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AssetStack.Screen name="Assets" component={AssetScreen} />
      <AssetStack.Screen name="SingleCoin" component={SingleCoinViewScreen} />
      <AssetStack.Screen name="ConvertAsset" component={ConvertAssetScreen} />
    </AssetStack.Navigator>
  );
}

export default function NavigationContent(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen
          name="MainTabs"
          options={{headerShown: false}}
          component={MainTabs}
        />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="RootAuth" component={RootAuth} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SecureCode" component={SecureCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
