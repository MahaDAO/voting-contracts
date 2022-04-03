import { ParamType } from 'ethers/lib/utils';

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function encodeParameters(
  ethers: any,
  types: Array<string | ParamType>,
  values: Array<any>,
) {
  const abi = new ethers.utils.AbiCoder();
  return abi.encode(types, values);
}
