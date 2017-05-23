'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  list: {
    display: 'block',
    listStyleType: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    width: '100%',
    borderBottom: '1px solid #ddd'
  },
  item: {
    display: 'inline-block',
    width: '8em',
    paddingTop: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingBottom: '0.5em',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '-1px',
    color: 'rgb(68, 68, 68)'
  },
  active: {
    fontWeight: 'bold',
    border: '1px solid #ddd',
    borderTop: '2px solid orange',
    borderBottom: '1px solid #fff'
  }
};

var LocaleChooser = function LocaleChooser(_ref) {
  var locales = _ref.locales,
      locale = _ref.locale,
      onChoose = _ref.onChoose;

  var itemActive = _extends({}, styles.item, styles.active);
  var itemDefault = _extends({}, styles.item);

  return _react2.default.createElement(
    'ul',
    { style: styles.list },
    locales.map(function (option) {
      return _react2.default.createElement(
        'li',
        {
          key: option,
          onClick: function onClick() {
            return onChoose(option);
          },
          style: option === locale ? itemActive : itemDefault
        },
        option === locale ? '✔' : null,
        option
      );
    })
  );
};

LocaleChooser.propTypes = {
  locales: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
  locale: _react.PropTypes.string,
  defaultLocale: _react.PropTypes.string,
  onChoose: _react.PropTypes.func.isRequired
};

exports.default = LocaleChooser;