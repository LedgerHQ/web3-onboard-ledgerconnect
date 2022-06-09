import { createEIP1193Provider, EIP1193Provider, WalletInit } from '@web3-onboard/common'

export type InjectedProvider = Record<string, boolean> &
  Record<string, InjectedProvider[]>

export interface CustomWindow extends Window {
  ethereum: InjectedProvider
}

export class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Ethereum provider was found on window.ethereum.'
  }
}

export class NotLedgerConnectProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The provider found on window.ethereum is not Ledger Connect.'
  }
}

declare const window: CustomWindow

const LedgerConnectNameSpace = 'ethereum'
const LedgerConnectIdentityFlag = 'isLedgerConnect'
const LedgerConnectLabel = 'Ledger Connect'

function ledgerconnect(): WalletInit {
  return () => {
    if (typeof window === 'undefined') return null

    return {
      label: LedgerConnectLabel,
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        // check supported browsers
        const isSupportedBrowser = true
        console.log('isSupportedBrowser', isSupportedBrowser)
        // check supported platforms
        const isSupportedPlatform = true
        console.log('isSupportedPlatform', isSupportedPlatform)
        // check LLM installed, do a deep link request
        const isLedgerLiveMobileInstalled = true
        console.log('isLedgerLiveMobileInstalled', isLedgerLiveMobileInstalled)

        // check provider
        const provider = window[LedgerConnectNameSpace] as CustomWindow['ethereum']
        const isProviderDefined = !!provider
        console.log('isProviderDefined', isProviderDefined)

        if (!isProviderDefined) {
          console.log('no ethereum provider defined')
          return Promise.reject(new NoEthereumProviderError())
        }

        // check extension enabled
        const isExtensionLoaded = !!provider && !!provider[LedgerConnectIdentityFlag]
        console.log('isExtensionLoaded', isExtensionLoaded)

        if (!isExtensionLoaded) {
          console.log('the existing ethereum provider is not Ledger Connect')
          return Promise.reject(new NotLedgerConnectProviderError())
        }

        return {
          provider: window.ethereum as unknown as EIP1193Provider
        }
      }
    }
  }
}

export default ledgerconnect
