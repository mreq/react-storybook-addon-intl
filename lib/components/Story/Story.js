'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _LocaleChooser = require('../LocaleChooser/LocaleChooser');

var _LocaleChooser2 = _interopRequireDefault(_LocaleChooser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  wrapper: {
    position: 'relative',
    top: 0,
    left: 0,
    paddingTop: '3.5em'
  },
  item: {
    display: 'block',
    marginBottom: '1em',
    paddingBottom: '1em',
    borderBottom: '1px solid #ccc',
    position: 'relative'
  },
  label: {
    position: 'absolute',
    top: '-0.5em',
    right: '1em',
    opacity: 0.5
  }
};

var withIntl = function withIntl(locale, messages, cmp) {
  return _react2.default.createElement(
    _reactIntl.IntlProvider,
    { locale: locale, messages: messages },
    cmp()
  );
};

var defaultLocale = 'en';
var allLocales = 'All';
var choosenLocale = null;

var Story = function (_Component) {
  _inherits(Story, _Component);

  function Story(props, ctx) {
    _classCallCheck(this, Story);

    var _this = _possibleConstructorReturn(this, (Story.__proto__ || Object.getPrototypeOf(Story)).call(this, props, ctx));

    var initialLocale = _this.getInitialLocale();

    _this.state = {
      locale: initialLocale
    };

    _this.changeLocale = _this.changeLocale.bind(_this);
    return _this;
  }

  _createClass(Story, [{
    key: 'getInitialLocale',
    value: function getInitialLocale() {
      var initialLocale = this.props.initialLocale;

      var availableTranslations = this.getAvailableTranslations();

      // explicitly specified in options
      if (initialLocale && availableTranslations.includes(initialLocale)) {
        return initialLocale;
      }

      // reuse previously choosen locale
      if (choosenLocale && availableTranslations.includes(choosenLocale)) {
        return choosenLocale;
      }

      return allLocales;
    }
  }, {
    key: 'unique',
    value: function unique(array) {
      return [].concat(_toConsumableArray(new Set(array)));
    }
  }, {
    key: 'getAvailableTranslations',
    value: function getAvailableTranslations() {
      return this.unique([defaultLocale].concat(_toConsumableArray(Object.keys(this.props.translations))));
    }
  }, {
    key: 'changeLocale',
    value: function changeLocale(locale) {
      choosenLocale = locale; // save choosen locale for later use
      this.setState({ locale: locale });
    }
  }, {
    key: 'render',
    value: function render() {
      var locale = this.state.locale;
      var _props = this.props,
          translations = _props.translations,
          render = _props.render;

      var availableTranslations = this.getAvailableTranslations();

      var locales = [allLocales].concat(_toConsumableArray(availableTranslations));

      var doRender = function () {
        if (locale === allLocales) {
          return function () {
            return availableTranslations.map(function (translation) {
              return _react2.default.createElement(
                'div',
                { style: styles.item, key: translation },
                _react2.default.createElement(
                  'span',
                  { style: styles.label },
                  translation
                ),
                withIntl(translation, translations[translation], render)
              );
            });
          };
        }

        return function () {
          return withIntl(locale, translations[locale], render);
        };
      }();

      return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(_LocaleChooser2.default, {
          locale: locale,
          locales: locales,
          onChoose: this.changeLocale
        }),
        doRender()
      );
    }
  }]);

  return Story;
}(_react.Component);

Story.propTypes = {
  render: _react.PropTypes.func.isRequired,
  translations: _react.PropTypes.object.isRequired,
  initialLocale: _react.PropTypes.string
};
exports.default = Story;