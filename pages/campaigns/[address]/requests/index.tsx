import type { NextPage } from 'next';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Table,
  Text,
} from 'zorotek-ui';
import { ContributeForm } from '../../../../components/Campaign/ContribuiteForm';
import Campaign from '../../../../utils/campaign';
import web3 from '../../../../utils/web3';
import NextLink from 'next/link';
interface Props {
  minimumContribution: string;
  balance: string;
  requestsCount: string;
  approversCount: string;
  manager: string;
  address: string;
}

const Requests: NextPage<Props> = ({
  minimumContribution,
  approversCount,
  balance,
  requestsCount,
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
        justifyContent="space-between"
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
          Requests
        </Text>
        <NextLink
          href={`/campaigns/${address}/requests/new`}
          passHref
        >
          <Button>Add Request</Button>
        </NextLink>
      </Flex>
      <Flex
        gap={15}
        flexWrap="wrap"
        css={{
          justifyContent: 'center',
          width: '100%',
          overflow: 'auto',
          '@sm': {
            justifyContent: 'flex-start',
          },
        }}
      >
        <ContributeForm address={address} />
      </Flex>
    </Box>
  );
};
Requests.getInitialProps = async (ctx) => {
  const { address } = ctx.query;

  const campaign = Campaign(address as string);
  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address: address as string,
  };
};
export default Requests;
