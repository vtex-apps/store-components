export const DRAWER_ANIMATION = {
  drawerHorizontal: (duration, transfer) => ({
    transform: `translateX(${transfer}%)`,
    transition: `transform ${duration}s ease-in-out`,
  }),
  drawerVertical: (duration, transfer) => ({
    transform: `translateY(${transfer}%)`,
    transition: `transform ${duration}s ease-in-out`,
  }),
}

export const ANIMATIONS = {
  drawerLeft: {
    from: (duration, transfer) => DRAWER_ANIMATION['drawerHorizontal'](duration, transfer - transfer),
    leave: (duration, transfer) => DRAWER_ANIMATION['drawerHorizontal'](duration, transfer),
  },
  drawerRight: {
    from: (duration, transfer) => DRAWER_ANIMATION['drawerHorizontal'](duration, transfer - transfer),
    leave: (duration, transfer) => DRAWER_ANIMATION['drawerHorizontal'](duration, -transfer),
  },
  drawerTop: {
    from: (duration, transfer) => DRAWER_ANIMATION['drawerVertical'](duration, transfer - transfer),
    leave: (duration, transfer) => DRAWER_ANIMATION['drawerVertical'](duration, transfer),
  },
  drawerBottom: {
    from: (duration, transfer) => DRAWER_ANIMATION['drawerVertical'](duration, transfer - transfer),
    leave: (duration, transfer) => DRAWER_ANIMATION['drawerVertical'](duration, -transfer),
  },
}
