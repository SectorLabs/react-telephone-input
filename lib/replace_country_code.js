"use strict";

exports.__esModule = true;
exports.default = replaceCountryCode;
function replaceCountryCode(currentSelectedCountry, nextSelectedCountry, number) {
  var dialCodeRegex = RegExp("^(" + currentSelectedCountry.dialCode + ")");
  var codeToBeReplaced = number.match(dialCodeRegex);
  var newNumber = number.replace(dialCodeRegex, nextSelectedCountry.dialCode);

  if (codeToBeReplaced === null && newNumber === number) {
    return nextSelectedCountry.dialCode + number;
  }
  return newNumber;
}
module.exports = exports["default"];