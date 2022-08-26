import AppText from 'components/AppText';
import StyledTouchable from 'components/StyledTouchable';
import { CUSTOM_COLOR } from 'constants/colors';
import React, { memo, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'utils/responsive';
import styles from './styles';

const Tabs = (props) => {
  const {
    data,
    tabActive = 0,
    titleStyle,
    containerStyle,
    tabsHeaderStyle,
    tabItemStyle,
    children,
  } = props;

  const [tabIndex, setTabIndex] = useState(tabActive);

  const handlePressTab = useCallback((index) => {
    setTabIndex(index);
  }, []);

  const tabs = data.map((tab, index) => {
    const isActive = tabIndex === index;
    const styleBorderBottom = {
      borderBottomWidth: scale(2),
      borderBottomColor: isActive ? CUSTOM_COLOR.FreeSpeechRed : CUSTOM_COLOR.White,
    };

    return (
      <StyledTouchable
        style={[styles.tabItem, styleBorderBottom, tabItemStyle]}
        onPress={() => handlePressTab(index)}
        key={`${tab.id || index}`}>
        <AppText
          semibold
          color={isActive ? CUSTOM_COLOR.FreeSpeechRed : CUSTOM_COLOR.SuvaGrey}
          style={[styles.tabItemTitle, titleStyle]}>
          {tab.title}
        </AppText>
      </StyledTouchable>
    );
  }, []);

  return (
    <View style={styles.tabsContent}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={[styles.tabs, containerStyle]}>
        <View style={[styles.tabsHeader, tabsHeaderStyle]}>{tabs}</View>
      </ScrollView>
      {children[tabIndex]}
    </View>
  );
};

export default memo(Tabs);
