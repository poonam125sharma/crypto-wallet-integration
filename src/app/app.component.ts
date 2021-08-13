import { Component, OnInit } from '@angular/core';
import WalletLink from 'walletlink';
import Web3 from 'web3';
import WalletProvider from '@libertypie/wallet-provider/src/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appName = 'Wallet Integration App';
  // appLogoUrl = 'https://example.com/logo.png';
  appLogoUrl = 'assets/images/wallet.png';
  ethJsonRpcUrl = 'https://ropsten.infura.io/v3/952659217f3b4775880d1e2f3a07027b';
  chainId = 1;
  walletLink = null;
  ethereum = null;
  web3 = null;

  ngOnInit() {
    this.initWalletLink();
  }

  async initWalletLink() {
    const providers = {
      walletlink: {
        package: WalletLink,
        options: {
          app: {
            appName: this.appName,
            appLogoUrl: this.appLogoUrl,
            darkMode: false
          },
          network: {
            rpc: this.chainId,
            chainId: 1
          }
        }
      },
    };

    this.walletLink = new WalletLink({
      appName: this.appName,
      appLogoUrl: this.appLogoUrl,
      darkMode: false
    });
    this.ethereum = this.walletLink.makeWeb3Provider(this.ethJsonRpcUrl, this.chainId);
    this.web3 = new Web3(this.ethereum as any);
  }

  fun_Connect_Wallet() {
    this.ethereum.send('eth_requestAccounts').then((accounts: string[]) => {
      console.log(`User's address is ${accounts[0]}`);
    });
  }

  // async initWalletLink() {
  //   const providers = {
  //     // web3_wallets: {
  //     //      connect_text: 'Connect with Metamask or Brave'
  //     // },
  //     // binance_chain_wallet: {
  //     //     connect_text: 'Connect with Binance Chain Wallet'
  //     // },
  //     walletlink: {
  //       package: WalletLink, // walletLink imported Package
  //       options: {
  //         app: {
  //           appName: this.appName,
  //           appLogoUrl: this.appLogoUrl,
  //           darkMode: false
  //         },
  //         network: {
  //           rpc: this.chainId,
  //           // chainId: 0x2a // chainId 42
  //           chainId: 1
  //         }
  //       }
  //     },
  //   };

  //   const walletProvider = new WalletProvider({
  //     cacheProvider: true,
  //     providers,
  //     debug: true,
  //     showLoader: true
  //   });

  //   console.log({walletProvider});

  //   const connectStatus = await walletProvider.connect();

  //   console.log({connectStatus});

  //   if (connectStatus.isError()) {
  //     // some error info
  //     return;
  //   }

  //   // lets retrieve the connection info object
  //   // {provider, chainId, account}
  //   const resultInfo = connectStatus.getData();
  //   console.log({resultInfo});

  //   // const provider = resultInfo.provider;
  //   // const account = resultInfo.account;
  //   // const chainId = resultInfo.chainId;
  // }
}
