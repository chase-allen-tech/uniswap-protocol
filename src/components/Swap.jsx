import React, { useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";
import { InfuraProvider } from "@ethersproject/providers";

import Factory from '../abi/factory.json';
import Router from '../abi/route2.json';
import Pair from '../abi/pair.json';

import Erc20 from '../abi/erc20.json';
import { useContract } from "../utils/useContract";

const C_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
const C_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const C_PAIR = '0x3139Ffc91B99aa94DA8A2dc13f1fC36F9BDc98eE';
const C_ERC20 = '0xa2327a938Febf5FEC13baCFb16Ae10EcBc4cbDCF';

const USDP = '0x8e870d67f660d95d5be530380d0ec0bd388289e1';
const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

// [0x8e870d67f660d95d5be530380d0ec0bd388289e1, 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48]

const Swap = () => {

  const factoryContract = useContract(C_FACTORY, Factory);
  const routerContract = useContract(C_ROUTER, Router);
  const pairContract = useContract(C_PAIR, Pair);
  const erc20 = useContract(C_ERC20, Erc20);

  console.log('[erc20]', erc20)

  const context = useWeb3Context();
  window.acc = factoryContract;
  const [balance, setBalance] = useState(null);
  const [sendAmount, setSendAmount] = useState(0);
  const [reserve, setReserve] = useState({ r0: null, r1: null });
  const [pairPrice, setPairPrice] = useState(0);

  useEffect(() => {
    if (pairContract) {
      pairContract.getReserves()
        .then(res => setReserve({ r0: res._reserve0, r1: res._reserve1 }))
        .catch(err => console.log('[pair err]', err));
    }
  }, [pairContract]);

  // useEffect(() => {
  //   console.log('[uni]', factoryContract);
  //   if (factoryContract) {
  //     factoryContract.getPair(USDT, MOCHI).then(res => console.log('[pair res]', res)).catch(err => console.log('[err]', err));
  //   }
  // }, [factoryContract]);

  useEffect(() => {
    if (context.active) {
      context.library.getBalance(context.account).then(balance => {
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(balanceInEth);
      }).catch(err => console.log('[balance erro]', err));
    }
  }, [context.active]);

  const onSwap = () => {
    const sen = `${sendAmount * Math.pow(10, 10)}00000000`;
    console.log('[sen]', sen);

    erc20.approve(C_ROUTER, sen).then(res1 => {
      console.log('[res 1]', res1);
      routerContract.swapExactTokensForTokens(sen, 0, [USDP, USDC], context.account, Math.round(new Date().getTime() / 1000 + 2000))
        .then(res => console.log('[swap res]', res))
        .catch(err => console.log('[err]', err));
    });
  };

  const onChange = e => {
    const val = e.target.value;
    setSendAmount(e.target.value);

    if (reserve.r0 && reserve.r1) {
      console.log('[reserve]', reserve);
      routerContract.getAmountOut(`${val * Math.pow(10, 10)}00000000`, reserve.r0, reserve.r1)
        .then(res => setPairPrice(parseInt(res._hex, 16)))
        .catch(err => console.log('[err]', err));
    }
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
            <div className="text-balance">Balance: {balance} ETH</div>
          </div>
          <hr className="m-0 color-line" />
          <div className="px-12x py-10x d-flex align-items-center">
            {/* <div className="size-32">IMG</div> */}
            <img src="/bnb.png" alt="" className="size-32" />
            <div className="ml-2 font-weight-bold text-token mr-3">USDP</div>
            <input value={sendAmount} onChange={onChange} type="text" className="input-field ml-auto" placeholder="Enter Amount" />
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
            <div className="ml-2 font-weight-bold text-token mr-3">USDC</div>
            <input value={pairPrice} readOnly type="text" className="input-field ml-auto" placeholder="Enter Amount" disabled />
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