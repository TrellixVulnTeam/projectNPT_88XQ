import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from 'app/components/HomePage/Header';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <Header />
      {/* <FirstPic /> */}
    </>
  );
}
