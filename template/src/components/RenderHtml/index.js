import { FONT_FAMILY } from 'constants/appFonts';
import { CUSTOM_COLOR } from 'constants/colors';
import { FONT_SIZE } from 'constants/size';
import React, { useCallback, useMemo } from 'react';
import { Linking, Text } from 'react-native';
import HTML, { TNodeChildrenRenderer } from 'react-native-render-html';

const regexInlineStyle = /style=(["'])(?:(?=(\\?))\2.)*?\1/g;

const NOT_USE_NUMBER_OF_LINE = 0;

const RenderHtml = ({
  content,
  source,
  width,
  widthImage = '',
  TextAlignJustify = true,
  style,
  numberOfLine = NOT_USE_NUMBER_OF_LINE,
}) => {
  const contentNoInlineStyle = useMemo(
    () => (content === null ? '' : (content + '').replace(regexInlineStyle, '')),
    [content]
  );
  const tagsStyles = useMemo(() => {
    return {
      ...tagStyle,
      img: widthImage
        ? {
            width: widthImage,
          }
        : {},
      p: TextAlignJustify
        ? {
            ...tagStyle.p,
            textAlign: 'justify',
            ...style?.p,
          }
        : {
            ...tagStyle.p,
            ...style?.p,
          },
      h1: TextAlignJustify
        ? {
            ...tagStyle.h1,
            textAlign: 'justify',
            ...style?.h1,
          }
        : {
            ...tagStyle.h1,
            ...style?.h1,
          },
      h2: TextAlignJustify
        ? {
            ...tagStyle.h2,
            textAlign: 'justify',
            ...style?.h2,
          }
        : {
            ...tagStyle.h2,
            ...style?.h2,
          },
      h3: TextAlignJustify
        ? {
            ...tagStyle.h3,
            textAlign: 'justify',
            ...style?.h3,
          }
        : {
            ...tagStyle.h3,
            ...style?.h3,
          },
      span: TextAlignJustify
        ? {
            ...tagStyle.span,
            textAlign: 'justify',
            ...style?.span,
          }
        : {
            ...tagStyle.span,
            ...style?.span,
          },
      u: TextAlignJustify
        ? {
            ...tagStyle.u,
            textAlign: 'justify',
            ...style?.u,
          }
        : {
            ...tagStyle.u,
            ...style?.u,
          },
      i: TextAlignJustify
        ? {
            ...tagStyle.i,
            textAlign: 'justify',
            ...style?.i,
          }
        : {
            ...tagStyle.i,
            ...style?.i,
          },
      b: TextAlignJustify
        ? {
            ...tagStyle.b,
            textAlign: 'justify',
            ...style?.b,
          }
        : {
            ...tagStyle.b,
            ...style?.b,
          },
    };
  }, [
    TextAlignJustify,
    style?.h1,
    style?.h2,
    style?.h3,
    style?.p,
    style?.span,
    style?.u,
    style?.i,
    style?.b,
    widthImage,
  ]);

  const htmlSource = useMemo(() => {
    return source
      ? { uri: source }
      : {
          html: `<p>${content === null ? '' : contentNoInlineStyle}</p>` || '<p></p>',
        };
  }, [content, contentNoInlineStyle, source]);

  const renderProps = useMemo(() => {
    return {
      a: {
        onPress: (evt, href) => {
          try {
            console.warn('openURL', href);
            Linking.openURL(href);
          } catch (error) {
            console.log(error);
          }
        },
      },
    };
  }, []);

  const PRenderer = useCallback(
    ({ TDefaultRenderer, textProps, ...props }) => {
      const tchildrenAreText = props.tnode.children.every(
        (t) => t.type === 'text' || t.type === 'phrasing'
      );
      const children = <TNodeChildrenRenderer tnode={props.tnode} />;
      return (
        <TDefaultRenderer {...props}>
          {tchildrenAreText ? <Text numberOfLines={numberOfLine}>{children}</Text> : children}
        </TDefaultRenderer>
      );
    },
    [numberOfLine]
  );

  const renderers = useMemo(
    () => ({
      p: PRenderer,
    }),
    [PRenderer]
  );
  return (
    <HTML
      source={htmlSource}
      contentWidth={width}
      renderersProps={renderProps}
      tagsStyles={tagsStyles}
      ignoredStyles={['width', 'height']}
      renderers={renderers}
    />
  );
};
const tagStyle = {
  p: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
  h1: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.big,
    color: CUSTOM_COLOR.Black,
  },
  h2: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.extraLarge,
    color: CUSTOM_COLOR.Black,
  },
  h3: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.large,
    color: CUSTOM_COLOR.Black,
  },
  img: {
    width: '100%',
  },
  em: {
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  a: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.RoyalBlue,
  },
  ul: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.regular,
    color: CUSTOM_COLOR.Black,
  },
  div: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
  i: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
  strong: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
  mark: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
  b: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
  small: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.small,
    color: CUSTOM_COLOR.Black,
  },
  span: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.default,
    color: CUSTOM_COLOR.Black,
  },
};

export default React.memo(RenderHtml);
