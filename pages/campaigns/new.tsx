import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Flex,
  Input,
  Link,
  Text,
  useToasts,
} from 'zorotek-ui';
import factory from '../../utils/factory';
import web3 from '../../utils/web3';
const New: NextPage = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorAmount, setErrorAmount] = useState('');
  const [errorTransaction, setErrorTransaction] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setErrorAmount('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount) {
      setErrorAmount('Please enter an amount');
      return;
    }
    setErrorTransaction('');
    setIsLoading(true);
    try {
      const account = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(amount)
        .send({ from: account[0] });
      router.push('/');
    } catch (error: any) {
      setErrorTransaction(error.message);
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Flex
        as="form"
        onSubmit={onSubmit}
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
        <Text weight={'semibold'} as="h2" display size="xs">
          Create Campaign
        </Text>
        <Input
          errorLabel={errorAmount}
          contentLeft={
            <Flex
              alignItems={'center'}
              css={{
                borderRight: '2px solid $backgroundContent3',
                userSelect: 'none',
                px: '$3',
              }}
            >
              Wei
            </Flex>
          }
          value={amount}
          onChange={onChange}
          label="Minimun Contribution"
          placeholder="Amount"
        />
        {errorTransaction && (
          <Alert color={'Danger'} css={{ maxWidth: '100%' }}>
            <Alert.Title>Oops!</Alert.Title>
            <Alert.Content>{errorTransaction}</Alert.Content>
          </Alert>
        )}

        <Button
          loading={isLoading}
          css={{
            minWidth: '100%',
          }}
        >
          Create Campaign
        </Button>
      </Flex>
    </Box>
  );
};

export default New;
