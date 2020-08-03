/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vtex.responsive-values' {
  const useResponsiveValues: (input: any) => any
  const useResponsiveValue: <T>(input: MaybeResponsiveInput<T>) => T

  const enum InputDevices {
    mobile = 'mobile',
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop',
  }

  const enum OutputDevices {
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop',
  }

  type ResponsiveInput<T> = { [P in keyof typeof InputDevices]?: T }
  type MaybeResponsiveInput<T> = T | ResponsiveInput<T>

  type ResponsiveOutput<T> = { [P in keyof typeof OutputDevices]: T }
}
