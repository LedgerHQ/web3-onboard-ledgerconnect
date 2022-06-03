import { createEIP1193Provider, EIP1193Provider, WalletInit } from '@web3-onboard/common'

export type InjectedProvider = Record<string, boolean> &
  Record<string, InjectedProvider[]>

export interface CustomWindow extends Window {
  ethereum: InjectedProvider
}

declare const window: CustomWindow

const LedgerConnectNameSpace = 'ethereum'
const LedgerConnectIdentityFlag = 'isLedgerConnect'
const LedgerConnectLabel = 'Ledger Connect'

function ledgerconnect(): WalletInit {
  return () => {
    if (typeof window === 'undefined') return null

    const provider = window[LedgerConnectNameSpace] as CustomWindow['ethereum']

    // check supported browsers
    const isSupportedBrowser = true
    console.log('isSupportedBrowser', isSupportedBrowser)
    // check supported platforms
    const isSupportedPlatform = true
    console.log('isSupportedPlatform', isSupportedPlatform)
    // check LLM installed, do a deep link request
    const isLedgerLiveMobileInstalled = true
    console.log('isLedgerLiveMobileInstalled', isLedgerLiveMobileInstalled)
    // check extension enabled
    const isExtensionLoaded = !!provider && !!provider[LedgerConnectIdentityFlag]
    console.log('isExtensionLoaded', isExtensionLoaded)

    return {
      label: LedgerConnectLabel,
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => ({
        provider: window.ethereum as unknown as EIP1193Provider
      })    
    }
  }
}

export default ledgerconnect
