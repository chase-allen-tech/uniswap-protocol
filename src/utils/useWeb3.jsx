// import {useWeb3React as useWeb3ReactCore} from '@web3-react/core';
import { useWeb3Context } from "web3-react";

export function useActiveWeb3React() {
  // const context = useWeb3ReactCore();
  const context = useWeb3Context();

  return context;
}