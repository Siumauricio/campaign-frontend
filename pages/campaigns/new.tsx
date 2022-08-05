import type { NextPage } from 'next';
import { Box, Button, Flex, Link } from 'zorotek-ui';

interface Props {
  campaigns: Array<string>;
}

const Home: NextPage<Props> = ({ campaigns }) => {
  return <Box>Hola</Box>;
};

export default Home;
