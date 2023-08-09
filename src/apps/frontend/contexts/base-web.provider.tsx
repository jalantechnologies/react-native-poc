import React, { PropsWithChildren } from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { styletron } from '../helper/styletron';

export default function BaseWebProvider(
  props: PropsWithChildren,
): React.ReactElement {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>{props.children}</BaseProvider>
    </StyletronProvider>
  );
}
