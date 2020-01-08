declare module 'vtex.responsive-values' {
  const useResponsiveValues: <U>(input: U) => U
  const useResponsiveValue: <T>(input: MaybeResponsiveInput<T>) => T

  enum InputDevices {
    mobile = 'mobile',
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop',
  }

  enum OutputDevices {
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop',
  }

  type ResponsiveInput<T> = { [P in keyof typeof InputDevices]?: T }
  type MaybeResponsiveInput<T> = T | ResponsiveInput<T>

  type ResponsiveOutput<T> = { [P in keyof typeof OutputDevices]: T }
}
