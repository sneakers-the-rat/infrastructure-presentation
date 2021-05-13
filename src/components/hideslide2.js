"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.default = HideSlide2;
// exports.AnimatedDiv = exports.SlideContext = void 0;

// var _react = _interopRequireWildcard(require("react"));
import React from 'react';
import _react from 'react'
import _reactDom from 'react-dom'
import _propTypes from 'prop-types'
import {css as _css, default as _default, ThemeContext} from 'styled-components'
import _styledComponents from 'styled-components';
import _styledSystem from 'styled-system';
import {color, space, background} from 'styled-system'


// var _reactDom = _interopRequireDefault(require("react-dom"));

// var _propTypes = _interopRequireDefault(require("prop-types"));

// var _styledComponents = _interopRequireWildcard(require("styled-components"));

// var _styledSystem = require("styled-system");

// var _deck = require("../deck/deck");
// import {Deck as _deck} from 'spectacle';
import {DeckContext} from 'spectacle';

// var _reactSpring = require("react-spring");
import {animated, useSpring} from 'react-spring';

// var _useSlides = require("../../hooks/use-slides");
import {useSlide} from 'spectacle'

// var _useSteps = require("../../hooks/use-steps");
import {useCollectSteps} from 'spectacle'

// var _useDeckState = require("../../hooks/use-deck-state");
import {GOTO_FINAL_STEP} from 'spectacle'

