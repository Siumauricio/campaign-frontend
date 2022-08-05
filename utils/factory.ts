import web3 from './web3';
import CampaignFactory from '../contractAbi/CampaignFactory.json';

const addressCampaignFactory =
  '0x2683CCe0E2b27864BC92A77A933BaA57E1954e1d';

const instance = new web3.eth.Contract(
  CampaignFactory.abi as any,
  addressCampaignFactory
);

export default instance;
