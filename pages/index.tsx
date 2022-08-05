import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Flex } from 'zorotek-ui';
import { CampaignList } from '../components/Campaign/CampaignList';
import factory from '../utils/factory';

interface Props {
  campaigns: Array<string>;
}

const Home: NextPage<Props> = ({ campaigns }) => {
  const router = useRouter();

  const handleCreateCampaign = () => {
    router.push('/campaigns/new');
  };
  return (
    <Box>
      <Flex
        columnGap={15}
        css={{
          width: '100%',
          height: '100%',
          pt: '$3',
          '@xs': {
            px: '$2',
          },
          '@md': {
            pt: '$6',
          },
        }}
        flexWrap="wrap-reverse"
        justifyContent="center"
      >
        <CampaignList campaigns={campaigns} />
        <Box>
          <Button
            onClick={handleCreateCampaign}
            css={{
              position: 'static',
              my: '$4',
              top: '$8',
              ml: '$0',
              '@sm': {
                position: 'relative',
                mb: '$0',
                ml: '26rem',
              },
              '@md': {
                ml: '0rem',
              },
            }}
          >
            Create Campaign
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
Home.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods
    .getDeployedCampaigns()
    .call();
  return { campaigns };
};

export default Home;