var _reactSwipeable = require("react-swipeable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      outline: 2px solid white;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background: transparent;\n\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  overflow: hidden;\n  display: flex;\n  z-index: 0;\n\n  &:before {\n    ", ";\n    content: ' ';\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: -1;\n    opacity: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var noop = function noop() {};

export var SlideContext = /*#__PURE__*/(0, _react.createContext)(null);
// exports.SlideContext = SlideContext;
var STAGE_RIGHT = 'translateX(-100%)';
var CENTER_STAGE = 'translateX(0%)';
var STAGE_LEFT = 'translateX(100%)';
var SlideContainer = (0, _default)('div')(_templateObject(), color, background, function (_ref) {
  var backgroundOpacity = _ref.backgroundOpacity;
  return backgroundOpacity;
});
var SlideWrapper = (0, _default)('div')(color, space, (0, _css)(_templateObject2()));
var TemplateWrapper = (0, _default)('div')(_templateObject3());
export var AnimatedDiv = (0, _default)(animated.div)(_templateObject4(), function (_ref2) {
  var tabIndex = _ref2.tabIndex;
  return tabIndex === 0 && (0, _css)(_templateObject5());
});

export default function HideSlide2(_ref3) {
  var userProvidedId = _ref3.id,
      children = _ref3.children,
      backgroundColor = _ref3.backgroundColor,
      backgroundImage = _ref3.backgroundImage,
      backgroundOpacity = _ref3.backgroundOpacity,
      backgroundPosition = _ref3.backgroundPosition,
      backgroundRepeat = _ref3.backgroundRepeat,
      backgroundSize = _ref3.backgroundSize,
      padding = _ref3.padding,
      textColor = _ref3.textColor,
      template = _ref3.template,
      _ref3$className = _ref3.className,
      slideNum = _ref3.slideNum,
      bufferSlides = _ref3.bufferSlides,
      className = _ref3$className === void 0 ? '' : _ref3$className;

  if ((0, _react.useContext)(SlideContext)) {
    throw new Error("Slide components may not be nested within each other.");
  }

  var _useSlide = (0, useSlide)(userProvidedId),
      slideId = _useSlide.slideId,
      placeholder = _useSlide.placeholder;

  var _useCollectSteps = (0, useCollectSteps)(slideId),
      setStepContainer = _useCollectSteps.setStepContainer,
      activationThresholds = _useCollectSteps.activationThresholds,
      finalStepIndex = _useCollectSteps.finalStepIndex;

  var _useContext = (0, _react.useContext)(DeckContext),
      _useContext$onSlideCl = _useContext.onSlideClick,
      onSlideClick = _useContext$onSlideCl === void 0 ? noop : _useContext$onSlideCl,
      onMobileSlide = _useContext.onMobileSlide,
      useAnimations = _useContext.useAnimations,
      slidePortalNode = _useContext.slidePortalNode,
      _useContext$frameOver = _useContext.frameOverrideStyle,
      frameOverrideStyle = _useContext$frameOver === void 0 ? {} : _useContext$frameOver,
      _useContext$wrapperOv = _useContext.wrapperOverrideStyle,
      wrapperOverrideStyle = _useContext$wrapperOv === void 0 ? {} : _useContext$wrapperOv,
      deckInitialized = _useContext.initialized,
      passedSlideIds = _useContext.passedSlideIds,
      upcomingSlideIds = _useContext.upcomingSlideIds,
      activeView = _useContext.activeView,
      pendingView = _useContext.pendingView,
      advanceSlide = _useContext.advanceSlide,
      regressSlide = _useContext.regressSlide,
      commitTransition = _useContext.commitTransition,
      cancelTransition = _useContext.cancelTransition,
      deckTemplate = _useContext.template,
      slideCount = _useContext.slideCount;

  var handleClick = (0, _react.useCallback)(function (e) {
    onSlideClick(e, slideId);
  }, [onSlideClick, slideId]);
  var inOverviewMode = Object.entries(frameOverrideStyle).length > 0;
  var isActive = activeView.slideId === slideId;
  var isPending = pendingView.slideId === slideId;
  var isPassed = passedSlideIds.has(slideId);
  var isUpcoming = upcomingSlideIds.has(slideId);
  var willEnter = !isActive && isPending;
  var willExit = isActive && !isPending;
  var slideWillChange = activeView.slideIndex !== pendingView.slideIndex;
  var stepWillChange = activeView.stepIndex !== pendingView.stepIndex;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      animate = _useState2[0],
      setAnimate = _useState2[1]; // If we've already been to this slide, all its elements should be visible; if
  // we haven't gotten to it yet, none of them should be visible. (This helps us
  // handle slides which are exiting but which are still visible while
  // animated.)


  var infinityDirection = isPassed ? Infinity : -Infinity;
  var internalStepIndex = isActive ? activeView.stepIndex : infinityDirection;

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hover = _useState4[0],
      setHover = _useState4[1];

  var onHoverChange = (0, _react.useCallback)(function () {
    setHover(!hover);
  }, [hover]);

  _react.useEffect(function () {
    if (!isActive) return;
    if (!stepWillChange) return;
    if (slideWillChange) return;

    if (pendingView.stepIndex < 0) {
      setAnimate(false);
      regressSlide();
    } else if (pendingView.stepIndex > finalStepIndex) {
      setAnimate(true);
      advanceSlide();
    } else if (pendingView.stepIndex === GOTO_FINAL_STEP) {
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else {
      var isSingleForwardStep = activeView.stepIndex === pendingView.stepIndex - 1; // the step is happening within this slide

      setAnimate(isSingleForwardStep);
      commitTransition();
    }
  }, [isActive, stepWillChange, slideWillChange, activeView, pendingView, finalStepIndex, regressSlide, advanceSlide, commitTransition]); // Bounds checking for slides in the presentation.


  (0, _react.useEffect)(function () {
    if (!willExit) return;

    if (pendingView.slideId === undefined) {
      setAnimate(false);
      cancelTransition();
    } else {
      var isTransitionToNextSlide = activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionToNextSlide);
    }
  }, [willExit, pendingView, cancelTransition, activeView.slideIndex]);
  (0, _react.useEffect)(function () {
    if (!willEnter) return;
    if (finalStepIndex === undefined) return;

    if (pendingView.stepIndex < 0) {
      setAnimate(false);
      commitTransition({
        stepIndex: 0
      });
    } else if (pendingView.stepIndex === GOTO_FINAL_STEP) {
      // Because <Slide> elements enumerate their own steps, nobody else
      // actually knows how many steps are in a slide. So other slides put a
      // value of GOTO_FINAL_STEP in the step index to indicate that the slide
      // should fill in the correct finalStepIndex before we commit the change.
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else if (pendingView.stepIndex > finalStepIndex) {
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else {
      var isTransitionFromPreviousSlide = activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionFromPreviousSlide);
      commitTransition();
    }
  }, [willEnter, activeView, pendingView, finalStepIndex, commitTransition]);
  var target = (0, _react.useMemo)(function () {
    if (isPassed) {
      return [{
        transform: STAGE_RIGHT
      }, {
        display: 'none'
      }];
    }

    if (isActive) {
      return {
        transform: CENTER_STAGE,
        display: 'unset'
      };
    }

    if (isUpcoming) {
      return {
        transform: STAGE_LEFT,
        display: 'none'
      };
    }

    return {
      display: 'none'
    };
  }, [isPassed, isActive, isUpcoming]);
  var immediate = !animate || !useAnimations;
  var springFrameStyle = (0, useSpring)({
    to: target,
    immediate: immediate
  });
  var theme = (0, _react.useContext)(ThemeContext);
  var scaledWrapperOverrideStyle = (0, _react.useMemo)(function () {
    var _theme$space;

    if (!wrapperOverrideStyle || Object.entries(wrapperOverrideStyle).length === 0) {
      return {};
    }

    var themeSlidePadding = (theme === null || theme === void 0 ? void 0 : (_theme$space = theme.space) === null || _theme$space === void 0 ? void 0 : _theme$space[padding]) || 0;
    return _objectSpread(_objectSpread({}, wrapperOverrideStyle), {}, {
      width: "calc(".concat(wrapperOverrideStyle.width, " - ").concat(themeSlidePadding * 2, "px)"),
      height: "calc(".concat(wrapperOverrideStyle.height, " - ").concat(themeSlidePadding * 2, "px)")
    });
  }, [wrapperOverrideStyle, theme, padding]);
  var swipeHandler = (0, _reactSwipeable.useSwipeable)({
    onSwiped: function onSwiped(eventData) {
      return onMobileSlide(eventData);
    }
  });
  return /*#__PURE__*/_react.createElement(_react.Fragment, null, placeholder, /*#__PURE__*/_react.createElement(SlideContext.Provider, {
    value: {
      immediate: immediate,
      slideId: slideId,
      isSlideActive: isActive,
      activationThresholds: activationThresholds,
      activeStepIndex: internalStepIndex
    }
  }, slidePortalNode && /*#__PURE__*/_reactDom.createPortal( /*#__PURE__*/_react.createElement(AnimatedDiv, {
    ref: setStepContainer,
    onClick: handleClick,
    tabIndex: inOverviewMode && isActive ? 0 : undefined,
    style: _objectSpread(_objectSpread(_objectSpread({}, springFrameStyle), frameOverrideStyle), inOverviewMode && hover && {
      outline: '2px solid white'
    }),
    onMouseEnter: onHoverChange,
    onMouseLeave: onHoverChange
  }, /*#__PURE__*/_react.createElement(SlideContainer, _extends({
    className: className,
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage,
    backgroundOpacity: backgroundOpacity,
    backgroundPosition: backgroundPosition,
    backgroundRepeat: backgroundRepeat,
    backgroundSize: backgroundSize,
    color: textColor
  }, swipeHandler), /*#__PURE__*/_react.createElement(TemplateWrapper, {
    style: wrapperOverrideStyle
  }, (typeof template === 'function' || typeof deckTemplate === 'function') && (template || deckTemplate)({
    slideNumber: activeView.slideIndex + 1,
    numberOfSlides: slideCount
  })), /*#__PURE__*/_react.createElement(SlideWrapper, {
    style: scaledWrapperOverrideStyle,
    padding: padding
  }, activeView.slideIndex === undefined || ((activeView.slideIndex>=slideNum-bufferSlides) && (activeView.slideIndex <=slideNum+bufferSlides)) ? children : <></>))), slidePortalNode)));
}

HideSlide2.propTypes = {
  id: _propTypes.string,
  className: _propTypes.string,
  backgroundColor: _propTypes.string,
  backgroundImage: _propTypes.string,
  backgroundOpacity: _propTypes.number,
  backgroundPosition: _propTypes.string,
  backgroundRepeat: _propTypes.string,
  backgroundSize: _propTypes.string,
  children: _propTypes.node.isRequired,
  padding: _propTypes.oneOfType([_propTypes.string, _propTypes.number]),
  textColor: _propTypes.string,
  template: _propTypes.oneOfType([_propTypes.node, _propTypes.func])
};
HideSlide2.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary',
  backgroundOpacity: 1,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  bufferSlides: 1,
  padding: 2
};
