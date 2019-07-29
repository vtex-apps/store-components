declare module 'vtex.render-runtime' {
  interface Runtime {
    setQuery: (vars: { skuId: string }, options?: { replace?: boolean }) => void
  }
  export const useRuntime: () => Runtime
}
