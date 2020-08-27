declare module 'vtex.render-runtime' {
  interface Runtime {
    setQuery: (vars: { skuId: string }, options?: { replace?: boolean }) => void
    query?: Record<string, string>
    culture: any
  }
  export const useRuntime: () => Runtime
}
