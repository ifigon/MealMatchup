/*eslint-disable */
let handleUrl = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    const response = yield fetch(url).catch(function (error) {
      return Promise.reject(new Error("Error fetching data"));
    });

    const json = yield response.json().catch(function () {
      log("Error parsing server response");
      return Promise.reject(new Error("Error parsing server response"));
    });

    if (json.status === "OK") {
      log(json);
      return json;
    }
    log(`Server returned status code ${json.status}`, true);
    return Promise.reject(new Error(`Server returned status code ${json.status}`));
  });

  return function handleUrl(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Geocode Module
 *
 * @package react-geocode
 * @author  Pir Shukarulalh Shah <shuker_rashdi@hotmail.com> (http://www.shukarullah.com)
 */

let DEBUG = false;
let API_KEY = null;
const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";

function log(message, warn = false) {
  if (DEBUG) {
    if (warn) {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
}

export default {
  /**
   *
   *
   * @param {string} apiKey
   */
  setApiKey(apiKey) {
    API_KEY = apiKey;
  },

  /**
   *
   *
   * @param {boolean} [flag=true]
   */
  enableDebug(flag = true) {
    DEBUG = flag;
  },

  /**
   *
   *
   * @param {string} lat
   * @param {string} lng
   * @param {string} [apiKey]
   * @returns {Promise}
   */
  fromLatLng(lat, lng, apiKey) {
    return _asyncToGenerator(function* () {
      if (!lat || !lng) {
        log("Provided coordinates are invalid", true);
        return Promise.reject(new Error("Provided coordinates are invalid"));
      }

      const latLng = `${lat},${lng}`;
      let url = `${GOOGLE_API}?latlng=${encodeURI(latLng)}`;

      if (apiKey || API_KEY) {
        API_KEY = apiKey || API_KEY;
        url += `&key=${API_KEY}`;
      }

      return handleUrl(url);
    })();
  },

  /**
   *
   *
   * @param {string} address
   * @param {string} [apiKey]
   * @returns {Promise}
   */
  fromAddress(address, apiKey) {
    return _asyncToGenerator(function* () {
      if (!address) {
        log("Provided address is invalid", true);
        return Promise.reject(new Error("Provided address is invalid"));
      }

      let url = `${GOOGLE_API}?address=${encodeURI(address)}`;
      if (apiKey || API_KEY) {
        API_KEY = apiKey || API_KEY;
        url += `&key=${API_KEY}`;
      }

      return handleUrl(url);
    })();
  }
};