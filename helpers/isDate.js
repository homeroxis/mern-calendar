const moment = require('moment');

const isDate = ( value ) => {
  if ( !value ) {
    moment
    return false
  }

  const fecha = moment( value );
  if ( fecha.isValid() ) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isDate
}