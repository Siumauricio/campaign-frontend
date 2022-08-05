import web3 from './web3';
import CampaignFactory from '../contractAbi/CampaignFactory.json';

const addressCampaignFactory =
  '0xe27865Ce455a0A53407b093361D6B84dfd01c26A';

const instance = new web3.eth.Contract(
  CampaignFactory.abi as any,
  addressCampaignFactory
);

export default instance;
