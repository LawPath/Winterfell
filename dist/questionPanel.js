"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _keycodez = _interopRequireDefault(require("keycodez"));

var _validation = _interopRequireDefault(require("./lib/validation"));

var _errors = _interopRequireDefault(require("./lib/errors"));

var _button = _interopRequireDefault(require("./button"));

var _questionSet = _interopRequireDefault(require("./questionSet"));

var _SuggestionSet = _interopRequireDefault(require("./SuggestionSet"));

var _switch = _interopRequireDefault(require("./custom/switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var QuestionPanel = /*#__PURE__*/function (_React$Component) {
  _inherits(QuestionPanel, _React$Component);

  var _super = _createSuper(QuestionPanel);

  function QuestionPanel(props) {
    var _this;

    _classCallCheck(this, QuestionPanel);

    _this = _super.call(this, props);
    _this.state = {
      validationErrors: _this.props.validationErrors,
      currentQuestion: null
    };
    return _this;
  }

  _createClass(QuestionPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newprops) {
      if (newprops.currentQuestionId) {
        console.log('This is the state of the information before: ', newprops);
        var currentQuestion = this.props.questionAnswers ? this.props.questionAnswers[newprops.currentQuestionId] : null;
        if (!currentQuestion) return;
        console.log('This is the state of the information: ', newprops, newprops.currentQuestionId, currentQuestion.enablePrefilledAnswer, currentQuestion);
        this.setState({
          currentQuestion: currentQuestion
        });
      }
    }
  }, {
    key: "handleAnswerValidate",
    value: function handleAnswerValidate(questionId, questionAnswer, validations) {
      var _this2 = this;

      if (typeof validations === 'undefined' || validations.length === 0) {
        return;
      }
      /*
       * Run the question through its validations and
       * show any error messages if invalid.
       */


      var questionValidationErrors = [];
      validations.forEach(function (validation) {
        if (_validation["default"].validateAnswer(questionAnswer.value, validation, _this2.props.questionAnswers)) {
          return;
        }

        questionValidationErrors.push({
          type: validation.type,
          message: _errors["default"].getErrorMessage(validation)
        });
      });

      var validationErrors = _lodash["default"].chain(this.state.validationErrors).set(questionId, questionValidationErrors).value();

      this.setState({
        validationErrors: validationErrors
      });
    }
  }, {
    key: "handleMainButtonClick",
    value: function handleMainButtonClick() {
      var _this3 = this;

      var action = this.props.action["default"];
      var conditions = this.props.action.conditions || [];
      /*
       * We need to get all the question sets for this panel.
       * Collate a list of the question set IDs required
       * and run through the schema to grab the question sets.
       */

      var questionSetIds = this.props.questionSets.map(function (qS) {
        return qS.questionSetId;
      });

      var questionSets = _lodash["default"].chain(this.props.schema.questionSets).filter(function (qS) {
        return questionSetIds.indexOf(qS.questionSetId) > -1;
      }).value();
      /*
       * Get any incorrect fields that need error messages.
       */


      var invalidQuestions = _validation["default"].getQuestionPanelInvalidQuestions(questionSets, this.props.questionAnswers);
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

        this.setState({
          validationErrors: validationErrors
        });
        return;
      }
      /*
       * Panel is valid. So what do we do next?
       * Check our conditions and act upon them, or the default.
       */


      conditions.forEach(function (condition) {
        var answerObject = _this3.props.questionAnswers[condition.questionId];
        var answer = answerObject.value;
        action = answer == condition.value ? {
          action: condition.action,
          target: condition.target
        } : action;
      });
      /*
       * Decide which action to take depending on
       * the action decided upon.
       */

      switch (action.action) {
        case 'GOTO':
          this.props.onSwitchPanel(action.target);
          break;

        case 'SUBMIT':
          this.props.onSubmit(action.target);
          break;
      }
    }
  }, {
    key: "handleBackButtonClick",
    value: function handleBackButtonClick() {
      this.props.onPanelBack();
    }
  }, {
    key: "handleAnswerChange",
    value: function handleAnswerChange(questionId, questionAnswer, questionLabel, validations, validateOn) {
      this.props.onAnswerChange(questionId, questionAnswer, questionLabel);
      this.setState({
        validationErrors: _lodash["default"].chain(this.state.validationErrors).set(questionId, []).value()
      });

      if (validateOn === 'change') {
        this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    }
  }, {
    key: "handleQuestionBlur",
    value: function handleQuestionBlur(questionId, questionAnswer, validations, validateOn) {
      if (validateOn === 'blur') {
        this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    }
  }, {
    key: "handleInputKeyDown",
    value: function handleInputKeyDown(e) {
      if (_keycodez["default"][e.keyCode] === 'enter') {
        e.preventDefault();
        this.handleMainButtonClick.call(this);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var questionSets = this.props.questionSets.map(function (questionSetMeta) {
        var questionSet = _lodash["default"].find(_this4.props.schema.questionSets, {
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
          classes: _this4.props.classes,
          questionAnswers: _this4.props.questionAnswers,
          labeledAnswers: _this4.props.labeledAnswers,
          renderError: _this4.props.renderError,
          renderRequiredAsterisk: _this4.props.renderRequiredAsterisk,
          validationErrors: _this4.state.validationErrors,
          panelConstants: _this4.props.panelConstants,
          onAnswerChange: _this4.handleAnswerChange.bind(_this4),
          onQuestionBlur: _this4.handleQuestionBlur.bind(_this4),
          onFocus: _this4.props.onFocus,
          onKeyDown: _this4.handleInputKeyDown.bind(_this4),
          onClickInputIcon: _this4.props.onClickInputIcon,
          onQuestionMounted: _this4.props.onQuestionMounted
        });
      });
      var suggestionSets = this.props.questionSets.map(function (questionSetMeta) {
        var questionSet = _lodash["default"].find(_this4.props.schema.questionSets, {
          questionSetId: questionSetMeta.questionSetId
        });

        if (!questionSet) {
          return undefined;
        }

        return /*#__PURE__*/_react["default"].createElement(_SuggestionSet["default"], {
          key: questionSet.questionSetId,
          id: questionSet.questionSetId,
          name: questionSet.name,
          questions: questionSet.questions,
          classes: _this4.props.classes,
          suggestionPanel: _this4.props.suggestionPanel,
          questionAnswers: _this4.props.questionAnswers,
          onAnswerChange: _this4.props.onAnswerChange,
          defaultSuggestions: _this4.props.defaultSuggestions
        });
      });
      var completionPercent = 0;

      if (typeof this.props.progress !== 'undefined') {
        if (!this.props.progress.variation || this.props.progress.variation === 'classic') {
          completionPercent = Math.floor(100 / this.props.numPanels * this.props.currentPanelIndex);
        } else if (this.props.progress.variation === 'only-completed' && this.props.questionAnswers) {
          var questionSetsCompleted = this.props.schema.questionSets.reduce(function (acc, qs) {
            return acc.concat(qs.questions.map(function (q) {
              return {
                questionId: q.questionId,
                answered: !!_this4.props.questionAnswers[q.questionId]
              };
            }));
          }, []);
          var nQuestionsCompleted = questionSetsCompleted.filter(function (e) {
            return e.answered;
          }).length;
          var nQuestionsTotal = questionSetsCompleted.length;
          completionPercent = Math.floor(100 / nQuestionsTotal * nQuestionsCompleted);
        }
      }

      var progressBar = undefined;

      if (typeof this.props.progress !== 'undefined' && this.props.progress.showBar) {
        progressBar = /*#__PURE__*/_react["default"].createElement("div", {
          className: this.props.classes.progressBar
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: this.props.classes.progressBarIncomplete
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: this.props.classes.progressBarComplete,
          style: {
            width: "".concat(completionPercent, "%")
          }
        }, this.props.progress.showPercent ? "".concat(this.props.progress.postText ? this.props.progress.postText : '').concat(completionPercent, "%").concat(this.props.progress.postText ? this.props.progress.postText : '') : '')));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.questionPanel
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-header"
      }, this.props.panelAcions, this.props.progress && this.props.progress.position === 'top' ? progressBar : undefined), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-body"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.questionSets
      }, questionSets), this.props.progress && this.props.progress.position === 'middle' ? progressBar : undefined, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.classes.buttonBar, " ").concat(this.props.extraClasses.buttonBar || '')
      }, this.props.currentPanelIndex > 0 && !this.props.backButton.disabled ? /*#__PURE__*/_react["default"].createElement(_button["default"], {
        text: this.props.backButton.text || 'Back',
        onClick: this.handleBackButtonClick.bind(this),
        className: "".concat(this.props.classes.backButton, " ").concat(this.props.extraClasses.backButton || '')
      }) : undefined, !this.props.button.disabled ? /*#__PURE__*/_react["default"].createElement(_button["default"], {
        text: this.props.button.text,
        onClick: this.handleMainButtonClick.bind(this),
        className: "".concat(this.props.classes.controlButton, " ").concat(this.props.extraClasses.button || '')
      }) : undefined)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-post-body-header"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.postBodyHeader
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: this.props.classes.postBodyHeaderIcon,
        src: this.props.panelConstants.titleIcon
      }), /*#__PURE__*/_react["default"].createElement("span", {
        "class": this.props.classes.postBodyHeaderText
      }, this.props.panelConstants.postBodyHeaderText))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-panel-post-body"
      }, suggestionSets), /*#__PURE__*/_react["default"].createElement("div", {
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
      }, this.state.currentQuestion ? /*#__PURE__*/_react["default"].createElement(_switch["default"], {
        active: this.state.currentQuestion.enablePrefilledAnswer,
        onChange: this.props.onEnablePrefilledAnswer,
        disabled: !this.state.currentQuestion || this.state.currentQuestion && !this.state.currentQuestion.label
      }) : null))), this.props.progress && this.props.progress.position === 'bottom' ? progressBar : undefined);
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
  onAnswerChange: function onAnswerChange() {},
  onSwitchPanel: function onSwitchPanel() {},
  onPanelBack: function onPanelBack() {},
  onFocus: function onFocus() {},
  onClickInputIcon: function onClickInputIcon() {},
  onQuestionMounted: function onQuestionMounted() {},
  onEnablePrefilledAnswer: function onEnablePrefilledAnswer() {}
};