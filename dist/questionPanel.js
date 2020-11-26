"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mediaQuery = exports.breakpoint = exports.constants = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _keycodez = _interopRequireDefault(require("keycodez"));

var _validation = _interopRequireDefault(require("./lib/validation"));

var _errors = _interopRequireDefault(require("./lib/errors"));

var _button = _interopRequireDefault(require("./button"));

var _questionSet = _interopRequireDefault(require("./questionSet"));

var _switch = _interopRequireDefault(require("./custom/switch"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _progressBar = _interopRequireDefault(require("./custom/progressBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  background-color: #e7f2f9;\n  @media only screen and (max-width: ", "px) {\n    display: none;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: grid;\n  height: 100%;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    'header'\n    'body'\n    'footer';\n\n  .winterfell-question-sets {\n    min-height: calc(\n      ", "px - ", "px - ", " -\n        ", "px\n    );\n    @media only screen and (max-width: ", "px),\n      (min-width: ", "px) and (max-width: ", "px) {\n      min-height: calc(\n        ", "px - ", "px -\n          ", " -\n          ", "px\n      );\n    }\n\n    @media only screen and (min-width: ", "px) {\n      /* Move the suggestion panel up to fill the empty space */\n      min-height: calc(\n        ", "px - ", "px -\n          ", " - ", " -\n          ", "px\n      );\n    }\n  }\n\n  /* Add 10vh for the suggestion body because the height of the suggestion is moved up to 10vh  */\n  @media only screen and (min-width: ", "px) {\n    .question-panel-suggestion-body {\n      min-height: calc(", "px) !important;\n      overflow-y: unset !important;\n      height: auto !important;\n    }\n    .winterfell-suggestion-panel {\n      overflow-y: unset;\n    }\n  }\n\n  @media only screen and (max-width: ", "px) {\n    grid-template-rows: auto auto auto;\n    height: auto;\n\n    .winterfell-question-sets {\n      min-height: auto;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var constants = {
  headerHeight: 55,
  actionButtons: 50,
  progressBar: 30,
  buttonsBar: 80,
  mobileButtonsBarExtra: 60,
  suggestionContent: '20vh',
  verticalPadding: 40,
  footer: 31,
  suggestionHeader: 54,
  magicHeight: '8vh'
};
exports.constants = constants;
var breakpoint = {
  smallMobile: 450,
  mobile: 575,
  tablet: 767,
  widerThanTablet: 850,
  desktop: 1024,
  wideDesktop: 1200
};
exports.breakpoint = breakpoint;
var mediaQuery = {
  desktop: "min-width: ".concat(breakpoint.desktop, "px"),
  wideDesktop: "min-width: ".concat(breakpoint.wideDesktop, "px")
};
exports.mediaQuery = mediaQuery;
var gaps = constants.actionButtons + constants.progressBar + constants.buttonsBar + constants.verticalPadding + constants.footer;

var QuestionPanelStyleComponent = _styledComponents["default"].div.attrs({
  'data-id': 'winterfell-question-panel'
})(_templateObject(), function (_ref) {
  var windowHeight = _ref.windowHeight;
  return windowHeight;
}, gaps, constants.suggestionContent, function (_ref2) {
  var suggestionHeaderHeight = _ref2.suggestionHeaderHeight;
  return suggestionHeaderHeight;
}, breakpoint.smallMobile, breakpoint.tablet + 1, breakpoint.wideDesktop + 1, function (_ref3) {
  var windowHeight = _ref3.windowHeight;
  return windowHeight;
}, gaps + constants.mobileButtonsBarExtra, constants.suggestionContent, function (_ref4) {
  var suggestionHeaderHeight = _ref4.suggestionHeaderHeight;
  return suggestionHeaderHeight;
}, breakpoint.wideDesktop + 1, function (_ref5) {
  var windowHeight = _ref5.windowHeight;
  return windowHeight;
}, gaps + constants.mobileButtonsBarExtra, constants.suggestionContent, constants.magicHeight, function (_ref6) {
  var suggestionHeaderHeight = _ref6.suggestionHeaderHeight;
  return suggestionHeaderHeight;
}, breakpoint.wideDesktop + 1, function (_ref7) {
  var windowHeight = _ref7.windowHeight;
  return windowHeight / 4;
}, breakpoint.widerThanTablet);

var SuggesstionWrapper = _styledComponents["default"].div.attrs({
  'data-id': 'winterfell-suggestion-wrapper'
})(_templateObject2(), breakpoint.widerThanTablet + 1);

var QuestionPanel = /*#__PURE__*/function (_React$Component) {
  _inherits(QuestionPanel, _React$Component);

  var _super = _createSuper(QuestionPanel);

  function QuestionPanel(props) {
    var _this;

    _classCallCheck(this, QuestionPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleAnswerValidate", function (questionId, questionAnswer, validations) {
      if (typeof validations === 'undefined' || validations.length === 0) {
        return;
      }
      /*
       * Run the question through its validations and
       * show any error messages if invalid.
       */


      var questionValidationErrors = [];
      validations.forEach(function (validation) {
        if (_validation["default"].validateAnswer(questionAnswer.value, validation, _this.props.questionAnswers)) {
          return;
        }

        questionValidationErrors.push({
          type: validation.type,
          message: _errors["default"].getErrorMessage(validation)
        });
      });

      var validationErrors = _lodash["default"].chain(_this.state.validationErrors).set(questionId, questionValidationErrors).value();

      _this.setState({
        validationErrors: validationErrors
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMainButtonClick", function () {
      var action = _this.props.action["default"];
      var conditions = _this.props.action.conditions || [];
      /*
       * We need to get all the question sets for this panel.
       * Collate a list of the question set IDs required
       * and run through the schema to grab the question sets.
       */

      var questionSetIds = _this.props.questionSets.map(function (qS) {
        return qS.questionSetId;
      });

      var questionSets = _lodash["default"].chain(_this.props.schema.questionSets).filter(function (qS) {
        return questionSetIds.indexOf(qS.questionSetId) > -1;
      }).value();
      /*
       * Get any incorrect fields that need error messages.
       */


      var invalidQuestions = _validation["default"].getQuestionPanelInvalidQuestions(questionSets, _this.props.questionAnswers);
      /*
       * If the panel isn't valid...
       */


      if (Object.keys(invalidQuestions).length > 0) {
        var validationErrors = _lodash["default"].mapValues(invalidQuestions, function (validations) {
          return validations.map(function (validation) {
            return {
              type: validation.type,
              message: _errors["default"].getErrorMessage(validation)
            };
          });
        });

        _this.setState({
          validationErrors: validationErrors
        });

        return;
      }
      /*
       * Panel is valid. So what do we do next?
       * Check our conditions and act upon them, or the default.
       */


      conditions.forEach(function (condition) {
        var answerObject = _this.props.questionAnswers[condition.questionId];

        if (answerObject) {
          var answer = answerObject.value;
          action = answer == condition.value ? {
            action: condition.action,
            target: condition.target
          } : action;
        }
      });
      /*
       * Decide which action to take depending on
       * the action decided upon.
       */

      switch (action.action) {
        case 'GOTO':
          _this.props.onSwitchPanel(action.target);

          break;

        case 'SUBMIT':
          _this.props.onSubmit(action.target);

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackButtonClick", function () {
      _this.props.onPanelBack();
    });

    _defineProperty(_assertThisInitialized(_this), "handleAnswerChange", function (questionId, questionAnswer, questionLabel, validations, validateOn) {
      _this.props.onAnswerChange(questionId, questionAnswer, questionLabel);

      _this.setState({
        validationErrors: _lodash["default"].chain(_this.state.validationErrors).set(questionId, []).value()
      });

      if (validateOn === 'change') {
        _this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleQuestionBlur", function (questionId, questionAnswer, validations, validateOn) {
      if (validateOn === 'blur') {
        _this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputKeyDown", function (e) {
      if (_keycodez["default"][e.keyCode] === 'enter') {
        e.preventDefault();

        _this.handleMainButtonClick.call(_assertThisInitialized(_this));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getProgressBarInfo", function () {
      var completionPercent = 0;
      var progressBarText = '';
      var progress = _this.props.progress;

      if (progress) {
        if (!progress.variation || progress.variation === 'classic') {
          completionPercent = Math.floor(100 / _this.props.numPanels * _this.props.currentPanelIndex);
        } else if (progress.variation === 'only-completed' && _this.props.questionAnswers) {
          var questionSetsCompleted = _this.props.schema.questionSets.reduce(function (acc, qs) {
            return acc.concat(qs.questions.map(function (q) {
              return {
                questionId: q.questionId,
                answered: !!_this.props.questionAnswers[q.questionId]
              };
            }));
          }, []);

          var nQuestionsCompleted = questionSetsCompleted.filter(function (e) {
            return e.answered;
          }).length;
          var nQuestionsTotal = questionSetsCompleted.length;
          completionPercent = Math.floor(100 / nQuestionsTotal * nQuestionsCompleted);
        }

        progressBarText = "".concat(progress.preText || '').concat(completionPercent, "%").concat(progress.postText || '');
      }

      return {
        text: progressBarText,
        progress: completionPercent
      };
    });

    _this.state = {
      validationErrors: _this.props.validationErrors,
      currentQuestion: null,
      prefillQuestion: undefined
    };
    _this.suggestionHeaderRef = /*#__PURE__*/(0, _react.createRef)();
    return _this;
  }

  _createClass(QuestionPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newprops) {
      if (newprops.currentQuestionId) {
        var currentQuestion = this.props.questionAnswers ? this.props.questionAnswers[newprops.currentQuestionId] : null;
        if (!currentQuestion) return;
        this.setState({
          currentQuestion: currentQuestion
        });
      } else {
        this.setState({
          currentQuestion: null
        });
      }
      /* Check prefill questions status */


      if (newprops.currentQuestionsOnPanel) {
        var prefillQuestion = _lodash["default"].find(newprops.currentQuestionsOnPanel, function (item) {
          return item.label && item.enablePrefilledAnswer;
        });

        if (!prefillQuestion) {
          prefillQuestion = _lodash["default"].find(newprops.currentQuestionsOnPanel, function (item) {
            return item.label;
          });
        }

        this.setState({
          prefillQuestion: prefillQuestion
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$getProgressBarI = this.getProgressBarInfo(),
          completionPercent = _this$getProgressBarI.progress,
          progressText = _this$getProgressBarI.text;

      var questionSets = this.props.questionSets.map(function (questionSetMeta) {
        var questionSet = _lodash["default"].find(_this2.props.schema.questionSets, {
          questionSetId: questionSetMeta.questionSetId
        });

        if (!questionSet) {
          return undefined;
        }

        return /*#__PURE__*/_react["default"].createElement(_questionSet["default"], {
          key: questionSet.questionSetId,
          id: questionSet.questionSetId,
          name: questionSet.name,
          questionSetHeader: questionSet.questionSetHeader,
          questionSetText: questionSet.questionSetText,
          questions: questionSet.questions,
          classes: _this2.props.classes,
          questionAnswers: _this2.props.questionAnswers,
          labeledAnswers: _this2.props.labeledAnswers,
          renderError: _this2.props.renderError,
          renderRequiredAsterisk: _this2.props.renderRequiredAsterisk,
          validationErrors: _this2.state.validationErrors,
          panelConstants: _this2.props.panelConstants,
          onAnswerChange: _this2.handleAnswerChange,
          onQuestionBlur: _this2.handleQuestionBlur,
          onFocus: _this2.props.onFocus,
          onKeyDown: _this2.handleInputKeyDown,
          onClickInputIcon: _this2.props.onClickInputIcon,
          onQuestionMounted: _this2.props.onQuestionMounted
        });
      });
      /* Append suggestion section to the form builder */

      var suggestionSets = this.props.questionSets.map(function (questionSetMeta) {
        var questionSet = _lodash["default"].find(_this2.props.schema.questionSets, {
          questionSetId: questionSetMeta.questionSetId
        });

        if (!questionSet) {
          return undefined;
        }

        var SuggestionSet = _this2.props.answersSuggestionComponent;
        return /*#__PURE__*/_react["default"].createElement(SuggestionSet, {
          questions: questionSet.questions,
          classes: _this2.props.classes,
          suggestionPanel: _this2.props.suggestionPanel,
          panelConstants: _this2.props.panelConstants,
          questionAnswers: _this2.props.questionAnswers,
          onAnswerChange: _this2.props.onAnswerChange,
          defaultSuggestions: _this2.props.defaultSuggestions,
          headerRef: _this2.suggestionHeaderRef
        });
      });
      return /*#__PURE__*/_react["default"].createElement(QuestionPanelStyleComponent, {
        windowHeight: this.props.windowHeight,
        suggestionHeaderHeight: this.suggestionHeaderRef.current ? this.suggestionHeaderRef.current.clientHeight : constants.suggestionHeader
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-header"
      }, this.props.panelAcions, /*#__PURE__*/_react["default"].createElement(_progressBar["default"], {
        progress: completionPercent,
        text: progressText
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-body"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.questionSets
      }, questionSets), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-body-footer"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.classes.buttonBar, " ").concat(this.props.extraClasses.buttonBar || '')
      }, this.props.currentPanelIndex > 0 && !this.props.backButton.disabled ? /*#__PURE__*/_react["default"].createElement(_button["default"], {
        text: this.props.backButton.text || 'Back',
        onClick: this.handleBackButtonClick,
        className: "".concat(this.props.classes.backButton, " ").concat(this.props.extraClasses.backButton || '')
      }) : undefined, !this.props.button.disabled ? /*#__PURE__*/_react["default"].createElement(_button["default"], {
        text: this.props.button.text,
        onClick: this.handleMainButtonClick,
        className: "".concat(this.props.classes.controlButton, " ").concat(this.props.extraClasses.button || '')
      }) : undefined), /*#__PURE__*/_react["default"].createElement(SuggesstionWrapper, null, suggestionSets))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-footer"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "prefill-action-bar"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: "prefill-action-bar-icon",
        src: "https://assets.lawpath.com/images/svg/editor/builder.svg"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "prefill-action-bar-text"
      }, "Use pre-fill information"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "prefill-action-bar-action"
      }, this.state.prefillQuestion ? /*#__PURE__*/_react["default"].createElement(_switch["default"], {
        active: this.state.prefillQuestion.enablePrefilledAnswer,
        onChange: function onChange(status) {
          return _this2.props.onEnablePrefilledAnswer(status);
        },
        disabled: !this.state.prefillQuestion.label
      }) : /*#__PURE__*/_react["default"].createElement(_switch["default"], {
        active: false,
        disabled: true
      })))));
    }
  }]);

  return QuestionPanel;
}(_react["default"].Component);

exports["default"] = QuestionPanel;
QuestionPanel.defaultProps = {
  validationErrors: {},
  schema: {},
  classes: {},
  extraClasses: {},
  panelId: undefined,
  panelIndex: undefined,
  panelHeader: undefined,
  panelAcions: undefined,
  panelConstants: undefined,
  panelText: undefined,
  progress: undefined,
  numPanels: undefined,
  currentPanelIndex: undefined,
  labeledAnswers: [],
  action: {
    "default": {},
    conditions: []
  },
  button: {
    text: 'Submit'
  },
  backButton: {
    text: 'Back'
  },
  questionSets: [],
  questionAnswers: {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  currentQuestionId: undefined,
  windowHeight: 0,
  currentQuestionsOnPanel: {},
  onAnswerChange: function onAnswerChange() {},
  onSwitchPanel: function onSwitchPanel() {},
  onPanelBack: function onPanelBack() {},
  onFocus: function onFocus() {},
  onClickInputIcon: function onClickInputIcon() {},
  onQuestionMounted: function onQuestionMounted() {},
  onEnablePrefilledAnswer: function onEnablePrefilledAnswer() {}
};