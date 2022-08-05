import { Box, Flex, Link, Text } from 'zorotek-ui';
import { DarkModeButton } from '../components/DarkModeButton';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Box css={{ pb: '$20' }}>
      <Flex
        justifyContent={'center'}
        css={{
          pt: '$1',
          '@sm': {
            pt: '$10',
          },
        }}
      >
        <Box
          as="nav"
          css={{
            borderBottom: '1px solid $border',
            py: '$2',
            px: '$5',
            width: '100%',
            maxWidth: '50rem',
          }}
        >
          <Flex justifyContent={'space-between'} flexWrap="wrap">
            <Flex>
              <Text display size="xs" weight={'bold'}>
                <Link href="/">CrowdCoin</Link>
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={20}>
              <Text>
                <Link href="/">Campaigns</Link>
              </Text>
              <DarkModeButton />
            </Flex>
          </Flex>
        </Box>
      </Flex>

      {children}
    </Box>
  );
};

export default Layout;
