"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _inputTypes = _interopRequireDefault(require("./inputTypes"));

var _errors = _interopRequireDefault(require("./lib/errors"));

var _validation = _interopRequireDefault(require("./lib/validation"));

var _postQuestionComponents = _interopRequireDefault(require("./custom/postQuestionComponents"));

var _questionPanel = _interopRequireDefault(require("./questionPanel"));

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

var Winterfell = /*#__PURE__*/function (_Component) {
  _inherits(Winterfell, _Component);

  var _super = _createSuper(Winterfell);

  function Winterfell(props) {
    var _this;

    _classCallCheck(this, Winterfell);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleAnswerChange", function (questionId, questionAnswer, questionLabel) {
      var questionAnswers = _lodash["default"].chain(_this.state.questionAnswers).set(questionId, {
        value: questionAnswer,
        label: questionLabel
      }).value();

      _this.setState({
        questionAnswers: questionAnswers
      });

      console.log('This is the data: ', questionAnswers, _this.state.questionAnswers, questionId, questionAnswer, questionLabel);

      _this.props.onUpdate(questionAnswers);
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

      _this.setState({
        currentPanel: panel,
        currentQuestionId: undefined
      }, _this.props.onSwitchPanel.bind(null, panel));
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackButtonClick", function () {
      if (_this.panelHistory.length > 1) {
        _this.panelHistory.pop();
      }

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
      panelMoved: false
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
            if (qs.questionId === questionsIdWithConditionals.find(function (e) {
              return e.conditionalQuestionId === nextProps.currentQuestionId;
            }).questionId) {
              return qs.panel;
            }
          });
        }

        if (this.state.currentPanel.panelId !== questionPanel.panel.panelId) {
          newState.currentPanel = questionPanel.panel;
          this.panelHistory.push(questionPanel.panel.panelId);
          newState.currentQuestionId = nextProps.currentQuestionId;
          this.props.onFocus(nextProps.currentQuestionId);
        }
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
        onPostQuestionComponent: this.props.onPostQuestionComponent
      }), this.props.extraComponent ? this.props.extraComponent : null));
    }
  }]);

  return Winterfell;
}(_react.Component);

Winterfell.inputTypes = _inputTypes["default"];
Winterfell.errorMessages = _errors["default"];
Winterfell.validation = _validation["default"];
Winterfell.postQuestionComponents = _postQuestionComponents["default"];
Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;
Winterfell.addPostQuestionComponent = Winterfell.postQuestionComponents.addPostQuestionComponent;
Winterfell.addErrorMessage = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;
Winterfell.addValidationMethod = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;
Winterfell.defaultProps = {
  questionAnswers: {},
  encType: 'application/x-www-form-urlencoded',
  method: 'POST',
  action: '',
  panelId: undefined,
  disableSubmit: false,
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  currentQuestionId: undefined,
  onSubmit: function onSubmit() {},
  onUpdate: function onUpdate() {},
  onFocus: function onFocus() {},
  onSwitchPanel: function onSwitchPanel() {},
  onRender: function onRender() {},
  onPostQuestionComponent: {}
};
var _default = Winterfell;
exports["default"] = _default;