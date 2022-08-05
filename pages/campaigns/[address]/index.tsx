import type { NextPage } from 'next';
import { Box, Button, Card, Flex, Grid, Text } from 'zorotek-ui';
import { ContributeForm } from '../../../components/Campaign/ContribuiteForm';
import Campaign from '../../../utils/campaign';
import web3 from '../../../utils/web3';
import NextLink from 'next/link';
interface Props {
  minimumContribution: string;
  balance: string;
  requestsCount: string;
  approversCount: string;
  manager: string;
  address: string;
}

const Show: NextPage<Props> = ({
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
        flexDirection="column"
        alignContent={'start'}
        justifyContent="start"
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
          Campaign Details
        </Text>
        <Flex
          gap={15}
          flexWrap="wrap"
          css={{
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
            '@sm': {
              justifyContent: 'flex-start',
            },
          }}
        >
          <Grid
            cols={1}
            smCol={2}
            gap={25}
            css={{ width: 'fit-content' }}
          >
            <Grid.Item css={{ width: '20rem' }}>
              <Card
                css={{ height: '100%', gap: '$2', display: 'flex' }}
              >
                <Card.Header
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Text
                    display
                    size="xs"
                    weight={'semibold'}
                    css={{ overflowWrap: 'break-word' }}
                  >
                    {manager}
                  </Text>
                  <Text css={{ color: '$backgroundContent2' }}>
                    Manager
                  </Text>
                </Card.Header>
                <Card.Content>
                  <Text>
                    The manager created this campaign and can create
                    requests to widthdraw money.
                  </Text>
                </Card.Content>
              </Card>
            </Grid.Item>
            <Grid.Item css={{ width: '20rem' }}>
              <Card
                css={{ height: '100%', gap: '$2', display: 'flex' }}
              >
                <Card.Header
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Text display size="xs" weight={'semibold'}>
                    {web3.utils.fromWei(minimumContribution, 'ether')}
                  </Text>
                  <Text css={{ color: '$backgroundContent2' }}>
                    Minimun contribution(wei)
                  </Text>
                </Card.Header>
                <Card.Content>
                  <Text>
                    You must contribute at least this much wei to be
                    able to become an approver.
                  </Text>
                </Card.Content>
              </Card>
            </Grid.Item>

            <Grid.Item css={{ width: '20rem' }}>
              <Card
                css={{ height: '100%', gap: '$2', display: 'flex' }}
              >
                <Card.Header
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Text display size="xs" weight={'semibold'}>
                    {requestsCount}
                  </Text>
                  <Text css={{ color: '$backgroundContent2' }}>
                    Number of Requests
                  </Text>
                </Card.Header>
                <Card.Content>
                  <Text>
                    A request tries to withdraw money from the
                    contract. Requests must be approved by approvers.
                  </Text>
                </Card.Content>
              </Card>
            </Grid.Item>

            <Grid.Item css={{ width: '20rem' }}>
              <Card
                css={{ height: '100%', gap: '$2', display: 'flex' }}
              >
                <Card.Header
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Text display size="xs" weight={'semibold'}>
                    {approversCount}
                  </Text>
                  <Text css={{ color: '$backgroundContent2' }}>
                    Number of Approvers
                  </Text>
                </Card.Header>
                <Card.Content>
                  <Text>
                    Number of people who have already donated to this
                    campaign.
                  </Text>
                </Card.Content>
              </Card>
            </Grid.Item>

            <Grid.Item css={{ width: '20rem' }}>
              <Card
                css={{ height: '100%', gap: '$2', display: 'flex' }}
              >
                <Card.Header
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Text display size="xs" weight={'semibold'}>
                    {web3.utils.fromWei(balance, 'ether')}
                  </Text>
                  <Text css={{ color: '$backgroundContent2' }}>
                    Campaign Balance
                  </Text>
                </Card.Header>
                <Card.Content>
                  <Text>
                    The balance is how much money this campaign has
                    left to spend.
                  </Text>
                </Card.Content>
              </Card>
            </Grid.Item>
            <NextLink
              href={`/campaigns/${address}/requests`}
              passHref
            >
              <Button css={{ mt: '$2' }}>View Requests</Button>
            </NextLink>
          </Grid>
          <ContributeForm address={address} />
        </Flex>
      </Flex>
    </Box>
  );
};
Show.getInitialProps = async (ctx) => {
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
export default Show;
