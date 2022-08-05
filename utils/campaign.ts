import web3 from './web3';
import Campaign from '../contractAbi/Campaign.json';

const getContractCampaign = (addressCampaign: string) => {
  return new web3.eth.Contract(Campaign.abi as any, addressCampaign);
};

export default getContractCampaign;
