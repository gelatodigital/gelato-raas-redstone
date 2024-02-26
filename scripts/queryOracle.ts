/* eslint-disable @typescript-eslint/naming-convention */
import hre from "hardhat";
import { RedstonePriceFeedWithRoundsBTC} from "../typechain";

const parsePrice = (value: Uint8Array) => {
  const bigNumberPrice = hre.ethers.BigNumber.from(value);
  return bigNumberPrice.toNumber() / 10 ** 8; // Redstone uses 8 decimals
};

async function main() {
  const chainId = hre.network.config.chainId as number;

  // Init GelatoOpsSDK
  const [signer] = await hre.ethers.getSigners();

 // GET CONTRACT
  let oracle: RedstonePriceFeedWithRoundsBTC;
 let oracleAddress = (await hre.deployments.get("RedstonePriceFeedWithRoundsETH"))
    .address;
  oracle = (await hre.ethers.getContractAt(
    "RedstonePriceFeedWithRoundsETH",
    oracleAddress
  )) as RedstonePriceFeedWithRoundsBTC;


let latestRound = await oracle.latestRound()
console.log(latestRound)
   

let latestRoundData = await oracle.latestRoundData()
console.log(latestRoundData)


let latestAnswer = await oracle.latestAnswer()
console.log(latestAnswer)

let roundData = await oracle.getRoundData(1)
console.log(roundData)

}

main()
  .then(() => console.log("OK"))
  //process.exit(0))
  .catch((error) => {
    console.error(error);
    // process.exit(1);
  });
