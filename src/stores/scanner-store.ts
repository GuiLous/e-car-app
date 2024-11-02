import { create } from 'zustand'

type ScannerStore = {
  showScanner: boolean
  setShowScanner: (showScanner: boolean) => void
}

export const useScannerStore = create<ScannerStore>((set) => ({
  showScanner: false,
  setShowScanner: (showScanner: boolean) =>
    set(() => ({
      showScanner,
    })),
}))
