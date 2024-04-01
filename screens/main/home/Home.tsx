import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleProp,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../../../components/Colors';
import {BoldText, LightText} from '../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../routes/AppStacks';
import Action from './Action';
import Balance from './Balance';
import TransactionItem from './TransactionItem';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import {TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import ChooseAccountBalance from '../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {useToast} from '../../../components/CustomToast/ToastContext';
import {
  ArrowFrontIcon,
  CopyIcon,
  NotifictionIcon,
  ScanIcon,
} from '../../../components/SvgAssets';
import CustomView from '../../../components/Views/CustomView';
import Memojis from './Memojis';

interface CustomBackdropProps {
  animatedIndex: SharedValue<number>;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CustomBackdrop: React.FC<CustomBackdropProps> = ({
  animatedIndex,
  style,
  onPress,
}) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity style={style} onPress={onPress} />
    </Animated.View>
  );
};

const trx = [
  {
    id: 1,
    title: 'From: Oscar',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'successful',
  },
  {
    id: 2,
    title: 'Paid: Market Square',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'successful',
  },
  {
    id: 3,
    title: 'From: Brainy',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'successful',
  },
  {
    id: 4,
    title: 'Paid: Amazon',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'failed',
  },
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

export default function Home({navigation}: HomeProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  const [showSwitchBalanceModal, setShowSwithBalanceModal] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [showRecieveModal, setShowRecieveModal] = useState(false);
  const {showToast} = useToast();
  
  const copyToClipboard = () => {
    Clipboard.setString('234gh6');
    showToast('Copied successfully');
  };

  const handleShowModal = () => {
    setShowSwithBalanceModal(true);
  };

  return (
    <CustomView>
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 10, paddingVertical: 20}}>
            <Image
              style={{borderRadius: 40, height: 40, width: 40}}
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1703617663829-ac7430988118?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
              }}
            />
            <View>
              <BoldText
                style={{fontSize: 16 / fontScale, color: Colors.balanceBlack}}>
                Hello, Daniel 👋
              </BoldText>
              <Pressable
                onPress={copyToClipboard}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <LightText
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 12 / fontScale,
                    color: Colors.grayText,
                  }}>
                  ID: 234gh6
                </LightText>
                <CopyIcon />
              </Pressable>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 20}}>
            <Pressable onPress={() => navigation.navigate('Scan')}>
              <ScanIcon />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Notification')}>
              <NotifictionIcon />
            </Pressable>
          </View>
        </View>
        <View style={{gap: 24}}>
          <Balance />

          <Action
            onPayPress={() => navigation.navigate('Pay' as never)}
            onRecievePress={() => navigation.navigate('Recieve')}
          />
        </View>
        <Memojis onPress={()=> navigation.navigate("SendPayment")} />
        <View
          style={{
            backgroundColor: Colors.memojiBackground,
            padding: 16,
            borderRadius: 12,
          }}>
          <FlatList
            data={trx}
            style={{flexGrow: 1}}
            contentContainerStyle={{flex: 1, gap: 20, paddingVertical: 4}}
            ListHeaderComponent={() => (
              <Pressable
                onPress={()=>navigation.navigate("Transactions")}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderLeftColor: Colors.primary,
                    borderLeftWidth: 5,
                    borderRadius: 20,
                    height: 16,
                  }}
                />
                <BoldText
                  style={{
                    fontSize: 17 / fontScale,
                    color: Colors.balanceBlack,
                  }}>
                  History
                </BoldText>
                <ArrowFrontIcon />
              </Pressable>
            )}
            renderItem={({item}) => <TransactionItem onPress={()=>navigation.navigate("TransactionDetail")} item={item} />}
          />
        </View>
      </ScrollView>

      {/* Send naira modal */}

      {showSwitchBalanceModal && (
        <ChooseAccountBalance onHide={() => setShowSwithBalanceModal(false)} />
      )}
    </CustomView>
  );
}
