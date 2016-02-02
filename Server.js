'use strict';

export const host = 'http://aprs.lussa.net';
export default {
  doctor: {
    find: function () {
      let url = host + '/doctor',
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    findOne: function (id) {
      let url = host + '/doctor/' + id,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    }
  }
};
