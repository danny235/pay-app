import React from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../components/Colors';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiBoldText,
} from '../../../components/styles/styledComponents';
import {ArrowDownIcon, EyeIcon, EyeLineIcon, WalletIcon} from '../../../components/SvgAssets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {BlurView} from '@react-native-community/blur';
import { updateShowAccountBalance } from '../../../features/user/userSlice';
import { addCommas } from '../../../utils';
type Props = {
  onBalanceClick?: ()=> void
}

function formatRealNumber(num: number): string {
  // Convert the number to a string
  const numString = num.toString();
  // Check if the number has a decimal point
  if (numString.includes('.')) {
    // Split the number into integer and fractional parts
    const [integerPart, fractionalPart] = numString.split('.');
    // Pad the fractional part with zeros if necessary
    const paddedFractionalPart = fractionalPart.padEnd(2, '0');
    // Combine the integer and padded fractional parts
    return `${integerPart}.${paddedFractionalPart}`;
  } else {
    // If the number doesn't have a decimal point, append '.00'
    return `${numString}.00`;
  }
}


export default function Balance({onBalanceClick}: Props ): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
 
  const {userApps, activeUserApp, userAppsError, userAppsLoading, token, showAccountBalance} =
    useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()

  return (
    <View
      style={{
        gap: 3,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRightColor: Colors.ash,
            paddingRight: 10,
            borderRightWidth: 1,
          }}>
          <WalletIcon />
        </View>
        <RegularText style={{fontSize: 15 / fontScale, color: Colors.grayText}}>
          Cash Balance
        </RegularText>
        <Pressable onPress={() => dispatch(updateShowAccountBalance())}>
          {showAccountBalance ? (
            <EyeLineIcon width={15} height={15} />
          ) : (
            <EyeIcon width={15} height={15} />
          )}
        </Pressable>
      </View>
      <View style={{gap: 3}}>
        <SemiBoldText
          style={{fontSize: 27 / fontScale, color: Colors.balanceBlack}}>
          {/* {accountBalanceType === 'naira' ? '₦ 60,000.00' : '100,000$PAY'} */}
          {userAppsLoading !== 'loading' &&
          userAppsLoading !== 'rejected' &&
          showAccountBalance && activeUserApp &&
          Object.keys(activeUserApp).length !== 0
            ? `${activeUserApp?.currency} ${addCommas(activeUserApp?.fiat_balance)}`
            : '******'}
          {userAppsLoading !== 'loading' &&
            userAppsLoading !== 'rejected' &&
            showAccountBalance &&
            activeUserApp?.fiat_balance === 0 &&
            '.00'}
        </SemiBoldText>
        <LightText style={{fontSize: 11 / fontScale, color: Colors.grayText}}>
          ≈ $PAY{' '}
          {userAppsLoading !== 'loading' &&
          userAppsLoading !== 'rejected' &&
          showAccountBalance
            ? addCommas(activeUserApp?.tokenBalance)
            : '*****'}
          {userAppsLoading !== 'loading' &&
          userAppsLoading !== 'rejected' &&
          showAccountBalance
            ? activeUserApp?.tokenBalance === 0 && '.00'
            : ''}
        </LightText>
      </View>
    </View>
  );
}
