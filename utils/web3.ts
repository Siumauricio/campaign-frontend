import Web3 from 'web3';
let web3: Web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
   web3 = new Web3(window.web3.currentProvider);
} else {
   const provider = new Web3.providers.HttpProvider(
      'https://goerli.infura.io/v3/cb9ac2e5eb8a41549ddcbb275ebc334f'
   );
   web3 = new Web3(provider);
}

export default web3;
