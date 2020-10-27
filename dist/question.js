"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _inputTypes = _interopRequireDefault(require("./inputTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Question = /*#__PURE__*/function (_Component) {
  _inherits(Question, _Component);

  var _super = _createSuper(Question);

  function Question() {
    var _this;

    _classCallCheck(this, Question);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (questionId, value) {
      _this.props.onAnswerChange(questionId, value, _this.props.label, _this.props.validations, _this.props.validateOn);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function (questionId, value) {
      _this.props.onQuestionBlur(questionId, value, _this.props.validations, _this.props.validateOn);
    });

    return _this;
  }

  _createClass(Question, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          input = _this$props.input,
          questionAnswers = _this$props.questionAnswers,
          questionId = _this$props.questionId,
          label = _this$props.label;
      this.props.onSwitchQuestion(questionId, label);

      if (typeof input["default"] === 'undefined' || input.type === 'checkboxInput' && typeof questionAnswers[questionId] === 'undefined') {
        return;
      }

      this.handleInputChange(questionId, input["default"]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var Input = _inputTypes["default"][this.props.input.type];

      if (!Input) {
        throw new Error('Winterfell: Input Type "' + this.props.input.type + '" not defined as Winterfell Input Type');
      }
      /*
       * Conditional Questions
       *
       * Go through the inputs options and filter them down
       * to options where the value matches the current questions
       * value. If we have conditional questions on a given option,
       * then render this component with the props for the conditional
       * question.
       */


      var conditionalItems = [];

      if (typeof this.props.input.options !== 'undefined') {
        this.props.input.options.filter(function (option) {
          return _this2.props.value instanceof Array ? _this2.props.value.indexOf(option.value) > -1 : _this2.props.value == option.value;
        }).filter(function (option) {
          return typeof option.conditionalQuestions !== 'undefined' && option.conditionalQuestions.length > 0;
        }).forEach(function (option) {
          return [].forEach.bind(option.conditionalQuestions, function (conditionalQuestion) {
            var answer = _this2.props.questionAnswers[conditionalQuestion.questionId];
            conditionalItems.push( /*#__PURE__*/_react["default"].createElement(Question, {
              key: conditionalQuestion.questionId,
              questionSetId: _this2.props.questionSetId,
              questionId: conditionalQuestion.questionId,
              question: conditionalQuestion.question,
              text: conditionalQuestion.text,
              postText: conditionalQuestion.postText,
              validateOn: conditionalQuestion.validateOn,
              validations: conditionalQuestion.validations,
              value: answer ? answer.value : undefined,
              prefilledData: answer ? answer.prefilledData : undefined,
              enablePrefilledAnswer: answer ? answer.enablePrefilledAnswer : undefined,
              input: conditionalQuestion.input,
              classes: _this2.props.classes,
              renderError: _this2.props.renderError,
              questionAnswers: _this2.props.questionAnswers,
              labeledAnswsers: _this2.props.labeledAnswsers,
              panelConstants: _this2.props.panelConstants,
              validationErrors: _this2.props.validationErrors,
              onAnswerChange: _this2.props.onAnswerChange,
              onQuestionBlur: _this2.props.onQuestionBlur,
              onFocus: _this2.props.onFocus,
              onKeyDown: _this2.props.onKeyDown,
              onClickInputIcon: _this2.props.onClickInputIcon
            }));
          })();
        });
      } // Get the current value. If none is set, then use
      // the default if given.


      var value = typeof this.props.value !== 'undefined' ? this.props.value : typeof this.props.input["default"] !== 'undefined' ? this.props.input["default"] : undefined; // Retrieve the validation errors for the
      // current question and map them in to
      // error-message blocks.

      var validationErrors = typeof this.props.validationErrors[this.props.questionId] !== 'undefined' ? this.props.validationErrors[this.props.questionId].map(function (error) {
        return typeof _this2.props.renderError === 'function' ? _this2.props.renderError(error, _this2.props.questionId) : /*#__PURE__*/_react["default"].createElement("div", {
          key: _this2.props.questionId + 'Error' + error.type,
          className: _this2.props.classes.errorMessage
        }, error.message);
      }) : [];
      var labelId = "".concat(this.props.questionId, "-label");
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.question
      }, !!this.props.question ? /*#__PURE__*/_react["default"].createElement("p", {
        className: this.props.classes.label,
        id: labelId,
        htmlFor: this.props.questionId
      }, this.props.question, typeof this.props.renderRequiredAsterisk !== 'undefined' && this.props.input.required ? this.props.renderRequiredAsterisk() : undefined) : undefined, !!this.props.text ? /*#__PURE__*/_react["default"].createElement("p", {
        className: this.props.classes.questionText
      }, this.props.text) : undefined, validationErrors, /*#__PURE__*/_react["default"].createElement(Input, _extends({
        name: this.props.questionId,
        id: this.props.questionId,
        labelId: labelId,
        value: value,
        prefilledData: this.props.prefilledData,
        enablePrefilledAnswer: this.props.enablePrefilledAnswer,
        text: this.props.input.text,
        options: this.props.input.options,
        placeholder: this.props.input.placeholder,
        required: this.props.input.required,
        classes: this.props.classes,
        onChange: this.handleInputChange.bind(this, this.props.questionId),
        onBlur: this.handleInputBlur.bind(this, this.props.questionId),
        onFocus: this.props.onFocus,
        onKeyDown: this.props.onKeyDown,
        onClickInputIcon: this.props.onClickInputIcon,
        inputIconTooltipText: this.props.panelConstants.tooltipContent
      }, _typeof(this.props.input.props) === 'object' ? this.props.input.props : {})), !!this.props.suggestions ? /*#__PURE__*/_react["default"].createElement("p", {
        className: this.props.classes.questionPostText
      }, this.props.panelConstants.suggestionHintText) : undefined, conditionalItems);
    }
  }]);

  return Question;
}(_react.Component);

exports["default"] = Question;
Question.defaultProps = {
  questionSetId: undefined,
  questionId: undefined,
  question: '',
  validateOn: 'blur',
  validations: [],
  text: undefined,
  postText: undefined,
  value: undefined,
  input: {
    "default": undefined,
    type: 'textInput',
    limit: undefined,
    placeholder: undefined
  },
  enablePrefilledAnswer: false,
  label: undefined,
  classes: {},
  questionAnswers: {},
  labeledAnswsers: [],
  validationErrors: {},
  onAnswerChange: function onAnswerChange() {},
  onQuestionBlur: function onQuestionBlur() {},
  onKeyDown: function onKeyDown() {},
  onFocus: function onFocus() {},
  onClickInputIcon: function onClickInputIcon() {},
  onSwitchQuestion: function onSwitchQuestion() {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  panelConstants: undefined
};