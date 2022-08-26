// import { FONT_FAMILY, FONT_SIZE } from 'constants/appFonts';
import { CUSTOM_COLOR } from 'constants/colors';
import { BOTTOM_TAB_HEIGHT } from 'constants/size';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'utils/responsive';

export const tabHeight = BOTTOM_TAB_HEIGHT;

const StaticTabBar = (props) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.container}>
      {state?.routes?.map((route, index) => {
        const { options } = descriptors[route.key];
        const icon = options.tabBarIcon;

        const key = options.key;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <React.Fragment key={key}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab]}
              activeOpacity={1}>
              <View style={[styles.rowContainer]}>{isFocused ? icon.active : icon.inactive}</View>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default React.memo(StaticTabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: tabHeight,
    marginBottom: scale(6),
  },
  activeIcon: {
    position: 'absolute',
    zIndex: -1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: scale(10),
  },
  leadBtn: {
    zIndex: 8,
    paddingBottom: scale(12),
    alignSelf: 'center',
    borderRadius: scale(30),
    backgroundColor: 'green',
    width: scale(60),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabTitle: {
    textAlign: 'center',
    // fontSize: FONT_SIZE.Small,
    color: CUSTOM_COLOR.Black,
    // fontFamily: FONT_FAMILY.BOLD,
  },
  ios: {
    height: BOTTOM_TAB_HEIGHT + scale(25),
  },
  android: {
    height: BOTTOM_TAB_HEIGHT + scale(25),
  },
  activeStyle: {
    backgroundColor: CUSTOM_COLOR.Fantasy,
    borderRadius: scale(6),
  },
  pl_6: {
    paddingLeft: scale(6),
  },
});
