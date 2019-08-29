declare module 'vtex.render-runtime' {
  interface Runtime {
    setQuery: (vars: { skuId: string }, options?: { replace?: boolean }) => void
    query: Record<string, any>
  }
  export const useRuntime: () => Runtime
}
