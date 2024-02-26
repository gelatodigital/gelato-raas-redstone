import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { BigNumber, Contract } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";

const ORACLE_ABI = [
  "function getStoredPrice() public view returns (uint256)",
  "function getLivePrice() public view returns (uint256)",
  "function getPriceDeviation() external view returns (uint)",
  "function decimals() external pure returns (uint8)",
  "function updatePrice() public",
];

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider } = context;




  // Craft transaction to update the price on-chain

  return {
    canExec: true,
    callData: [{ to:"0x8db755eC15a9a449A082f2c0443F6b2ca484c950",  data: "0xd09de08a"}],
  };
});
