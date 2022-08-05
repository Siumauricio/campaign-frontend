import {
  Alert,
  Button,
  Flex,
  Input,
  ArrowRight,
  Svg,
} from 'zorotek-ui';
import { useState } from 'react';
import web3 from '../../utils/web3';
import Campaign from '../../utils/campaign';
import { useRouter } from 'next/router';
interface RequestI {
  amount: string;
  description: string;
  recipient: string;
}

interface Props {
  address: string;
}
export const RequestForm: React.FunctionComponent<Props> = ({
  address,
}) => {
  const router = useRouter();
  const [request, setRequest] = useState<RequestI>({
    amount: '',
    description: '',
    recipient: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorAmount, setErrorAmount] = useState('');
  const [errorTransaction, setErrorTransaction] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
    setErrorAmount('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!request.amount) {
      setErrorAmount('Please enter an amount');
      return;
    }
    setErrorTransaction('');
    setIsLoading(true);
    try {
      const account = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods
        .createRequest(
          request.description,
          web3.utils.toWei(request.amount, 'ether'),
          request.recipient
        )
        .send({
          from: account[0],
        });
      setIsLoading(false);
      router.replace('/campaigns/' + address + '/requests');
    } catch (error: any) {
      setErrorTransaction(error.message);
      setIsLoading(false);
    }
  };

  const IconChevron = () => (
    <Svg
      css={{
        w: '15px ',
        h: '16px',
      }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Svg.Path
        css={{
          stroke: '$blueBase',
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      ></Svg.Path>
    </Svg>
  );

  return (
    <>
      <Button
        ghost
        css={{ minWidth: '4rem' }}
        onClick={() => router.back()}
      >
        <IconChevron />
        Back
      </Button>
      <Flex justifyContent={'center'}>
        <Flex flexDirection="column">
          <Flex
            gap={15}
            flexDirection="column"
            onSubmit={onSubmit}
            as="form"
            css={{ pt: '$3', width: 'fit-content' }}
          >
            <Input
              onChange={onChange}
              name="description"
              value={request.description}
              label="Description"
              placeholder="Buy cases..."
            />
            <Input
              onChange={onChange}
              value={request.amount}
              name="amount"
              label="Amount in Ether"
              placeholder="Amount"
              contentLeft={
                <Flex
                  alignItems={'center'}
                  css={{
                    borderRight: '2px solid $backgroundContent3',
                    userSelect: 'none',
                    px: '$3',
                  }}
                >
                  Ether
                </Flex>
              }
            />
            <Input
              onChange={onChange}
              value={request.recipient}
              name="recipient"
              label="Recipient"
              placeholder="0x2325423..."
            />
            {errorTransaction && (
              <Alert
                color={'Danger'}
                css={{ maxWidth: 'fit-content' }}
              >
                <Alert.Title>Oops!</Alert.Title>
                <Alert.Content>{errorTransaction}</Alert.Content>
              </Alert>
            )}

            <Button loading={isLoading}>Create Request!</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
