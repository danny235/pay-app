import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBackdrop} from '../../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {Colors} from '../../../../components/Colors';

type SwitchBusinessT = {
  navigation?: NavigationProp<RootStackParamList>;
  showSwitch: boolean;
  onClose: () => void;
};

export default function SwitchBusiness({
  navigation,
  showSwitch,
  onClose,
}: SwitchBusinessT) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['38%', '50%']);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onClose();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (showSwitch) {
      handlePresentModalPress();
    } else {
      handlePresentModalClose();
    }
  }, [showSwitch]);
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
        <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
            
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
