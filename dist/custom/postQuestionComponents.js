"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postQuestionComponents = {};
/**
 * Add an input type
 *
 * @param  type      name     Name of InputType
 * @param  Component instance Input Type Component
 */

postQuestionComponents.addPostQuestionComponent = function (name, instance) {
  console.log('This function addPostQuestionComponent  is called', name, instance);

  if (typeof name !== 'string') {
    throw new Error('Winterfell: First parameter of addInputType ' + 'must be of type string');
  } // if (!React.Component instanceof instance.constructor) {


  if (!_react["default"].Component instanceof instance.constructor) {
    throw new Error('Winterfell: Cannot not assign "' + name + '" as an inputType. ' + 'Second paramter expects a React component');
  }

  postQuestionComponents[name] = instance;
};

var _default = postQuestionComponents;
exports["default"] = _default;