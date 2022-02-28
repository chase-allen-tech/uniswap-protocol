import {useMemo} from 'react';
import { getContract } from './contracts';
import {useActiveWeb3React} from './useWeb3';

export const useContract = (
  address,
  ABI,
  withSignerIfPossible = true,
) => {
  const {library, account} = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;

    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
};