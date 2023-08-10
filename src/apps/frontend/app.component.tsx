import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// import { Header, Footer } from './components';
import { DepsProvider } from './contexts';
import { About, Login, NotFound, PhoneLogin } from './pages';
import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';
import BaseWebProvider from './contexts/base-web.provider';
import OtpVerification from './pages/login/otp.page';

export default function App(): React.ReactElement {
  useEffect(() => {
    if (window.Config.inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <DepsProvider
      deps={{
        accessService: new AccessService(),
      }}
    >
      <Router>
        <BaseWebProvider>
          {/* <Header /> */}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<PhoneLogin />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <Footer /> */}
        </BaseWebProvider>
      </Router>
    </DepsProvider>
  );
}
