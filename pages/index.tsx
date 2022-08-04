import type { NextPage } from 'next';
import { Button } from 'zorotek-ui';
import { DarkModeButton } from '../components/DarkModeButton';

const Home: NextPage = () => {
  return (
    <div>
      <DarkModeButton />
      <Button>Hola Mundo</Button>
    </div>
  );
};

export default Home;
