import { parseEther, parseUnits } from 'ethers/lib/utils';
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

		const rewardToken = '0x9248c485b0B80f76DA451f167A8db30F33C70907';
		const pairToken = '0xfc835d90ea6557b57b29361d95c4584d389e6ee8';
		const policy = '0x989Edd2e87B1706AB25b2E8d9D9480DE3Cc383eD';
		const rewardPercentage = parseUnits('55596419', 7);
		const blockDuration = 44800;
		const enablePoolLpLimit = true;
		const enableUserLpLimit = true;
		const poolLpLimit = parseEther('1000');
		const userLpLimit = parseEther('50');

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
