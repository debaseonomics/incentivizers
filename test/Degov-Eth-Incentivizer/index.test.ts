import { ethers } from 'hardhat';
import { ContractTransaction, Signer } from 'ethers';
import { expect } from 'chai';

import IncentivizerArtifact from '../../artifacts/contracts/Degov-Eth-Incentivizer/Incentivizer.sol/Incentivizer.json';
import DebaseArtifact from '../../artifacts/contracts/Degov-Eth-Incentivizer/Mock/Debase.sol/Debase.json';
import TokenArtifact from '../../artifacts/contracts/Degov-Eth-Incentivizer/Mock/Token.sol/Token.json';

import { IncentivizerFactory } from '../../typechain/IncentivizerFactory';
import { TokenFactory } from '../../typechain/TokenFactory';
import { DebaseFactory } from '../../typechain/DebaseFactory';

import { Token } from '../../typechain/Token';
import { Incentivizer } from '../../typechain/Incentivizer';
import { Debase } from '../../typechain/Debase';

import { parseEther, parseUnits } from 'ethers/lib/utils';

describe('Degov/Eth Incentivizer', function() {
	let accounts: Signer[];
	let incentivizerFactory: IncentivizerFactory;
	let tokenFactory: TokenFactory;
	let debaseFactory: DebaseFactory;

	before(async function() {
		accounts = await ethers.getSigners();

		incentivizerFactory = (new ethers.ContractFactory(
			IncentivizerArtifact.abi,
			IncentivizerArtifact.bytecode,
			accounts[0]
		) as any) as IncentivizerFactory;

		debaseFactory = (new ethers.ContractFactory(
			DebaseArtifact.abi,
			DebaseArtifact.bytecode,
			accounts[0]
		) as any) as DebaseFactory;

		tokenFactory = (new ethers.ContractFactory(
			TokenArtifact.abi,
			TokenArtifact.bytecode,
			accounts[0]
		) as any) as TokenFactory;
	});

	describe('Deploy and Initialize', function() {
		let incentivizer: Incentivizer;
		let degovLP: Token;
		let debase: Debase;
		let address: string;

		const duration = 4 * 24 * 60 * 60;
		const userLpLimit = parseEther('10');
		const userLpEnable = true;
		const poolLpLimit = parseEther('100');
		const poolLpEnable = true;
		const rewardPercentage = parseUnits('1', 17);

		before(async function() {
			address = await accounts[0].getAddress();

			debase = await debaseFactory.deploy();
			degovLP = await tokenFactory.deploy('DEGOVLP', 'DEGOVLP');

			incentivizer = await incentivizerFactory.deploy(
				debase.address,
				degovLP.address,
				address,
				rewardPercentage,
				duration,
				userLpEnable,
				userLpLimit,
				poolLpEnable,
				poolLpLimit
			);
		});

		describe('Initial settings', function() {
			it('Reward token should be debase', async function() {
				expect(await incentivizer.debase()).eq(debase.address);
			});
			it('Pair token should be degov lp', async function() {
				expect(await incentivizer.y()).eq(degovLP.address);
			});
			it('Policy should be policy contract', async function() {
				expect(await incentivizer.policy()).eq(address);
			});
			it('Duration should be correct', async function() {
				expect(await incentivizer.blockDuration()).eq(duration);
			});
			it('eward Percentage should be correct', async function() {
				expect(await incentivizer.rewardPercentage()).eq(rewardPercentage);
			});
			it('Pool should be  disabled', async function() {
				expect(await incentivizer.poolEnabled()).false;
			});
			it('User lp limit should be enabled', async function() {
				expect(await incentivizer.enableUserLpLimit()).eq(userLpEnable);
			});
			it('User lp limit should be correct', async function() {
				expect(await incentivizer.userLpLimit()).eq(userLpLimit);
			});
			it('Pool lp limit should be enabled', async function() {
				expect(await incentivizer.enablePoolLpLimit()).eq(poolLpEnable);
			});
			it('Pool lp limit should be correct', async function() {
				expect(await incentivizer.poolLpLimit()).eq(poolLpLimit);
			});
		});
	});
});
