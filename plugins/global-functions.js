export default (context, inject) => {
  const gf = () => {
    return {
      checkTrimText(val) {
        if ( val === '' || val === undefined || val === null ) {
          return '-';
        } else {
          return val;
        }
      },
      createUuid(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
      },
      getTimestamp() {
        var date = new Date();
        var timestamp = date.getTime();
        return timestamp;
      },
      backPage() {
        window.$nuxt.$router.go(-1);
      },
      convertToCurrency(n, currency) {
        return currency + n.toFixed(2).replace(/./g, function(c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
      },
    }
  }
  inject('gf', gf);
  context.$gf = gf;
}
