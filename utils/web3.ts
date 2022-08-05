import Web3 from 'web3';
let web3: Web3;
if (typeof window !== undefined && typeof window.web3 !== undefined) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/7b06ac72b3384b139aea48bd100dc318'
  );
  web3 = new Web3(provider);
}

export default web3;
