// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';
import { encodeParameters } from '../utils';

async function main() {
  // change this to the data we want to create
  const target = '0xecce08c2636820a81fc0c805dbdc7d846636bbc4';
  const signature = 'transfer(address,uint256)';
  const data = encodeParameters(
    ethers,
    ['address', 'uint256'],
    ['0xecce08c2636820a81fc0c805dbdc7d846636bbc4', '123'],
  );
  const eta = Math.floor(Date.now() / 1000) + 2 * 86400 + 30;

  const calldata = [target, 0, signature, data, eta];

  const txHash = ethers.utils.keccak256(
    encodeParameters(ethers, ['address', 'uint256', 'string', 'bytes', 'uint256'], calldata),
  );

  console.log('target', target);
  console.log('signature', signature);
  console.log('data', data);
  console.log('eta', eta);

  console.log('txhash to send?', txHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
