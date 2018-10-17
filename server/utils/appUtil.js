var _ = require('lodash'),
    _endcrypt = require("endcrypt"),
    endcrypt = new _endcrypt.Endcrypt(),
    config = require('../config');


module.exports = {
    /*
     * Convert numeric data if it is string [doing up to second level]
     */
    convertDataByType: function (data) {
        var value, value2;
        _.each(_.keys(data), function (key) {
            value = data[key];
            if (typeof value === 'object') {
                _.each(_.keys(value), function (key2) {
                    value2 = value[key2];
                    if (!isNaN(value2)) {
                        value[key2] = Number(value2);
                    }
                })
            } else {
                if (!isNaN(value)) {
                    data[key] = Number(value);
                }
            }
        });
        return data;
    },
    randomItem: function (list) {
        var index = this.randomIndex(list),
            item = (index >= 0) ? list[index] : null;
        return item;
    },

    randomIndex: function (list) {
        var low = 0,
            high = 0,
            item = null,
            index;

        if (list && list.length > 0) {
            high = list.length - 1;
            index = Math.floor(Math.random() * (high - low + 1) + low);
        }
        return index;
    },

    addDays: function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    subtractDays: function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    },

    oneDay: function () {
        return 1000 * 60 * 60 * 24;
    },
    regexQuote: function (str) {
        str = str ? str.toString().trim() : "";
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    },
    getCamelCase: function (str) {
        return str.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
            return p1 + p2.toUpperCase();
        });
    },
    cleanNonAsciiChars: function (str) {
		var _cleanStr = "";
		_.each(str, function (_char) {
			if (_char.charCodeAt(0) <= 127) {
				_cleanStr += _char;
			}
		});
		return _cleanStr.replace(/\s\s+/g, ' ');
	},
    decryptToText: function (cipher) {
        var text = endcrypt.decryptWithKey(cipher, config.cryptoKey);
        return text;
    },
    correctToTwoDecVal: function (value) {
        return Math.ceil(value * 100) / 100;
    },
    /***
     * Convert to Number type if string type
     * @param data
     * @returns {*}
     * @private
     */
    correctToValidFloatType: function (data) {
        var  retData = data;
        if (typeof retData !== 'number') {
            retData = parseFloat(data);
        }

        if (isNaN(retData)) {
            retData = 0;
        }
        return retData;
    },
	getAddressComponentsFromPlace: function (place){
		var state, cmp, i, matchedCityCriteria, matchedStateCriteria, city,
			cmpLength = place.address_components.length;

		for (i = 0; i < cmpLength; i++) {
			cmp = place.address_components[i];
			if (!city) {
				matchedCityCriteria = (_.indexOf(cmp.types, "locality") > -1 ||
					_.indexOf(cmp.types, "neighborhood") > -1 ||
					_.indexOf(cmp.types, "sublocality") > -1);

				if (matchedCityCriteria) {
					city = cmp.short_name;
				}
			}

			matchedStateCriteria = (_.indexOf(cmp.types, "administrative_area_level_1") > -1);
			if (matchedStateCriteria) {
				state = cmp.short_name;
			}
			if (city && state) {
				break;
			}
		}

		return {
			city: city,
			state: state
		};
	}
};
