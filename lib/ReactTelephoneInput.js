'use strict';

exports.__esModule = true;
exports.ReactTelephoneInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _cramda = require('cramda');

var _cramda2 = _interopRequireDefault(_cramda);

var _reactTinyVirtualList = require('react-tiny-virtual-list');

var _reactTinyVirtualList2 = _interopRequireDefault(_reactTinyVirtualList);

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _googleLibphonenumber = require('google-libphonenumber');

var libPhoneNumber = _interopRequireWildcard(_googleLibphonenumber);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _countryTelephoneData = require('country-telephone-data');

var _countryTelephoneData2 = _interopRequireDefault(_countryTelephoneData);

var _format_number = require('./format_number');

var _format_number2 = _interopRequireDefault(_format_number);

var _replace_country_code = require('./replace_country_code');

var _replace_country_code2 = _interopRequireDefault(_replace_country_code);

var _number_validator = require('./number_validator');

var _number_validator2 = _interopRequireDefault(_number_validator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Require `PhoneNumberFormat`.
var PNF = libPhoneNumber.PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
var phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

var find = _cramda2.default.find,
    propEq = _cramda2.default.propEq,
    equals = _cramda2.default.equals,
    findIndex = _cramda2.default.findIndex,
    startsWith = _cramda2.default.startsWith;
var allCountries = _countryTelephoneData2.default.allCountries,
    iso2Lookup = _countryTelephoneData2.default.iso2Lookup,
    allCountryCodes = _countryTelephoneData2.default.allCountryCodes;

var isModernBrowser = true;

if (typeof document !== 'undefined') {
  isModernBrowser = Boolean(document.createElement('input').setSelectionRange);
} else {
  isModernBrowser = true;
}

var keys = {
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  LEFT: 37,
  ENTER: 13,
  ESC: 27,
  PLUS: 43,
  A: 65,
  Z: 90,
  SPACE: 32
};

function getDropdownListWidth() {
  var defaultWidth = 400;
  var horizontalMargin = 20;

  if (window.innerWidth - horizontalMargin < defaultWidth) {
    return window.innerWidth - horizontalMargin;
  } else {
    return defaultWidth;
  }
}

var ReactTelephoneInput = exports.ReactTelephoneInput = (_temp = _class = function (_Component) {
  _inherits(ReactTelephoneInput, _Component);

  function ReactTelephoneInput(props) {
    _classCallCheck(this, ReactTelephoneInput);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var preferredCountries = props.preferredCountries.map(function (iso2) {
      return Object.prototype.hasOwnProperty.call(iso2Lookup, iso2) ? allCountries[iso2Lookup[iso2]] : null;
    }).filter(function (val) {
      return val !== null;
    });

    _this.state = _extends({
      inputNumber: '',
      preferredCountries: preferredCountries,
      placeholder: '',
      showDropDown: false,
      queryString: '',
      freezeSelection: false,
      debouncedQueryStingSearcher: (0, _debounce2.default)(_this.searchCountry, 600)
    }, _this._mapPropsToState(props, true));
    return _this;
  }

  ReactTelephoneInput.prototype.componentDidMount = function componentDidMount() {
    this._cursorToEnd(true);
    if (!this.state.selectedCountry) {
      this.setState({
        selectedCountry: find(propEq('iso2', this.props.defaultCountry), allCountries)
      });
    }
  };

  ReactTelephoneInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !equals(nextProps, this.props) || !equals(nextState, this.state);
  };

  ReactTelephoneInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this._mapPropsToState(nextProps));
  };

  // put the cursor to the end of the input (usually after a focus event)


  // memoize results based on the first 5/6 characters. That is all that matters


  // memoize search results... caching all the way


  ReactTelephoneInput.prototype.getPlaceHolder = function getPlaceHolder(country) {
    var exampleNumber = phoneUtil.getExampleNumberForType(country.iso2, 1);
    var exampleNumberValue = '';
    if (exampleNumber) {
      exampleNumberValue = phoneUtil.format(exampleNumber, PNF.NATIONAL);
      if (exampleNumberValue[0] !== exampleNumber.getNationalNumber()[0]) {
        exampleNumberValue = exampleNumberValue.slice(1);
      }
      exampleNumberValue = exampleNumberValue.toString();
      // Get country based example number.
      // Only display first mobile digit and
      // ecnode the other digits with 'x'
      exampleNumberValue = exampleNumberValue[0] + exampleNumberValue.slice(1).replace(/[^0-9- ]/g, '').replace(/\d/g, 'x');
    }
    return exampleNumberValue;
  };

  ReactTelephoneInput.prototype.render = function render() {
    var _this2 = this;

    var arrowClasses = (0, _classnames2.default)({
      arrow: true,
      up: this.state.showDropDown
    });
    var inputClasses = (0, _classnames2.default)({
      'form-control': true,
      'invalid-number': !this.props.isValid(this.state.formattedNumber.replace(/\D/g, ''))
    });

    var flagViewClasses = (0, _classnames2.default)({
      'flag-dropdown': true,
      'open-dropdown': this.state.showDropDown
    });

    var selectedCountry = this.state.selectedCountry || find(propEq('iso2', this.props.defaultCountry), allCountries);
    var placeholder = this.getPlaceHolder(selectedCountry);
    var inputFlagClasses = 'flag ' + selectedCountry.iso2;
    var otherProps = this.props.inputProps;
    if (this.props.inputId) {
      otherProps.id = this.props.inputId;
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('react-tel-input', this.props.classNames, this.props.className),
        'data-test-id': 'src_reacttelephoneinput_test_id_4'
      },
      _react2.default.createElement(
        'div',
        {
          className: flagViewClasses,
          onKeyDown: this.handleKeydown,
          'data-test-id': 'src_reacttelephoneinput_test_id_6'
          // this is crucial if we want keyboard up/down events to be heard through this div and not document.body
          , tabIndex: 0
        },
        _react2.default.createElement(
          'button',
          {
            onClick: this.handleFlagDropdownClick,
            className: 'selected-flag',
            title: selectedCountry.name + ': + ' + selectedCountry.dialCode,
            'data-test-id': 'src_reacttelephoneinput_test_id_7',
            onKeyDown: this.handleFlagKeyDown,
            type: 'button'
          },
          _react2.default.createElement(
            'div',
            {
              className: inputFlagClasses,
              style: this.getFlagStyle(),
              'data-test-id': 'src_reacttelephoneinput_test_id_8'
            },
            _react2.default.createElement('div', { className: arrowClasses, 'data-test-id': 'src_reacttelephoneinput_test_id_9' })
          )
        ),
        this.state.showDropDown ? this.getCountryDropDownList() : ''
      ),
      _react2.default.createElement(
        'div',
        {
          onClick: this.handleFlagDropdownClick,
          className: 'country-dial-code'
        },
        '+' + (selectedCountry.dialCode || '')
      ),
      _react2.default.createElement('input', _extends({
        onChange: this.handleInput,
        onClick: this.handleInputClick,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur,
        onKeyDown: this.handleInputKeyDown,
        value: this.state.inputNumber,
        ref: function ref(node) {
          _this2.numberInputRef = node;
        },
        type: 'tel',
        className: inputClasses,
        autoComplete: this.props.autoComplete,
        pattern: this.props.pattern,
        required: this.props.required,
        placeholder: placeholder,
        disabled: this.props.disabled
      }, otherProps, {
        'data-test-id': 'src_reacttelephoneinput_test_id_5'
      }))
    );
  };

  return ReactTelephoneInput;
}(_react.Component), _class.defaultProps = {
  autoFormat: true,
  onlyCountries: allCountries,
  defaultCountry: allCountries[0].iso2,
  isValid: _number_validator2.default,
  flagsImagePath: 'flags.png',
  onEnterKeyPress: function onEnterKeyPress() {},

  preferredCountries: [],
  disabled: false,
  autoComplete: 'tel',
  required: false,
  inputProps: {},
  listItemClassName: 'country',
  listStyle: {
    zIndex: 20,
    backgroundColor: 'white'
  }
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.numberInputRef = null;

  this._cursorToEnd = function (skipFocus) {
    var input = _this3.numberInputRef;
    if (skipFocus) {
      _this3._fillDialCode();
    } else {
      input.focus();

      if (isModernBrowser) {
        var len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }
  };

  this.guessSelectedCountry = function (inputNumber) {
    var _props = _this3.props,
        defaultCountry = _props.defaultCountry,
        onlyCountries = _props.onlyCountries;


    var secondBestGuess = find(propEq('iso2', defaultCountry), allCountries) || _this3.props.onlyCountries[0];

    var inputNumberForCountries = inputNumber.substr(0, 4);
    var bestGuess = void 0;

    if (inputNumber.trim() !== '') {
      bestGuess = onlyCountries.reduce(function (selectedCountry, country) {
        // if the country dialCode exists WITH area code

        if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === country.iso2) {
          return country;

          // if the selected country dialCode is there with the area code
        } else if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === selectedCountry.iso2) {
          return selectedCountry;

          // else do the original if statement
        }
        if (startsWith(country.dialCode, inputNumber)) {
          if (country.dialCode.length > selectedCountry.dialCode.length) {
            return country;
          }
          if (country.dialCode.length === selectedCountry.dialCode.length && country.priority < selectedCountry.priority) {
            return country;
          }
        }

        return selectedCountry;
      }, { dialCode: '', priority: 10001 }, _this3);
    } else {
      return secondBestGuess;
    }

    if (!bestGuess || !bestGuess.name) {
      return secondBestGuess;
    }

    return bestGuess;
  };

  this.handleFlagDropdownClick = function (e) {
    if (_this3.props.disabled) {
      return;
    }

    e.preventDefault();
    var _state = _this3.state,
        preferredCountries = _state.preferredCountries,
        selectedCountry = _state.selectedCountry;
    var onlyCountries = _this3.props.onlyCountries;

    // need to put the highlight on the current selected country if the dropdown is going to open up

    _this3.setState({
      showDropDown: !_this3.state.showDropDown,
      highlightCountry: find(equals(_this3.state.selectedCountry), _this3.props.onlyCountries),
      highlightCountryIndex: findIndex(propEq('iso2', selectedCountry.iso2), preferredCountries.concat(onlyCountries))
    });
  };

  this.handleInput = function (event) {
    var formattedNumber = '';
    var newSelectedCountry = _this3.state.selectedCountry;
    var freezeSelection = _this3.state.freezeSelection;

    // if the input is the same as before, must be some special key like enter, alt, command etc.

    if (event.target.value === _this3.state.inputValue) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else {
      // ie hack
      event.returnValue = false; // eslint-disable-line no-param-reassign
    }

    /*if (event.target.value && event.target.value.length > 0) {
      // before entering the number in new format,
      // lets check if the dial code now matches some other country
      // replace all non-numeric characters from the input string
      const inputNumber = event.target.value.replace(/\D/g, '')
       // we don't need to send the whole number to guess the country...
      // only the first 6 characters are enough
      // the guess country function can then use memoization much more effectively
      // since the set of input it gets has drastically reduced
      if (
        !this.state.freezeSelection ||
        this.state.selectedCountry.dialCode.length > inputNumber.length
      ) {
        newSelectedCountry = this.guessSelectedCountry(inputNumber.substring(0, 6))
        freezeSelection = false
      }
      formattedNumber = formatNumber(inputNumber, newSelectedCountry.format, this.props.autoFormat)
    }*/

    var caretPosition = event.target.selectionStart;
    var oldFormattedText = _this3.state.formattedNumber;
    var diff = formattedNumber.length - oldFormattedText.length;
    var selectedCountry = newSelectedCountry.dialCode.length > 0 ? newSelectedCountry : _this3.state.selectedCountry;
    var exampleNumber = _this3.getPlaceHolder(selectedCountry);

    _this3.setState({
      placeholder: exampleNumber,
      inputNumber: event.target.value,
      formattedNumber: formattedNumber,
      freezeSelection: freezeSelection,
      selectedCountry: selectedCountry
    }, function () {
      if (isModernBrowser) {
        if (caretPosition === 1 && formattedNumber.length === 2) {
          caretPosition += 1;
        }

        if (diff > 0) {
          caretPosition -= diff;
        }

        if (caretPosition > 0 && oldFormattedText.length >= formattedNumber.length) {
          if (_this3.numberInputRef) {
            _this3.numberInputRef.setSelectionRange(caretPosition, caretPosition);
          }
        }
      }

      if (_this3.props.onChange) {
        _this3.props.onChange(selectedCountry.dialCode + _this3.state.inputNumber);
      }
    });
  };

  this.handleInputClick = function () {
    _this3.setState({ showDropDown: false });
  };

  this.handleFlagItemClick = function (country) {
    var currentSelectedCountry = _this3.state.selectedCountry;
    var nextSelectedCountry = find(equals(country), _this3.props.onlyCountries);

    // tiny optimization
    if (currentSelectedCountry.iso2 !== nextSelectedCountry.iso2) {
      var newNumber = (0, _replace_country_code2.default)(currentSelectedCountry, nextSelectedCountry, _this3.state.formattedNumber.replace(/\D/g, '') // let's convert formatted number to just numbers for easy find/replace
      );
      var exampleNumberValue = _this3.getPlaceHolder(nextSelectedCountry.iso2);

      var formattedNumber = (0, _format_number2.default)(newNumber, nextSelectedCountry.format, _this3.props.autoFormat);

      _this3.setState({
        showDropDown: false,
        selectedCountry: nextSelectedCountry,
        freezeSelection: true,
        placeholder: exampleNumberValue
      }, function () {
        _this3._cursorToEnd();
      });
    } else {
      _this3.setState({ showDropDown: false });
    }
  };

  this.handleInputFocus = function () {
    // trigger parent component's onFocus handler
    if (typeof _this3.props.onFocus === 'function') {
      _this3.props.onFocus(_this3.state.formattedNumber, _this3.state.selectedCountry);
    }

    _this3._fillDialCode();
  };

  this._mapPropsToState = function (props) {
    var firstCall = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var inputNumber = void 0;

    if (props.value) {
      inputNumber = props.value;
    } else if (props.initialValue && firstCall) {
      inputNumber = props.initialValue;
    } else if (_this3.props.value) {
      // just clear the value
      inputNumber = '';
    } else if (_this3.state && _this3.state.formattedNumber && _this3.state.formattedNumber.length > 0) {
      inputNumber = _this3.state.formattedNumber;
    } else {
      inputNumber = '';
    }

    return {
      formattedNumber: inputNumber
    };
  };

  this._fillDialCode = function () {};

  this._getHighlightCountryIndex = function (direction) {
    // had to write own function because underscore does not have findIndex. lodash has it
    var highlightCountryIndex = _this3.state.highlightCountryIndex + direction;

    if (highlightCountryIndex < 0 || highlightCountryIndex >= _this3.props.onlyCountries.length + _this3.state.preferredCountries.length) {
      return highlightCountryIndex - direction;
    }

    return highlightCountryIndex;
  };

  this._searchCountry = (0, _lodash2.default)(function searchCountry(queryString) {
    if (!queryString || queryString.length === 0) {
      return null;
    }
    // don't include the preferred countries in search
    var probableCountries = this.props.onlyCountries.filter(function (country) {
      return startsWith(queryString.toLowerCase(), country.name.toLowerCase());
    }, this);
    return probableCountries[0];
  });

  this.searchCountry = function () {
    var probableCandidate = _this3._searchCountry(_this3.state.queryString) || _this3.props.onlyCountries[0];
    var probableCandidateIndex = findIndex(propEq('iso2', probableCandidate.iso2), _this3.props.onlyCountries) + _this3.state.preferredCountries.length;

    _this3.setState({
      queryString: '',
      highlightCountryIndex: probableCandidateIndex
    });
  };

  this.handleKeydown = function (event) {
    if (!_this3.state.showDropDown || event.metaKey || event.altKey) {
      return;
    }

    // ie hack
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false; // eslint-disable-line no-param-reassign
    }

    var self = _this3;
    function _moveHighlight(direction) {
      self.setState({
        highlightCountryIndex: self._getHighlightCountryIndex(direction)
      });
    }

    switch (event.which) {
      case keys.DOWN:
        _moveHighlight(1);
        break;
      case keys.UP:
        _moveHighlight(-1);
        break;
      case keys.ENTER:
        _this3.handleFlagItemClick(_this3.state.preferredCountries.concat(_this3.props.onlyCountries)[_this3.state.highlightCountryIndex], event);
        break;
      case keys.ESC:
        _this3.setState({ showDropDown: false }, _this3._cursorToEnd);
        break;
      default:
        if (event.which >= keys.A && event.which <= keys.Z || event.which === keys.SPACE) {
          _this3.setState({
            queryString: _this3.state.queryString + String.fromCharCode(event.which)
          }, _this3.state.debouncedQueryStingSearcher);
        }
    }
  };

  this.handleInputKeyDown = function (event) {
    if (event.which === keys.ENTER) {
      typeof _this3.props.onEnterKeyPress === 'function' && _this3.props.onEnterKeyPress(event);
    }
  };

  this.handleClickOutside = function () {
    if (_this3.state.showDropDown) {
      _this3.setState({
        showDropDown: false
      });
    }
  };

  this.getCountryDropDownList = function () {
    var data = _this3.state.preferredCountries.concat(_this3.props.onlyCountries);

    return _react2.default.createElement(_reactTinyVirtualList2.default, {
      width: getDropdownListWidth(),
      height: _this3.props.dropDownHeight || 300,
      itemCount: data.length,
      itemSize: 40,
      style: _this3.props.listStyle,
      className: 'country-list',
      scrollToIndex: _this3.state.highlightCountryIndex,
      scrollToAlignment: 'center',
      renderItem: function renderItem(_ref) {
        var index = _ref.index,
            style = _ref.style;

        var country = data[index];
        var itemClasses = (0, _classnames2.default)(_this3.props.listItemClassName, {
          preferred: findIndex(propEq('iso2', country.iso2), _this3.state.preferredCountries) >= 0,
          highlight: _this3.state.highlightCountryIndex === index
        });

        var inputFlagClasses = 'flag ' + country.iso2;

        return _react2.default.createElement(
          'div',
          {
            key: 'flag_no_' + index,
            'data-flag-key': 'flag_no_' + index,
            className: itemClasses,
            'data-dial-code': country.dialCode,
            'data-country-code': country.iso2,
            onClick: _this3.handleFlagItemClick.bind(_this3, country),
            style: style,
            title: country.name + ' - ' + country.dialCode,
            'data-test-id': 'src_reacttelephoneinput_test_id_0'
          },
          _react2.default.createElement('div', {
            className: inputFlagClasses,
            style: _this3.getFlagStyle(),
            'data-test-id': 'src_reacttelephoneinput_test_id_1'
          }),
          _react2.default.createElement(
            'span',
            { className: 'country-name', 'data-test-id': 'src_reacttelephoneinput_test_id_2' },
            country.name
          ),
          _react2.default.createElement(
            'span',
            { className: 'dial-code', 'data-test-id': 'src_reacttelephoneinput_test_id_3' },
            '' + country.dialCode
          )
        );
      }
    });
  };

  this.getFlagStyle = function () {
    if (_this3.props.flagsImagePath) {
      return {
        backgroundImage: 'url(' + _this3.props.flagsImagePath + ')'
      };
    }
    return {};
  };

  this.handleInputBlur = function () {
    if (typeof _this3.props.onBlur === 'function') {
      _this3.props.onBlur(_this3.state.formattedNumber, _this3.state.selectedCountry);
    }
  };

  this.handleFlagKeyDown = function (event) {
    // only trigger dropdown click if the dropdown is not already open.
    // it will otherwise interfere with key up/down of list
    if (event.which === keys.DOWN && _this3.state.showDropDown === false) {
      _this3.handleFlagDropdownClick(event);
    }
  };
}, _temp);


ReactTelephoneInput.propTypes = process.env.NODE_ENV !== "production" ? {
  value: _propTypes2.default.string,
  initialValue: _propTypes2.default.string,
  autoFormat: _propTypes2.default.bool,
  defaultCountry: _propTypes2.default.string,
  isValid: _propTypes2.default.func,
  onlyCountries: _propTypes2.default.arrayOf(_propTypes2.default.object),
  preferredCountries: _propTypes2.default.arrayOf(_propTypes2.default.string),
  flagsImagePath: _propTypes2.default.string,
  autoComplete: _propTypes2.default.string,
  classNames: _propTypes2.default.string,
  className: _propTypes2.default.string,
  inputId: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onEnterKeyPress: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  pattern: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  inputProps: _propTypes2.default.object,
  listStyle: _propTypes2.default.object,
  listItemClassName: _propTypes2.default.string,
  dropDownHeight: _propTypes2.default.number
} : {};

exports.default = (0, _reactClickOutside2.default)(ReactTelephoneInput);