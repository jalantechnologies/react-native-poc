import React, { PropsWithChildren } from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, createLightTheme } from 'baseui';
import { styletron } from '../helper/styletron';

import { primitives as PRIMITIVES, customOverrides as OVERRIDES } from '../theme';

const customLightTheme = createLightTheme(PRIMITIVES, OVERRIDES);

export default function BaseWebProvider(
  props: PropsWithChildren,
): React.ReactElement {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={customLightTheme}>{props.children}</BaseProvider>
    </StyletronProvider>
  );
}
