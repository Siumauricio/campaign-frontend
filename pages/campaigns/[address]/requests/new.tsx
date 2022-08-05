import type { NextPage } from 'next';
import { Box, Flex, Text } from 'zorotek-ui';
import Campaign from '../../../../utils/campaign';
import { RequestForm } from '../../../../components/Campaign/RequestForm';
interface Props {
  minimumContribution: string;
  balance: string;
  NewCount: string;
  approversCount: string;
  manager: string;
  address: string;
}

const New: NextPage<Props> = ({
  minimumContribution,
  approversCount,
  balance,
  NewCount,
  manager,
  address,
}) => {
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

  const campaign = Campaign(address as string);
  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    NewCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address: address as string,
  };
};
export default New;
