declare module 'vtex.render-runtime' {
  interface Runtime {
    setQuery: (vars: { skuId: string }, options?: { replace?: boolean }) => void
    query?: Record<string, string>
  }
  export const useRuntime: () => Runtime
}
