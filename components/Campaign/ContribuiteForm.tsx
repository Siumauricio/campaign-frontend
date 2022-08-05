import { Alert, Button, Flex, Input } from 'zorotek-ui';
import { useState } from 'react';
import web3 from '../../utils/web3';
import Campaign from '../../utils/campaign';
import { useRouter } from 'next/router';

interface Props {
  address: string;
}

export const ContributeForm: React.FunctionComponent<Props> = ({
  address,
}) => {
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
      const campaign = Campaign(address);
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(amount, 'ether'),
        from: account[0],
      });
      setIsLoading(false);
      router.replace('/campaigns/' + address);
    } catch (error: any) {
      setErrorTransaction(error.message);
      setIsLoading(false);
    }
  };
  return (
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
            value={amount}
            label="Amount to contribute"
            placeholder="Amount"
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
          />
          {errorTransaction && (
            <Alert color={'Danger'} css={{ maxWidth: 'fit-content' }}>
              <Alert.Title>Oops!</Alert.Title>
              <Alert.Content>{errorTransaction}</Alert.Content>
            </Alert>
          )}

          <Button loading={isLoading}>Contribute!</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
