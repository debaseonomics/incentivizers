import { parseEther } from 'ethers/lib/utils';
import { run, ethers } from 'hardhat';

import IncentivizerArtifact from '../../artifacts/contracts/Degov-Eth-Incentivizer/Incentivizer.sol/Incentivizer.json';
import { IncentivizerFactory } from '../../typechain/IncentivizerFactory';

async function main() {
	await run('typechain');
	const signer = await ethers.getSigners();

	try {
		const incentivizerFactory = (new ethers.ContractFactory(
			IncentivizerArtifact.abi,
			IncentivizerArtifact.bytecode,
			signer[0]
		) as any) as IncentivizerFactory;

		const rewardToken = '';
		const pairToken = '';
		const policy = '';
		const rewardPercentage = 0;
		const blockDuration = 0;
		const enablePoolLpLimit = false;
		const enableUserLpLimit = false;
		const poolLpLimit = parseEther('30000');
		const userLpLimit = parseEther('1000');

		const incentivizer = await incentivizerFactory.deploy(
			rewardToken,
			pairToken,
			policy,
			rewardPercentage,
			blockDuration,
			enableUserLpLimit,
			userLpLimit,
			enablePoolLpLimit,
			poolLpLimit
		);

		console.log(incentivizer.address);
	} catch (error) {}
}

main().then(() => process.exit(0)).catch((error) => {
	console.error(error);
	process.exit(1);
});
