// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers } from 'hardhat';
import { wait } from './utils';

async function main() {
  const admin = '0xecce08c2636820a81fc0c805dbdc7d846636bbc4';
  const delay = 86400 * 2; // 2 day delay

  // We get the contract to deploy
  console.log('deploying timelock');
  const Timelock = await ethers.getContractFactory('Timelock');
  const instance = await Timelock.deploy(admin, delay);
  await instance.deployed();
  await wait(15 * 1000);

  console.log('Timelock deployed to:', instance.address);

  await hre.run('verify:verify', {
    address: instance.address,
    constructorArguments: [admin, delay],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
