"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _inputTypes = _interopRequireDefault(require("./inputTypes"));

var _postQuestionComponents = _interopRequireDefault(require("./custom/postQuestionComponents"));

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

var Question = /*#__PURE__*/function (_Component) {
  _inherits(Question, _Component);

  var _super = _createSuper(Question);

  function Question() {
    _classCallCheck(this, Question);

    return _super.apply(this, arguments);
  }

  _createClass(Question, [{
    key: "handleInputChange",
    value: function handleInputChange(questionId, value) {
      this.props.onAnswerChange(questionId, value, this.props.label, this.props.validations, this.props.validateOn);
    }
  }, {
    key: "handleInputBlur",
    value: function handleInputBlur(questionId, value) {
      this.props.onQuestionBlur(questionId, value, this.props.validations, this.props.validateOn);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var Input = _inputTypes["default"][this.props.input.type];
      var PostQuestionComponent = this.props.postQuestionComponent && this.props.postQuestionComponent.name ? _postQuestionComponents["default"][this.props.postQuestionComponent.name] : null;

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
          return _this.props.value instanceof Array ? _this.props.value.indexOf(option.value) > -1 : _this.props.value == option.value;
        }).filter(function (option) {
          return typeof option.conditionalQuestions !== 'undefined' && option.conditionalQuestions.length > 0;
        }).forEach(function (option) {
          return [].forEach.bind(option.conditionalQuestions, function (conditionalQuestion) {
            conditionalItems.push( /*#__PURE__*/_react["default"].createElement(Question, {
              key: conditionalQuestion.questionId,
              questionSetId: _this.props.questionSetId,
              questionId: conditionalQuestion.questionId,
              question: conditionalQuestion.question,
              text: conditionalQuestion.text,
              postText: conditionalQuestion.postText,
              validateOn: conditionalQuestion.validateOn,
              validations: conditionalQuestion.validations,
              value: _this.props.questionAnswers[conditionalQuestion.questionId],
              input: conditionalQuestion.input,
              classes: _this.props.classes,
              renderError: _this.props.renderError,
              questionAnswers: _this.props.questionAnswers,
              validationErrors: _this.props.validationErrors,
              onAnswerChange: _this.props.onAnswerChange,
              onQuestionBlur: _this.props.onQuestionBlur,
              onFocus: _this.props.onFocus,
              onKeyDown: _this.props.onKeyDown,
              onPostQuestionComponent: _this.props.onPostQuestionComponent
            }));
          })();
        });
      } // Get the current value. If none is set, then use
      // the default if given.


      var value = typeof this.props.value !== 'undefined' ? this.props.value : typeof this.props.input["default"] !== 'undefined' ? this.props.input["default"] : undefined; // Retrieve the validation errors for the
      // current question and map them in to
      // error-message blocks.

      var validationErrors = typeof this.props.validationErrors[this.props.questionId] !== 'undefined' ? this.props.validationErrors[this.props.questionId].map(function (error) {
        return typeof _this.props.renderError === 'function' ? _this.props.renderError(error, _this.props.questionId) : /*#__PURE__*/_react["default"].createElement("div", {
          key: _this.props.questionId + 'Error' + error.type,
          className: _this.props.classes.errorMessage
        }, error.message);
      }) : [];
      var labelId = "".concat(this.props.questionId, "-label");
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.classes.question
      }, !!this.props.question ? /*#__PURE__*/_react["default"].createElement("label", {
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
        text: this.props.input.text,
        options: this.props.input.options,
        placeholder: this.props.input.placeholder,
        required: this.props.input.required,
        classes: this.props.classes,
        onChange: this.handleInputChange.bind(this, this.props.questionId),
        onBlur: this.handleInputBlur.bind(this, this.props.questionId),
        onFocus: this.props.onFocus,
        onKeyDown: this.props.onKeyDown
      }, _typeof(this.props.input.props) === 'object' ? this.props.input.props : {})), !!this.props.postText ? /*#__PURE__*/_react["default"].createElement("p", {
        className: this.props.classes.questionPostText
      }, this.props.postText) : undefined, conditionalItems, this.props.postQuestionComponent && this.props.postQuestionComponent.name ? /*#__PURE__*/_react["default"].createElement(PostQuestionComponent, _extends({
        questionId: this.props.questionId
      }, this.props.postQuestionComponent, this.props.onPostQuestionComponent)) : undefined);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof this.props.input["default"] === 'undefined' || this.props.input.type === 'checkboxInput' && typeof this.props.questionAnswers[this.props.questionId] === 'undefined') {
        return;
      }

      this.handleInputChange.call(this, this.props.questionId, this.props.input["default"]);
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
  postQuestionComponent: {},
  onPostQuestionComponent: {},
  value: undefined,
  input: {
    "default": undefined,
    type: 'textInput',
    limit: undefined,
    placeholder: undefined
  },
  label: undefined,
  classes: {},
  questionAnswers: {},
  validationErrors: {},
  onAnswerChange: function onAnswerChange() {},
  onQuestionBlur: function onQuestionBlur() {},
  onKeyDown: function onKeyDown() {},
  onFocus: function onFocus() {},
  renderError: undefined,
  renderRequiredAsterisk: undefined
};