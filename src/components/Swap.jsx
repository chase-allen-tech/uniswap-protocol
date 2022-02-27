import React, { useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";
import { InfuraProvider } from "@ethersproject/providers";

// const provider = ethers.getDefaultProvider(process.env.REACT_APP_NETWORK)
// const provider = new InfuraProvider("rinkeby", {
//   projectId: process.env.REACT_APP_INFURA_ID,
//   projectSecret: process.env.REACT_APP_INFURA_SECRET
// });

const Swap = () => {

  const context = useWeb3Context();

  const [transactionHash, setTransactionHash] = useState(null);

  console.log('[transaction hash]', context.library.provider);

  // useEffect(() => {
  //   const provider = context.library.provider;
  //   if (context.active) {
  //     provider.getBalance(context.account).then(balance => {
  //       const balanceInEth = ethers.utils.formatEther(balance);
  //       console.log('[bla]', balanceInEth);
  //     }).catch(err => console.log('[balance erro]', err));
  //   }
  // }, [context.active]);

  const onSwap = () => {
    const signer = context.library.getSigner();

    signer.sendTransaction({
      to: ethers.constants.AddressZero,
      value: ethers.utils.bigNumberify("0")
    })
      .then(({ hash }) => {
        setTransactionHash(hash);
      });
  };

  return <>
    <div>
      <div className="px-4 py-4 bg-white rounded-20">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="title">Swap</h2>
          <div className="d-flex ml-auto">
            <button className="p-0 border-0 bg-transparent hover-op">
              <i className="material-icons color-icon">history</i>
            </button>
            <button className="p-0 border-0 bg-transparent hover-op" style={{ marginLeft: 18 }}>
              <i className="material-icons material-icons-outlined color-icon">settings</i>
            </button>
          </div>
        </div>

        <div className="bg-card rounded-12 mt-4">
          <div className="d-flex justify-content-between align-items-center px-12x py-10x">
            <div className="subtitle">From</div>
            <div className="text-balance">Balance: 136 BNB</div>
          </div>
          <hr className="m-0 color-line" />
          <div className="px-12x py-10x d-flex align-items-center">
            {/* <div className="size-32">IMG</div> */}
            <img src="/bnb.png" alt="" className="size-32" />
            <div className="ml-2 font-weight-bold text-token mr-3">BNB</div>
            <input type="text" className="input-field ml-auto" placeholder="Enter Amount" />
          </div>
        </div>

        <div className="d-flex w-100 justify-content-center my-3">
          <i className="material-icons">arrow_downward</i>
        </div>

        <div className="bg-card rounded-12 mt-4">
          <div className="d-flex justify-content-between align-items-center px-12x py-10x">
            <div className="subtitle">To</div>
          </div>
          <hr className="m-0 color-line" />
          <div className="px-12x py-10x d-flex align-items-center">
            {/* <div className="size-32">IMG</div> */}
            <img src="/mochi.png" alt="" className="size-32" />
            <div className="ml-2 font-weight-bold text-token mr-3">MOCHI</div>
            <input type="text" className="input-field ml-auto" placeholder="Enter Amount" disabled />
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <button onClick={onSwap} className="w-100 btn-connect border-0 text-white d-flex justify-content-center align-items-center hover-op">
            <div>
              <i className="material-icons text-white">swap_vert</i>
            </div>
            <div className="btn-text ml-2">Convert</div>
          </button>
        </div>

      </div>
    </div>
  </>;
};

export default Swap;