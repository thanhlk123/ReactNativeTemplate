import { empty } from 'assets/images';
import EmptyContent from 'components/EmptyContent';
import { CUSTOM_COLOR } from 'constants/colors';
import { SPACING } from 'constants/size';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import styles from './styles';

const PaginationList = forwardRef(
  (
    {
      style,
      contentContainerStyle,
      isFetching = false,
      dataPaging,
      onRefresh,
      onFetch,
      ListFooterComponent,
      heightItemSeparator = SPACING.XNormal,
      ListComponent,
      ListEmptyComponent,
      itemSeparatorComponent,
      ListEmptyTitle,
      emptyStyle,
      ...otherProps
    },
    ref
  ) => {
    const [state, setState] = useState({
      data: [],
      hasData: false,
      currentPage: 1,
    });
    const refAll = useRef({ page: 1 });

    useEffect(() => {
      const { data: newData = [], pagination = {} } = dataPaging || {};
      setState({
        data: newData,
        hasData: pagination.currentPage < pagination.totalPage,
        currentPage: pagination.currentPage,
      });
    }, [dataPaging]);

    useEffect(() => {
      if (state.currentPage === 1) {
        refAll.current.page = 1;
      }
    }, [state.currentPage]);

    const _ListEmptyComponent = useMemo(() => {
      if (isFetching) {
        return null;
      }
      if (ListEmptyComponent) {
        return ListEmptyComponent;
      }
      return (
        <EmptyContent
          img={empty}
          imageStyle={styles.imgEmpty}
          containerStyle={[styles.emptyContainer, emptyStyle]}
          titleStyle={styles.titleEmpty}
          title={ListEmptyTitle || 'common.noData'}
          color={CUSTOM_COLOR.Gray}
          translate
        />
      );
    }, [ListEmptyComponent, ListEmptyTitle, isFetching]);

    const ListFooter = () => {
      if (ListFooterComponent) {
        return ListFooterComponent(isFetching);
      }
      return null;
    };

    const ItemSeparatorComponent = useCallback(() => {
      if (typeof itemSeparatorComponent === 'function') {
        return itemSeparatorComponent();
      }
      return <View style={{ height: heightItemSeparator }} />;
    }, [heightItemSeparator, itemSeparatorComponent]);

    const keyExtractor = useCallback((item, index) => (item.id || index).toString(), []);

    const onEndReached = useCallback(() => {
      const { currentPage, hasData } = state;
      const { page } = refAll.current;
      if (hasData && !isFetching && page === currentPage) {
        refAll.current.page = page + 1;
        if (typeof onFetch === 'function') {
          onFetch(refAll.current.page);
        }
      }
    }, [onFetch, state, isFetching]);

    const onRefreshControl = useCallback(() => {
      if (typeof onRefresh === 'function') {
        refAll.current.page = 1;
        setState((prevState) => ({ ...prevState, currentPage: 1 }));
        onRefresh();
      }
    }, [onRefresh]);

    const refreshControl = useCallback(() => {
      return (
        <RefreshControl
          tintColor={CUSTOM_COLOR.Black}
          thumbTintColor={CUSTOM_COLOR.Black}
          refreshing={false}
          onRefresh={onRefreshControl}
        />
      );
    }, [onRefreshControl]);

    const styleContainer = useMemo(
      () => [{ paddingBottom: heightItemSeparator, flexGrow: 1 }, contentContainerStyle],
      [contentContainerStyle, heightItemSeparator]
    );

    const Container = useMemo(() => {
      return ListComponent ? ListComponent : FlatList;
    }, [ListComponent]);

    return (
      <Container
        ref={ref}
        refreshControl={refreshControl()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderSectionFooter={ItemSeparatorComponent}
        keyboardDismissMode="on-drag"
        onEndReachedThreshold={0.8}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        {...otherProps}
        ListEmptyComponent={_ListEmptyComponent}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooter}
        extraData={dataPaging?.data}
        data={dataPaging?.data}
        style={style}
        contentContainerStyle={styleContainer}
      />
    );
  }
);

export default React.memo(PaginationList);
