import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import MeasureMeHOC from './MeasureMeHOC';
import {getDashStyle, isStyleRow} from './util';

const Dash = props => {
  const isRow = isStyleRow(props.style);
  const length = isRow ? props.width : props.height;
  const n = Math.ceil(length / (props.dashGap + props.dashLength));
  const calculatedDashStyles = getDashStyle(props);
  let dash = [];
  for (let i = 0; i < n; i++) {
    dash.push(<View key={i} style={[calculatedDashStyles, props.dashStyle]} />);
  }
  return (
    <View
      onLayout={props.onLayout}
      style={[props.style, isRow ? styles.row : styles.column]}>
      {dash}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'},
});

Dash.propTypes = {
  style: ViewPropTypes.style,
  dashGap: PropTypes.number.isRequired,
  dashLength: PropTypes.number.isRequired,
  dashThickness: PropTypes.number.isRequired,
  dashColor: PropTypes.string,
  dashStyle: ViewPropTypes.style,
};

Dash.defaultProps = {
  dashGap: 2,
  dashLength: 4,
  dashThickness: 2,
  dashColor: 'black',
};

export default MeasureMeHOC(Dash);
