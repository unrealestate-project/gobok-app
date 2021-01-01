const icons = {
  HOME_FOCUSED: require('./home-focused.png'),
  HOME_UNFOCUSED: require('./home-unfocused.png'),
  PERSON_FOCUSED: require('./person-focused.png'),
  PERSON_UNFOCUSED: require('./person-unfocused.png'),
}

export const getBottomTabIcon = (route: string, focused: boolean) => {
  const routeToIcon = {
    RoomTab: 'HOME',
    ProfileTab: 'PERSON',
  }
  // @ts-ignore
  return icons[`${routeToIcon[route]}_${focused ? 'FOCUSED' : 'UNFOCUSED'}`]
}
