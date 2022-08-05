import type { NextPage } from 'next';
import { Box, Button, Flex, Status, Table, Text } from 'zorotek-ui';
import web3 from '../../../../utils/web3';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Campaign from '../../../../utils/campaign';
import { useRouter } from 'next/router';

interface RequestI {
  description: string;
  value: string;
  recipient: string;
  complete: boolean;
  approvalCount: string;
}

interface RequestMap extends Omit<RequestI, 'complete'> {
  id: number;
}

interface Props {
  address: string;
  requests: RequestI[];
  approversCount: string;
}

const Requests: NextPage<Props> = ({
  address,
  requests,
  approversCount,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [requestArray, setRequest] = useState<
    RequestMap[] | RequestI[]
  >([...requests]);

  useEffect(() => {
    const result: RequestMap[] = requests.map((request, index) => {
      return {
        ...request,
        id: index + 1,
        approvalCount: `${request.approvalCount} / ${approversCount}`,
        // complete: request.complete ? 'Yes' : 'No',
        value: web3.utils.fromWei(request.value, 'ether'),
      };
    });
    setRequest(result);
  }, [approversCount, requests]);

  const renderApprove = (value: any, rowData: any, index: any) => {
    const approve = async () => {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      try {
        await campaign.methods
          .approveRequest(index)
          .send({ from: accounts[0] });
        setLoading(false);
        router.replace('/campaigns/' + address + '/requests');
      } catch (error) {
        setLoading(false);
      }
    };
    return (
      <>
        {!rowData.complete ? (
          <Button
            noBoxShadow
            color="green"
            css={{
              minWidth: '7rem',
            }}
            loading={loading}
            onClick={approve}
          >
            Approve
          </Button>
        ) : (
          <Status color={'green'}>Completed</Status>
        )}
      </>
    );
  };
  const renderFinalize = (value: any, rowData: any, index: any) => {
    const finalize = async () => {
      setLoading(true);
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      try {
        await campaign.methods.finalizeRequest(index).send({
          from: accounts[0],
        });
        setLoading(false);
        router.replace('/campaigns/' + address + '/requests');
      } catch (error) {
        setLoading(false);
      }
    };

    return (
      <>
        {!rowData.complete ? (
          <Button
            noBoxShadow
            color="sky"
            css={{
              backgroundColor: loading ? 'transparent' : '$skyBorder',
              color: 'white',
              minWidth: '7rem',
            }}
            onClick={finalize}
            loading={loading}
          >
            Finalize
          </Button>
        ) : (
          <Status color={'green'}>Completed</Status>
        )}
      </>
    );
  };

  return (
    <Box>
      <Flex
        gap={15}
        css={{
          width: '100%',
          height: '100%',
          pt: '$3',
          '@sm': {
            pt: '$6',
            justifyContent: 'space-between',
          },
          justifyContent: 'center',
        }}
        flexDirection="row"
        alignContent={'start'}
        justifyContent="space-between"
        flexWrap="wrap-reverse"
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
          <Button
            css={{
              minWidth: '100%',
              '@sm': {
                minWidth: '12rem',
              },
            }}
          >
            Add Request
          </Button>
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
        <Table data={requestArray as RequestMap[]} css={{ pt: '$5' }}>
          <Table.Column prop="id" label="ID" />
          <Table.Column prop="description" label="Description" />
          <Table.Column prop="value" label="Amount" />
          <Table.Column prop="recipient" label="Recipient" />
          <Table.Column prop="approvalCount" label="Approval Count" />
          <Table.Column
            prop="Approve"
            label="Approve"
            render={renderApprove}
          />
          <Table.Column
            prop="Finalize"
            label="Finalize"
            render={renderFinalize}
          />
        </Table>
        <Text>Found {requestArray.length} requests.</Text>
      </Flex>
    </Box>
  );
};
Requests.getInitialProps = async (ctx) => {
  const { address } = ctx.query;

  const campaign = Campaign(address as string);
  const requestCount = await campaign.methods
    .getRequestCount()
    .call();

  const approversCount = await campaign.methods
    .approversCount()
    .call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill(null)
      .map((_, i) => {
        return campaign.methods.requests(i).call();
      })
  );

  return {
    approversCount: approversCount,
    requests: requests as RequestI[],
    address: address as string,
  };
};
export default Requests;
