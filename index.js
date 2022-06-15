const { Client, Wallet, convertStringToHex } = require("xrpl");

const SERVER = "wss://hooks-testnet-v2.xrpl-labs.com";
// secret for testnet(wss://hooks-testnet-v2.xrpl-labs.com)
const SECRET = "ssUvjQHTESzQ55BwihwrkV7orX5Fv";

const main = async () => {
  const client = new Client(SERVER);
  const wallet = Wallet.fromSecret(SECRET);

  await client.connect();

  const txBlob = {
    TransactionType: "NFTokenMint",
    NFTokenTaxon: 1,
    Account: wallet.address,
    Issuer: wallet.address,
    TransferFee: 10 * 1000,
    URI: convertStringToHex("1234"),
    Flags: {
      tfBurnable: false,
      tfOnlyXRP: false,
      tfTrustLine: false,
      tfTransferable: true,
    },
  };
  const res = await client.submitAndWait(txBlob, {
    wallet: wallet,
    autofill: true,
  });
  console.log(res);
};


(async () => {
  await main();
})();
