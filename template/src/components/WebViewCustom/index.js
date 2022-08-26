import AppText from 'components/AppText';
import Layout from 'components/Layout';
import LoadingBar from './components/LoadingBar';
import StyledTouchable from 'components/StyledTouchable';
import { CUSTOM_COLOR } from 'constants/colors';
import { FONT_SIZE } from 'constants/size';
import navigationServices from 'utils/navigationActions';
import { removeHttp } from 'utils/helpers';
import React from 'react';
import { Linking, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';
import { translate as trans } from 'src/i18n';
import { scale } from 'utils/responsive';
import styles from './styles';

let timer;
const WebViewCustom = (props) => {
  const { url, title, disappearDuration = 300 } = props.route.params;

  const [visible, setIsVisible] = React.useState(true);
  const [percent, setPercent] = React.useState(1);

  const _onLoadProgress = (syntheticEvent) => {
    setPercent(syntheticEvent.nativeEvent.progress);
  };

  const _onLoadStart = () => {
    setIsVisible(true);
  };

  const _onLoadEnd = () => {
    timer = setTimeout(() => {
      setIsVisible(false);
    }, disappearDuration);
  };

  const _onError = () => {
    setPercent(1);
  };

  React.useEffect(() => {
    clearTimeout(timer);
  }, []);

  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerWrapper}>
          {/* <StatusBar translucent={true} backgroundColor={'transparent'} /> */}
          <StyledTouchable onPress={() => navigationServices.goBack()}>
            <MaterialIcons
              name="keyboard-backspace"
              size={FONT_SIZE.big}
              color={CUSTOM_COLOR.Scorpion}
            />
          </StyledTouchable>
          <View style={styles.headerContent}>
            <AppText style={styles.headerTitle}>
              {title || trans('contactUs.aboutUsTakashimaya')}
            </AppText>
            <View style={styles.row}>
              <EntypoIcon name="lock" size={FONT_SIZE.small} color={CUSTOM_COLOR.Gray} />
              <AppText size="S" numberOfLines={1} style={styles.headerUrl}>
                {removeHttp(url) || ''}
              </AppText>
            </View>
          </View>
          <StyledTouchable onPress={() => Linking.openURL(url)}>
            <AppText bold style={styles.openInBrowser} color={CUSTOM_COLOR.RoyalBlue}>
              {trans('common.openInBrowser')}
            </AppText>
          </StyledTouchable>
        </View>
        {visible && (
          <LoadingBar height={scale(3)} color={CUSTOM_COLOR.RoyalBlue} percent={percent} />
        )}
      </>
    );
  };

  return (
    <Layout style={styles.container} type="view">
      {renderHeader()}
      <WebView
        source={{
          uri: url,
        }}
        onLoadProgress={_onLoadProgress}
        onLoadStart={_onLoadStart}
        onLoadEnd={_onLoadEnd}
        onError={_onError}
      />
    </Layout>
  );
};

export default React.memo(WebViewCustom);
