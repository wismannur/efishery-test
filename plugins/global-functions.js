export default (context, inject) => {
  const gf = () => {
    return {
      checkTrimText(val) {
        if ( val === '' || val === undefined || val === null ) {
          return '-';
        } else {
          return val;
        }
      }
    }
  }
  inject('gf', gf);
  context.$gf = gf;
}
