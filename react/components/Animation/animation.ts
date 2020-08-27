const DRAWER_HORIZONTAL = 'drawerHorizontal'
const DRAWER_VERTICAL = 'drawerVertical'

export const DRAWER_ANIMATION = {
  [DRAWER_HORIZONTAL]: (duration: any, transfer: any) => ({
    transform: `translateX(${transfer}%)`,
    transition: `transform ${duration}s ease-in-out`,
  }),
  [DRAWER_VERTICAL]: (duration: any, transfer: any) => ({
    transform: `translateY(${transfer}%)`,
    transition: `transform ${duration}s ease-in-out`,
  }),
}

export const ANIMATIONS = {
  drawerLeft: {
    from: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_HORIZONTAL](duration, -transfer),
    leave: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_HORIZONTAL](duration, transfer),
  },
  drawerRight: {
    from: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_HORIZONTAL](duration, transfer),
    leave: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_HORIZONTAL](duration, -transfer),
  },
  drawerTop: {
    from: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_VERTICAL](duration, -transfer),
    leave: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_VERTICAL](duration, transfer),
  },
  drawerBottom: {
    from: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_VERTICAL](duration, transfer),
    leave: (duration: any, transfer: any) =>
      DRAWER_ANIMATION[DRAWER_VERTICAL](duration, -transfer),
  },
}
