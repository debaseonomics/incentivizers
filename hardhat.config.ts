import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-typechain';

const config: HardhatUserConfig = {
	solidity: {
		version: '0.6.6',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},
	mocha: {
		timeout: 10000000
	},
	networks: {
		rinkeby: {
			url: 'https://rinkeby.infura.io/v3/a6b8621474904ca2a2f788c896e894be',
			accounts: [ '' ]
		}
	},
	etherscan: {
		apiKey: 'WSEBKEYQAFZ8AUGMFAKJR7GPCNYZ9Q3AIE'
	},
	typechain: {
		target: 'ethers-v5',
		outDir: './typechain'
	}
};

export default config;
