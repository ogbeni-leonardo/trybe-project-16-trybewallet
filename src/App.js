import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import * as Themes from './themes';
import GlobalStyles from './global.styles';
import Routes from './routes';

function App(props) {
  const { theme } = props;
  return (
    <Switch>
      <ThemeProvider theme={ Themes[theme] }>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </Switch>
  );
}

App.propTypes = {
  theme: string.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.user.theme,
});

export default connect(mapStateToProps)(App);
