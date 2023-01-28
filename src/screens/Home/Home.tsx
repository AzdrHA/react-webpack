import React, {FC} from 'react';
import Application from '@components/Application/Application';
import './home.scss';

export type HomeProps = {};

const Home : FC<HomeProps> = () => {
  return <Application/>;
};

export default Home;
