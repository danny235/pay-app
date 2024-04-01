import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {CustomBackdrop} from '../../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {Button} from '../../../../components/Button/Button';
import {Flashy} from 'iconsax-react-native';
import {
  LightText,
  MediumText,
  RegularText,
} from '../../../../components/styles/styledComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import Input from '../../../../components/Input';
import {useKeyboard} from '../../../../components/hooks/useKeyboard';
import * as yup from 'yup';
import CheckBox from 'react-native-check-box';
import {
  ArrowRightIcon,
  CursorDownIcon,
  CursorUpIcon,
} from '../../../../components/SvgAssets';
import {Colors} from '../../../../components/Colors';

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

type RecieveModalT = {
  navigation?: NavigationProp<RootStackParamList>;
  show: boolean;
};

const generateRequestLinkSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  amount: yup.string().required().label('Amount'),
  firstName: yup.string().label('First Name'),
  lastName: yup.string().label('Last Name'),
  email: yup.string().label('Email').email(),
  
});

export default function InstantRecieveModal({navigation, show}: RecieveModalT) {
  const {fontScale, height} = useWindowDimensions();
  const keyboardHeight = useKeyboard();
  const [checked, setChecked] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  let scrollRef = useRef<KeyboardAwareScrollView>(null);

  const scrollToInput = (reactNode: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToFocusedInput(reactNode);
    }
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['38%', '50%']);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    navigation?.goBack();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (show) {
      handlePresentModalPress();
    }
  }, [show]);
  return (
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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}>
          <Formik
            initialValues={{
              name: '',
              amount: '',
              firstName: '',
              lastName: '',
              email: '',
              thankYouPage: '',
              qrCodeId: '',
            }}
            onSubmit={async (values, actions) => {
              console.log(values.name, values.amount.replace(/,/g, ''));
            }}
            validationSchema={generateRequestLinkSchema}>
            {formikProps => (
              <View
                style={{paddingHorizontal: 20, paddingVertical: 20, gap: 10}}>
                <View style={{gap: 20, flexDirection: 'row'}}>
                  <Flashy color={Colors.primary} />
                  <MediumText
                    style={{
                      fontSize: 20 / fontScale,
                      borderLeftColor: Colors.ash,
                      borderLeftWidth: 1,
                      paddingLeft: 10,
                    }}>
                    Instant Recieve
                  </MediumText>
                </View>
                <LightText style={{fontSize: 15 / fontScale, width: '80%'}}>
                  Receive money from people instantly with this option.
                </LightText>
                <View>
                  <Input
                    formikProps={formikProps}
                    formikKey="amount"
                    placeholder="000.000"
                    value={formikProps.values.amount}
                    label="Amount"
                    placeholderTextColor={Colors?.ash}
                    keyboardType="decimal-pad"
                    onChangeText={(text: string) => {
                      // Remove commas and other non-numeric characters
                      const cleanedText = text.replace(/[^0-9.]/g, '');

                      // Format the number with commas
                      const formattedAmount = formatNumberWithCommas(
                        Number(cleanedText),
                      );

                      // Update the Formik field value
                      formikProps.setFieldValue('amount', formattedAmount);
                      formikProps.handleChange('amount');
                    }}
                  />

                  

                  {/* Show more details section */}
                  <View
                    style={{
                      borderTopColor: Colors.ash,
                      borderTopWidth: 1,
                      paddingVertical: 10,
                      marginVertical: 10,
                      width: '100%',
                    }}>
                    <Pressable
                      onPress={() => {
                        setShowAdditionalDetails(!showAdditionalDetails);
                        if (!showAdditionalDetails) {
                          setSnapTo(['70%', '90%']);
                        } else {
                          setSnapTo(['38%', '50%']);
                        }
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <RegularText style={{fontSize: 14 / fontScale}}>
                        Show Additional Details
                      </RegularText>
                      {showAdditionalDetails ? (
                        <CursorUpIcon />
                      ) : (
                        <CursorDownIcon />
                      )}
                    </Pressable>

                    {showAdditionalDetails && (
                      <View style={{width: '100%', marginTop: 20}}>
                        <View style={{flexDirection: 'row', gap: 10}}>
                          <View style={{width: '45%', flexGrow: 1}}>
                            <Input
                              placeholder="John"
                              formikProps={formikProps}
                              formikKey="firstName"
                              value={formikProps.values.firstName}
                              label="First Name"
                              placeholderTextColor={Colors?.ash}
                            />
                          </View>
                          <View style={{width: '45%', flexGrow: 1}}>
                            <Input
                              placeholder="Doe"
                              formikProps={formikProps}
                              formikKey="lastName"
                              value={formikProps.values.lastName}
                              label="Last Name"
                              placeholderTextColor={Colors?.ash}
                            />
                          </View>
                        </View>

                        <Input
                          placeholder="johndoe@gmail.com"
                          formikProps={formikProps}
                          formikKey="email"
                          value={formikProps.values.email}
                          label="Email"
                          keyboardType="email-address"
                          placeholderTextColor={Colors?.ash}
                        />

                        
                      </View>
                    )}
                  </View>
                </View>

                <Button
                  variant="primary"
                  isLarge={false}
                  isWide={true}
                  style={{
                    marginTop: 'auto',
                    marginBottom: Platform.OS === 'ios' ? keyboardHeight : 5,
                  }}
                  onPress={() => {
                    formikProps.values.amount.replace(/,/g, '');
                    formikProps.handleSubmit();
                    console.log(formikProps.values.amount.replace(/,/g, ''));
                  }}>
                  <MediumText
                    style={{color: Colors.white, fontSize: 15 / fontScale}}>
                    Continue
                  </MediumText>
                  <ArrowRightIcon />
                </Button>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
