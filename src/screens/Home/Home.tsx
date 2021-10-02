import React from 'react';
import Application from '@components/Application/Application';

export type HomeProps = {};
export type HomeState = {};

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return <Application/>;
  }
}

export default Home;
