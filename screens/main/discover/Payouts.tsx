import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Switch,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import CustomView from '../../../components/Views/CustomView';
import CustomHeader from '../../../components/headers/CustomHeaders';
import {
  Add,
  AddCircle,
  Edit,
  Flashy,
  Money4,
  More,
  Star,
  StarSlash,
} from 'iconsax-react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/AppStacks';
import {Colors} from '../../../components/Colors';
import {CircleIcon, StarIcon} from '../../../components/SvgAssets';
import {
  LightText,
  MediumText,
  SemiBoldText,
} from '../../../components/styles/styledComponents';
import AccessBankLogo from '../../../assets/images/accessBank.png';
import {Button} from '../../../components/Button/Button';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBackdrop} from '../../../components/ChooseAccountBalance/ChooseAccountBalance';

type PayoutsT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Payouts({navigation}: PayoutsT) {
  const {fontScale} = useWindowDimensions();
  const [instantPay, setInstantPay] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['38%', '50%']);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const toggleSwitch = () => setInstantPay(previousState => !previousState);

  const accounts = [
    {
      id: 1,
      logo: AccessBankLogo,
      bankName: 'Access Bank',
      accountName: 'Daniel Barima',
      accountNum: 1234455678,
      isFavorite: true,
    },
    {
      id: 2,
      logo: AccessBankLogo,
      bankName: 'Access Bank',
      accountName: 'Daniel Barima',
      accountNum: 1234455678,
      isFavorite: false,
    },
    {
      id: 3,
      logo: AccessBankLogo,
      bankName: 'Access Bank',
      accountName: 'Daniel Barima',
      accountNum: 1234455678,
      isFavorite: false,
    },
  ];
  return (
    <CustomView>
      <CustomHeader
        icon={<Money4 color={Colors.primary} size={24} />}
        text="Payouts"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search assets here"
          style={{
            fontFamily: 'SpaceGrotesk-SemiBold',
            color: Colors.black,
            width: '70%',
            fontSize: 15 / fontScale,
          }}
          placeholderTextColor={Colors.grayText}
        />
        <CircleIcon color={Colors.grayText} />
      </View>
      <ScrollView>
        <View style={styles.grayBg}>
          <View
            style={{
              borderBottomColor: Colors.ash,
              borderBottomWidth: 1,
              paddingBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Flashy color={Colors.primary} variant="TwoTone" size={24} />
            <MediumText
              style={{
                fontSize: 17 / fontScale,
                borderLeftColor: Colors.ash,
                borderLeftWidth: 1,
                paddingLeft: 10,
              }}>
              Instant Payouts
            </MediumText>
            <View style={{marginLeft: 'auto'}}>
              <Switch
                value={instantPay}
                onValueChange={toggleSwitch}
                trackColor={{true: Colors.primaryLight, false: Colors.ash}}
                thumbColor={Colors.white}
              />
            </View>
          </View>
          <LightText style={{fontSize: 15 / fontScale, color: Colors.grayText}}>
            Turn On/Off instant payout. instant payout moves money sent to you
            directly to your bank account, if this option is “off” the process
            can still be done manually
          </LightText>
        </View>

        <View style={{gap: 20}}>
          {accounts.map((account, i) => {
            return (
              <Pressable key={account.id} style={styles.acctContainer}>
                <View style={styles.acctDetContainer}>
                  <View style={styles.topAccDet}>
                    <Image
                      style={{width: 20, height: 20, borderRadius: 20}}
                      source={account.logo}
                    />
                    <LightText
                      style={{
                        fontSize: 15 / fontScale,
                        color: Colors.grayText,
                        borderLeftColor: Colors.ash,
                        borderLeftWidth: 1,
                        paddingLeft: 10,
                      }}>
                      {account.bankName}
                    </LightText>
                    {account.isFavorite && <StarIcon />}
                  </View>
                  <View style={styles.bottomAccDet}>
                    <MediumText
                      style={{
                        fontSize: 17 / fontScale,
                      }}>
                      {account.accountName}
                    </MediumText>
                    <LightText
                      style={{
                        fontSize: 17 / fontScale,
                        color: Colors.grayText,
                        borderLeftWidth: 1,
                        borderLeftColor: Colors.ash,
                        paddingLeft: 10,
                        borderStyle: 'solid',
                      }}>
                      {account.accountNum}
                    </LightText>
                  </View>
                </View>

                <Pressable onPress={handlePresentModalPress}>
                  <More color={Colors.ash} size={24} />
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <Button
        variant="primary"
        isLarge={false}
        isWide={true}
        style={{
          marginTop: 'auto',
          marginBottom: 30,
        }} onPress={()=>navigation.navigate("AddBank")}>
        <MediumText style={{color: Colors.white, fontSize: 15 / fontScale}}>
          Add Bank Account
        </MediumText>
        <AddCircle size={24} color={Colors.white} variant="TwoTone" />
      </Button>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            borderWidth: 3,
            borderColor: Colors.ash,
            width: '20%',
          }}
          backdropComponent={({animatedIndex, style}) => (
            <CustomBackdrop
              onPress={handlePresentModalClose}
              animatedIndex={animatedIndex}
              style={style}
            />
          )}
          animateOnMount={true}>
          <View style={{paddingHorizontal: 20, paddingVertical: 20, gap: 20}}>
            <SemiBoldText style={{fontSize: 17 / fontScale}}>
              More Actions
            </SemiBoldText>

            <Pressable onPress={handlePresentModalClose}  style={styles.moreActionsContainer}>
              <Star color={Colors.primary} size={24} />
              <MediumText style={{fontSize: 17 / fontScale}}>
                Make Defualt Payout Account
              </MediumText>
            </Pressable>
            <Pressable onPress={handlePresentModalClose} style={styles.moreActionsContainer}>
              <Edit color={Colors.primary} size={24} />
              <MediumText style={{fontSize: 17 / fontScale}}>
                Edit Bank Account Details
              </MediumText>
            </Pressable>
            <Pressable onPress={handlePresentModalClose} style={styles.moreActionsContainer}>
              <Edit color={Colors.primary} size={24} />
              <MediumText style={{fontSize: 17 / fontScale}}>
                Delete Bank Account
              </MediumText>
            </Pressable>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: Platform.OS === 'android' ? 2 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  grayBg: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 15,
  },
  acctContainer: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acctDetContainer: {
    gap: 10,
    flex: 1,
  },
  topAccDet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomAccDet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moreActionsContainer: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
