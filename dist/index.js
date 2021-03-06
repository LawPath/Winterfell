"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.QUESTION_INPUT_TYPES = exports.Winterfell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _inputTypes = _interopRequireDefault(require("./inputTypes"));

var _errors = _interopRequireDefault(require("./lib/errors"));

var _validation = _interopRequireDefault(require("./lib/validation"));

var _questionPanel = _interopRequireDefault(require("./questionPanel"));

var _questionAnswers = require("./lib/questionAnswers");

var _index = require("./inputTypes/index.js");

var _Winterfell$defaultPr;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var Winterfell = /*#__PURE__*/function (_Component) {
  _inherits(Winterfell, _Component);

  var _super = _createSuper(Winterfell);

  function Winterfell(props) {
    var _this;

    _classCallCheck(this, Winterfell);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleAnswerChange", function (questionId, questionAnswer, questionLabel) {
      var currentAnswer = _lodash["default"].get(_this.state.questionAnswers, [questionId]);

      var mergedData = _objectSpread(_objectSpread({}, currentAnswer), {}, {
        value: questionAnswer,
        label: questionLabel
      });

      if (mergedData && mergedData.enablePrefilledAnswer && mergedData.value !== mergedData.prefilledData) {
        /* If user edit the prefill data, we will toggle out the prefill toggle */
        mergedData.enablePrefilledAnswer = false;
      }

      var questionAnswers = _lodash["default"].set(_this.state.questionAnswers, questionId, mergedData);

      _this.setState({
        questionAnswers: questionAnswers
      });

      _this.props.onUpdate(questionAnswers);
    });

    _defineProperty(_assertThisInitialized(_this), "onQuestionMounted", function (questionId, label) {
      var currentQuestionAnswers = _this.state.questionAnswers;

      if (label) {
        var prefillData = (0, _questionAnswers.getPrefillData)(_this.props.labeledAnswers, label);

        var currentQuestion = _lodash["default"].get(_this.state.questionAnswers, questionId);

        if (currentQuestion === null || currentQuestion === undefined) {
          if (prefillData) {
            console.log('Set prefill data: answer is empty and have prefill data');

            _lodash["default"].set(currentQuestionAnswers, questionId, {
              label: label,
              enablePrefilledAnswer: true,
              value: prefillData,
              prefilledData: prefillData
            });
          } else {
            console.log('Set prefill data: answer is empty and no prefill data ', _this.props.labeledAnswers);

            _lodash["default"].set(currentQuestionAnswers, questionId, {
              label: label,
              enablePrefilledAnswer: false,
              prefilledData: prefillData
            });
          }
        } else {
          /* Get the enable prefill toggle variable*/
          var enablePrefilledAnswer = _lodash["default"].get(_this.state.questionAnswers, [questionId, 'enablePrefilledAnswer']);

          var mergedData;

          if (!enablePrefilledAnswer) {
            mergedData = _objectSpread(_objectSpread({}, _lodash["default"].get(_this.state.questionAnswers, [questionId])), {}, {
              label: label,
              prefilledData: prefillData
            });
            console.log('Set prefill data: answer is existed and prefillMode is disable ', mergedData);
          } else {
            mergedData = _objectSpread(_objectSpread({}, _lodash["default"].get(_this.state.questionAnswers, [questionId])), {}, {
              label: label,
              enablePrefilledAnswer: true,
              prefilledData: prefillData
            });
            console.log('Set prefill data: answer is existed and prefillMode is enable ', mergedData);
          }

          if (mergedData.value && mergedData.enablePrefilledAnswer && !_lodash["default"].isEqual(mergedData.value, mergedData.prefilledData)) {
            console.log('Set prefill data: have prefilled data and data is overriden by user');
            mergedData.enablePrefilledAnswer = false;
          } else if (!mergedData.value && mergedData.enablePrefilledAnswer) {
            console.log('Set prefill data: prefillMode is enable and prefilledData will override the user-input data ');
            mergedData.value = mergedData.prefilledData;
          }

          _lodash["default"].set(currentQuestionAnswers, [questionId], _objectSpread({}, mergedData));
        }
      } else {
        var _mergedData = _objectSpread(_objectSpread({}, _lodash["default"].get(_this.state.questionAnswers, [questionId])), {}, {
          label: null,
          enablePrefilledAnswer: false
        });

        _lodash["default"].set(currentQuestionAnswers, [questionId], _objectSpread({}, _mergedData));
      }
      /* Add mounted question to the questions in the panel  */


      var newCurrentQuestions = _this.state.currentQuestions;
      newCurrentQuestions[questionId] = currentQuestionAnswers[questionId];

      _this.setState({
        questionAnswers: currentQuestionAnswers,
        currentQuestionId: questionId,
        currentQuestions: newCurrentQuestions
      });

      _this.props.onRender({
        questionAnswers: currentQuestionAnswers,
        questionId: questionId,
        currentQuestionAnswers: currentQuestionAnswers,
        currentPanel: _this.state.currentPanel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnEnablePrefilledAnswer", function (enable) {
      var questionAnswers = _objectSpread({}, _this.state.questionAnswers);

      _lodash["default"].forEach(_this.state.currentQuestions, function (value, key) {
        if (value && value.label) {
          var mergedData = _objectSpread(_objectSpread({}, _lodash["default"].get(questionAnswers, [key])), {}, {
            enablePrefilledAnswer: enable
          });

          if (mergedData.enablePrefilledAnswer) {
            /* if the prefill-value is enabled, we will replace the inputed text  */
            mergedData.value = mergedData.prefilledData;
          }

          questionAnswers = _lodash["default"].chain(questionAnswers).set(key, mergedData).value();
        }
      });

      if (questionAnswers) {
        _this.setState({
          questionAnswers: questionAnswers
        });

        _this.props.onUpdate(questionAnswers);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSwitchPanel", function (panelId, preventHistory) {
      var panel = _lodash["default"].find(_this.props.schema.formPanels, {
        panelId: panelId
      });

      if (!panel) {
        throw new Error('Winterfell: Tried to switch to panel "' + panelId + '", which does not exist.');
      }

      if (!preventHistory) {
        _this.panelHistory.push(panel.panelId);
      }

      if (panel && panel.panelId === 'final-panel') {
        /* The final panel does not contain any question */
        _this.setState({
          currentQuestionId: undefined
        });
      }
      /* Clear questions on panel */


      _this.setState({
        currentPanel: panel,
        conditionalQuestionId: undefined,
        currentQuestions: {}
      });

      _this.props.onSwitchPanel(panel);
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackButtonClick", function () {
      if (_this.panelHistory.length > 1) {
        _this.panelHistory.pop();
      }
      /* Clear questions on panel */


      _this.setState({
        currentQuestions: {}
      });

      _this.handleSwitchPanel.call(_assertThisInitialized(_this), _this.panelHistory[_this.panelHistory.length - 1], true); // let panelIndex = this.state.schema.formPanels.find(fp =>
      //   fp.panelId === this.state.currentPanel.panelId).index;
      // let newPanelIndex = panelIndex > 0 ? this.state.schema.formPanels.find(fp =>
      //   fp.index === panelIndex - 1) : null;
      //
      // console.log("this.state.schema.formPanels", JSON.stringify(this.state.schema.formPanels));
      // console.log("panelIndex", JSON.stringify(panelIndex));
      // console.log("newPanelIndex", JSON.stringify(newPanelIndex));
      //
      // this.handleSwitchPanel.call(
      //   this, newPanelIndex ? newPanelIndex.panelId : 0
      // );

    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (action) {
      if (_this.props.disableSubmit) {
        _this.props.onSubmit(_this.state.questionAnswers, action);

        return;
      }
      /*
       * If we are not disabling the functionality of the form,
       * we need to set the action provided in the form, then submit.
       */


      _this.setState({
        action: action
      }, function () {
        if (!_this.formComponent) {
          return;
        }

        _this.formComponent.submit();
      });
    });

    _this.formComponent = null;
    _this.panelHistory = [];

    var schema = _lodash["default"].extend({
      classes: {},
      formPanels: [],
      questionPanels: [],
      questionSets: []
    }, props.schema);

    schema.formPanels = schema.formPanels.sort(function (a, b) {
      return a.index - b.index;
    });

    var _panelId = typeof props.panelId !== 'undefined' ? props.panelId : schema.formPanels.length > 0 ? schema.formPanels[0].panelId : undefined;

    var currentPanel = typeof schema !== 'undefined' && typeof schema.formPanels !== 'undefined' && typeof _panelId !== 'undefined' ? _lodash["default"].find(schema.formPanels, function (panel) {
      return panel.panelId == _panelId;
    }) : undefined;

    _this.panelHistory.push(currentPanel.panelId);

    if (!currentPanel) {
      throw new Error('Winterfell: Could not find initial panel and failed to render.');
    }

    _this.state = {
      schema: schema,
      currentPanel: currentPanel,
      action: props.action,
      questionAnswers: props.questionAnswers,
      panelMoved: false,
      currentQuestionId: undefined,
      currentQuestions: {}
    };
    return _this;
  }

  _createClass(Winterfell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onRender();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var s = nextProps.schema;
      var newState = {
        action: nextProps.action,
        schema: s,
        questionAnswers: nextProps.questionAnswers
      };

      if (nextProps.currentQuestionId) {
        var questionPanels = s.questionSets.map(function (qs) {
          return qs.questions.map(function (q2) {
            return {
              questionId: q2.questionId,
              panel: s.formPanels.find(function (p1) {
                return s.questionPanels.find(function (p2) {
                  return p2.questionSets.find(function (pqs) {
                    return pqs.questionSetId === qs.questionSetId;
                  });
                }).panelId === p1.panelId;
              })
            };
          });
        }).reduce(function (acc, el) {
          return acc.concat(el);
        }, []);
        var questionPanel = questionPanels.find(function (qs) {
          if (nextProps.currentQuestionId === qs.questionId) {
            return qs.panel;
          }
        });

        if (!questionPanel) {
          var conditionalQuestions = [];
          var questionsIdWithConditionals = s.questionSets.filter(function (f) {
            return f.questions.length;
          }).filter(function (g) {
            return g.questions[0].input.options && g.questions[0].input.options.filter(function (q2) {
              return q2.conditionalQuestions;
            }).length;
          }).map(function (e) {
            return e.questions[0];
          }).map(function (e) {
            return {
              questionId: e.questionId,
              conditionalQuestionId: e.input.options.filter(function (f) {
                return f.conditionalQuestions;
              })[0].conditionalQuestions[0].questionId
            };
          });
          questionPanel = questionPanels.find(function (qs) {
            var conditionalQuestion = questionsIdWithConditionals.find(function (e) {
              return e.conditionalQuestionId === nextProps.currentQuestionId;
            });

            if (conditionalQuestion && conditionalQuestion.questionId == qs.questionId) {
              return qs.panel;
            }
          });
        }

        if (questionPanel && this.state.currentPanel.panelId !== questionPanel.panel.panelId) {
          newState.currentPanel = questionPanel.panel;
          this.panelHistory.push(questionPanel.panel.panelId);
          newState.currentQuestionId = nextProps.currentQuestionId;
          this.props.onFocus(nextProps.currentQuestionId);
        }
      }

      if (!_lodash["default"].isEqual(this.props.labeledAnswers, nextProps.labeledAnswers)) {
        /* Update the the labeledAswers when they got updated from parent*/
        _lodash["default"].forEach(nextProps.questionAnswers, function (value, key) {
          var mergedData;
          var prefillData = (0, _questionAnswers.getPrefillData)(nextProps.labeledAnswers, value.label);

          if (value.enablePrefilledAnswer) {
            /* if the prefillData toggle is enabled, it will replace the input data */

            /* if the current data is empty, it will set the prefill value */
            mergedData = _objectSpread(_objectSpread({}, value), {}, {
              value: prefillData,
              prefilledData: prefillData
            });
          } else if (!value.enablePrefilledAnswer && prefillData && _lodash["default"].isEmpty(value.prefilledData)) {
            /* if the current data is empty and there is prefill data, we will enable prefill data and set the value to the answer */
            mergedData = _objectSpread(_objectSpread({}, value), {}, {
              enablePrefilledAnswer: true,
              value: prefillData,
              prefilledData: prefillData
            });
          } else if (!_lodash["default"].isEqual(prefillData, value.prefilledData)) {
            /* Update prefill data only */
            mergedData = _objectSpread(_objectSpread({}, value), {}, {
              prefilledData: prefillData
            });
          }

          if (mergedData) {
            _lodash["default"].set(newState.questionAnswers, [key], _objectSpread({}, mergedData));
          }
        });
      }

      this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentPanel = _lodash["default"].find(this.state.schema.questionPanels, function (panel) {
        return panel.panelId == _this2.state.currentPanel.panelId;
      });

      var numPanels = this.state.schema.questionPanels.length;
      var currentPanelIndex = _lodash["default"].indexOf(this.state.schema.questionPanels, currentPanel) + 1;
      return /*#__PURE__*/_react["default"].createElement("form", {
        method: this.props.method,
        encType: this.props.encType,
        action: this.state.action,
        ref: function ref(_ref) {
          return _this2.formComponent = _ref;
        },
        className: this.state.schema.classes.form
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.state.schema.classes.questionPanels
      }, /*#__PURE__*/_react["default"].createElement(_questionPanel["default"], {
        schema: this.state.schema,
        classes: this.state.schema.classes,
        panelConstants: this.state.schema.panelConstants,
        defaultSuggestions: this.state.schema.defaultSuggestions,
        suggestionPanel: this.state.schema.suggestionPanel,
        panelId: currentPanel.panelId,
        panelIndex: currentPanel.panelIndex,
        panelHeader: currentPanel.panelHeader,
        panelText: currentPanel.panelText,
        action: currentPanel.action,
        button: currentPanel.button,
        backButton: currentPanel.backButton,
        extraClasses: currentPanel.classes,
        questionSets: currentPanel.questionSets,
        progress: currentPanel.progress,
        numPanels: numPanels,
        currentPanelIndex: currentPanelIndex,
        questionAnswers: this.state.questionAnswers,
        renderError: this.props.renderError,
        renderRequiredAsterisk: this.props.renderRequiredAsterisk,
        onAnswerChange: this.handleAnswerChange.bind(this),
        onFocus: this.props.onFocus,
        onPanelBack: this.handleBackButtonClick.bind(this),
        onSwitchPanel: this.handleSwitchPanel.bind(this),
        onSubmit: this.handleSubmit.bind(this),
        onClickInputIcon: this.props.onClickInputIcon,
        panelAcions: this.props.extraComponent,
        onQuestionMounted: this.onQuestionMounted.bind(this),
        labeledAnswers: this.props.labeledAnswers,
        currentQuestionId: this.state.currentQuestionId,
        onEnablePrefilledAnswer: this.handleOnEnablePrefilledAnswer.bind(this),
        answersSuggestionComponent: this.props.answersSuggestionComponent,
        windowHeight: this.props.windowHeight,
        currentQuestionsOnPanel: this.state.currentQuestions
      })));
    }
  }]);

  return Winterfell;
}(_react.Component);

