export const setCookies = (state) => {
  // window.$nuxt.$cookies.set('state', state, this.$gf().timeUpCookies());
  // window.$nuxt.$cookies;
  state;
}
export const setLoadingPage = (state, data) => {
  state.loadingPage = data;
}
export const setMsgHandler = (state, data) => {
  state.messageHandler = data;
}
export const setCancelSvData = (state, data) => {
  state.cancelSvData = data;
}
export const setThemeNow = (state, data) => {
  state.themeNow = data;
}
