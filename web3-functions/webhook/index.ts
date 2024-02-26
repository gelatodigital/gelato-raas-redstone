
import { Web3Function, Web3FunctionEventContext } from "@gelatonetwork/web3-functions-sdk";

Web3Function.onRun(async (context: Web3FunctionEventContext) => {
  // Get event log from Web3FunctionEventContext
  const { log } = context;
  

  console.log(JSON.stringify(log))

  
  return { canExec: false, message: `Event processed wallet, pnly testing` };
});