exports.Winterfell = Winterfell;
Winterfell.inputTypes = _inputTypes["default"];
Winterfell.errorMessages = _errors["default"];
Winterfell.validation = _validation["default"];
Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;
Winterfell.addErrorMessage = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;
Winterfell.addValidationMethod = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;
Winterfell.defaultProps = (_Winterfell$defaultPr = {
  questionAnswers: {},
  encType: 'application/x-www-form-urlencoded',
  method: 'POST',
  action: '',
  panelId: undefined,
  disableSubmit: false,
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  currentQuestionId: undefined,
  panelConstants: undefined
}, _defineProperty(_Winterfell$defaultPr, "questionAnswers", undefined), _defineProperty(_Winterfell$defaultPr, "answersSuggestionComponent", undefined), _defineProperty(_Winterfell$defaultPr, "labeledAnswers", []), _defineProperty(_Winterfell$defaultPr, "windowHeight", 0), _defineProperty(_Winterfell$defaultPr, "onSubmit", function onSubmit() {}), _defineProperty(_Winterfell$defaultPr, "onUpdate", function onUpdate() {}), _defineProperty(_Winterfell$defaultPr, "onFocus", function onFocus() {}), _defineProperty(_Winterfell$defaultPr, "onSwitchPanel", function onSwitchPanel() {}), _defineProperty(_Winterfell$defaultPr, "onRender", function onRender() {}), _defineProperty(_Winterfell$defaultPr, "onClickInputIcon", function onClickInputIcon() {}), _Winterfell$defaultPr);
var QUESTION_INPUT_TYPES = _index.QUESTION_INPUT_TYPES;
exports.QUESTION_INPUT_TYPES = QUESTION_INPUT_TYPES;
var _default = Winterfell;
exports["default"] = _default;