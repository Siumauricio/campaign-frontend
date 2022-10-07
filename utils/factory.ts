import web3 from './web3';
import CampaignFactory from '../contractAbi/CampaignFactory.json';

const addressCampaignFactory = '0x52D89692Fc3D1E38586249ceCc9B8724D28bcEA8';

const instance = new web3.eth.Contract(
   CampaignFactory.abi as any,
   addressCampaignFactory
);

export default instance;
