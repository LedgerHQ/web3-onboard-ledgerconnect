# @ledgerhq/web3-onboard-ledgerconnect

This wallet module for web3-onboard allows you to connect your dapp to the Ledger Connect browser extension.

### Install

Add it to your dapp along with web3-onboard with

    yarn add @web3-onboard/core
    yarn add @ledgerhq/web3-onboard-ledgerconnect

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
