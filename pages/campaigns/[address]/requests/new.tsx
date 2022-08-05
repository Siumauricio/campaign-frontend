import type { NextPage } from 'next';
import { Box, Flex, Text } from 'zorotek-ui';
import { RequestForm } from '../../../../components/Campaign/RequestForm';
interface Props {
  address: string;
}

const New: NextPage<Props> = ({ address }) => {
  return (
    <Box>
      <Flex
        gap={15}
        css={{
          width: '100%',
          height: '100%',
          pt: '$3',
          '@md': {
            pt: '$6',
          },
        }}
        flexDirection="row"
        alignContent={'start'}
        justifyContent="center"
      >
        <Text
          weight={'semibold'}
          as="h2"
          display
          size="xs"
          css={{
            textAlign: 'center',
            '@sm': {
              textAlign: 'left',
            },
          }}
        >
          Create a Request
        </Text>
      </Flex>
      <RequestForm address={address} />
    </Box>
  );
};
New.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  return {
    address: address as string,
  };
};
export default New;
