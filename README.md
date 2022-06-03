# @ledgerhq/web3-onboard-ledgerconnect

## Wallet module for connecting the Ledger Connect browser extension to web3-onboard

### Install

TODO While it is not published to npm you'll need to clone the repository locally
and use `yarn link`. Check the web3-onboard-ledgerconnect-demo repository for
instructions.

### Usage

```typescript
import Onboard from '@web3-onboard/core'
import ledgerConnectModule from '@ledgerhq/web3-onboard-ledgerconnect'

const ledgerConnect = ledgerConnectModule()

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    ledgerConnect
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
