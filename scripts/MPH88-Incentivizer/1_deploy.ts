import { parseEther, parseUnits } from 'ethers/lib/utils';
import { run, ethers } from 'hardhat';

import DaiLpPoolArtifact from '../../artifacts/contracts/MPH88-Incentivizer/DaiLpPool.sol/DaiLpPool.json';
import { DaiLpPoolFactory } from '../../typechain/DaiLpPoolFactory';

async function main() {
	await run('typechain');
	const signer = await ethers.getSigners();

	try {
		const daiLpPoolFactory = (new ethers.ContractFactory(
			DaiLpPoolArtifact.abi,
			DaiLpPoolArtifact.bytecode,
			signer[0]
		) as any) as DaiLpPoolFactory;

		const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
		const debase = '0x9248c485b0B80f76DA451f167A8db30F33C70907';
		const debaseDaiPair = '0xE98f89a2B3AeCDBE2118202826478Eb02434459A';
		const mph = '0x8888801aF4d980682e47f1A9036e589479e835C5';
		const policy = '0x989Edd2e87B1706AB25b2E8d9D9480DE3Cc383eD';
		const daiFixedPool = '0x35966201A7724b952455B73A36C8846D8745218e';
		const mphStakingPool = '0x98df8D9E56b51e4Ea8AA9b57F8A5Df7A044234e1';
		const mphVesting = '0x8943eb8F104bCf826910e7d2f4D59edfe018e0e7';
		const lockPeriod = 2592000;
		const daiFee = 30;
		const mphFee = 30;
		const treasury = '';
		const debaseRewardPercentage = '500000000000000';
		const blockDuration = 23200;
		const uniFactory = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
		const uniRoute02 = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
		const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

		const daiLpPool = await daiLpPoolFactory.deploy(
			debaseDaiPair,
			dai,
			debase,
			mph,
			policy,
			daiFixedPool,
			mphStakingPool,
			mphVesting,
			lockPeriod,
			treasury,
			debaseRewardPercentage,
			blockDuration
		);

		console.log(daiLpPool.address);
	} catch (error) {}
}

main().then(() => process.exit(0)).catch((error) => {
	console.error(error);
	process.exit(1);
});
