import React from "react";

import { useWeb3Context } from "web3-react";

const METAMASK = "MetaMask";

const WalletConnect = () => {

  const context = useWeb3Context();

  const { active, connectorName, account, networkId } = context;

  console.log('[context]', context);

  // if (context.active && context.connectorName === "WalletConnect") {
  //   if (!context.account) {
  //     WalletConnectQRCodeModal.open(
  //       context.connector.walletConnector.uri,
  //       () => {}
  //     );
  //   } else {
  //     try {
  //       WalletConnectQRCodeModal.close();
  //     } catch {}
  //   }
  // }


  const onClick = () => {
    if(active) {
      context.unsetConnector();
    } else {
      context.setConnector(METAMASK);
    }
  };

  const getShortAddress = (address) => {
    if(address && address.length >= 10) {
      return `${address.slice(0, 6)}...${address.slice(-5)}`
    }
    return ''
  }

  return <>
    <div>
      <div className="bg-white p-connecter">
        <div className="">
          <button
            onClick={onClick}
            className="btn-connecter border-0 text-wallet"
          >
            {
              active ? "DISCONNECT WALLET" : "CONNECT WALLET"
            }
          </button>
        </div>
        <div className="btn-connecter d-flex align-items-center p-metamask" style={{ marginTop: 12 }}>
          <img src="/metamask.png" className="size-36" alt="" />
          <div className="ml-3 text-address ml-auto mr-2">{getShortAddress(account)}</div>

          <button className="p-0 border-0 bg-transparent d-flex justify-content-center align-items-center ml-auto">
            <i className="material-icons">expand_more</i>
          </button>
        </div>
      </div>
    </div>
  </>;
};

export default WalletConnect;