/* eslint-disable @typescript-eslint/naming-convention */
import hre from "hardhat";
import * as sdk from "@redstone-finance/sdk";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
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
 let oracleAddress = (await hre.deployments.get("RedstonePriceFeedWithRoundsBTC"))
    .address;
  oracle = (await hre.ethers.getContractAt(
    "RedstonePriceFeedWithRoundsBTC",
    oracleAddress
  )) as RedstonePriceFeedWithRoundsBTC;




// QUERY ORACLE
const getLatestSignedPrice = await sdk.requestDataPackages({
  dataServiceId: "redstone-primary-prod",
  uniqueSignersCount: 3,
  dataFeeds: ["BTC"],
  urls: ["https://oracle-gateway-1.a.redstone.finance"],
});

// Wrap contract with redstone data service
const wrappedOracle =
  WrapperBuilder.wrap(oracle).usingDataService(getLatestSignedPrice);

const { dataPackage } = getLatestSignedPrice["BTC"]![0];

const parsedPrice = parsePrice(dataPackage.dataPoints[0].value);
console.log(`Setting price in PriceFeed contract to: ${parsedPrice}`);
await wrappedOracle.updateDataFeedsValues(
  dataPackage.timestampMilliseconds
);

let latestRoundData = await oracle.latestRoundData()
console.log(latestRoundData)

}

main()
  .then(() => console.log("OK"))
  //process.exit(0))
  .catch((error) => {
    console.error(error);
    // process.exit(1);
  });
