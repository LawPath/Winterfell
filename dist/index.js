'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash').noConflict();

var QuestionPanel = require('./questionPanel');

var Winterfell = function (_React$Component) {
  _inherits(Winterfell, _React$Component);

  function Winterfell(props) {
    _classCallCheck(this, Winterfell);

    var _this = _possibleConstructorReturn(this, (Winterfell.__proto__ || Object.getPrototypeOf(Winterfell)).call(this, props));

    _this.formComponent = null;

    _this.panelHistory = [];

    var schema = _.extend({
      classes: {},
      formPanels: [],
      questionPanels: [],
      questionSets: []
    }, props.schema);

    schema.formPanels = schema.formPanels.sort(function (a, b) {
      return a.index - b.index;
    });

    var panelId = typeof props.panelId !== 'undefined' ? props.panelId : schema.formPanels.length > 0 ? schema.formPanels[0].panelId : undefined;

    var currentPanel = typeof schema !== 'undefined' && typeof schema.formPanels !== 'undefined' && typeof panelId !== 'undefined' ? _.find(schema.formPanels, function (panel) {
      return panel.panelId == panelId;
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
    key: 'componentWillReceiveProps',
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
    key: 'handleAnswerChange',
    value: function handleAnswerChange(questionId, questionAnswer) {
      var questionAnswers = _.chain(this.state.questionAnswers).set(questionId, questionAnswer).value();

      this.setState({
        questionAnswers: questionAnswers
      }, this.props.onUpdate.bind(null, questionAnswers));
    }
  }, {
    key: 'handleSwitchPanel',
    value: function handleSwitchPanel(panelId, preventHistory) {
      var panel = _.find(this.props.schema.formPanels, {
        panelId: panelId
      });

      if (!panel) {
        throw new Error('Winterfell: Tried to switch to panel "' + panelId + '", which does not exist.');
      }

      if (!preventHistory) {
        this.panelHistory.push(panel.panelId);
      }

      this.setState({
        currentPanel: panel,
        currentQuestionId: undefined
      }, this.props.onSwitchPanel.bind(null, panel));
    }
  }, {
    key: 'handleBackButtonClick',
    value: function handleBackButtonClick() {
      if (this.panelHistory.length > 1) {
        this.panelHistory.pop();
      }

      this.handleSwitchPanel.call(this, this.panelHistory[this.panelHistory.length - 1], true);
      // let panelIndex = this.state.schema.formPanels.find(fp =>
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
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(action) {
      var _this2 = this;

      if (this.props.disableSubmit) {
        this.props.onSubmit(this.state.questionAnswers, action);
        return;
      }

      /*
       * If we are not disabling the functionality of the form,
       * we need to set the action provided in the form, then submit.
       */
      this.setState({
        action: action
      }, function () {
        if (!_this2.formComponent) {
          return;
        }

        _this2.formComponent.submit();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var currentPanel = _.find(this.state.schema.questionPanels, function (panel) {
        return panel.panelId == _this3.state.currentPanel.panelId;
      });

      var numPanels = this.state.schema.questionPanels.length;
      var currentPanelIndex = _.indexOf(this.state.schema.questionPanels, currentPanel) + 1;

      return React.createElement(
        'form',
        {
          method: this.props.method,
          encType: this.props.encType,
          action: this.state.action,
          ref: function ref(_ref) {
            return _this3.formComponent = _ref;
          },
          className: this.state.schema.classes.form
        },
        React.createElement(
          'div',
          { className: this.state.schema.classes.questionPanels },
          React.createElement(QuestionPanel, {
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
            onSubmit: this.handleSubmit.bind(this)
          }),
          this.props.extraComponent ? this.props.extraComponent : null
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onRender();
    }
  }]);

  return Winterfell;
}(React.Component);

Winterfell.inputTypes = require('./inputTypes');
Winterfell.errorMessages = require('./lib/errors');
Winterfell.validation = require('./lib/validation');

Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

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
  onRender: function onRender() {}
};

module.exports = Winterfell;