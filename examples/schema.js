module.exports = {
  classes: {
    input: 'form-control',
    select: 'form-control',
    question: 'form-group',
    radioListItem: 'radio',
    radioList: 'clean-list',
    checkboxInput: 'checkbox',
    checkboxListItem: 'checkbox',
    checkboxList: 'clean-list',
    controlButton: 'btn btn-blue pull-right',
    backButton: 'btn btn-red pull-left',
    errorMessage: 'alert alert-danger',
    questionPostText: 'push-top',
    buttonBar: 'button-bar',
    progressBarIncomplete: 'progress-incomplete',
    progressBarComplete: 'progress-complete',
    progressBarTitle: 'progress-title',
    progressBarLegend: 'progress-legend',
  },
  formPanels: [
    {
      index: 0,
      panelId: 'discloser-name-panel',
    },
    {
      index: 1,
      panelId: 'discloser-address-panel',
    },
    {
      index: 2,
      panelId: 'receiver-name-panel',
    },
    {
      index: 3,
      panelId: 'receiver-address-panel',
    },
    {
      index: 4,
      panelId: 'purpose-panel',
    },
    {
      index: 5,
      panelId: 'final-panel',
    },
  ],
  questionPanels: [
    {
      panelId: 'discloser-name-panel',
      panelHeader: 'Confidentiality Agreement (One-way)',
      progress: {
        showBar: true,
        showPercent: true,
        text: 'Completed',
        position: 'bottom',
        variation: 'only-completed',
      },
      action: {
        conditions: [],
        default: {
          action: 'GOTO',
          target: 'discloser-address-panel',
        },
      },
      button: {
        text: 'Next',
      },
      questionSets: [
        {
          index: 1,
          questionSetId: 'discloser-name-set',
        },
      ],
    },
    {
      panelId: 'discloser-address-panel',
      panelHeader: 'Confidentiality Agreement (One Way)',
      progress: {
        showBar: true,
        showPercent: true,
        text: 'Completed',
        position: 'bottom',
        variation: 'only-completed',
      },
      action: {
        conditions: [],
        default: {
          action: 'GOTO',
          target: 'receiver-name-panel',
        },
      },
      button: {
        text: 'Next',
      },
      questionSets: [
        {
          index: 2,
          questionSetId: 'discloser-address-set',
        },
      ],
    },
    {
      panelId: 'receiver-name-panel',
      panelHeader: 'Confidentiality Agreement (One-way)',
      progress: {
        showBar: true,
        showPercent: true,
        text: 'Completed',
        position: 'bottom',
        variation: 'only-completed',
      },
      action: {
        conditions: [],
        default: {
          action: 'GOTO',
          target: 'receiver-address-panel',
        },
      },
      button: {
        text: 'Next',
      },
      questionSets: [
        {
          index: 3,
          questionSetId: 'receiver-name-set',
        },
      ],
    },
    {
      panelId: 'receiver-address-panel',
      panelHeader: 'Confidentiality Agreement (One Way)',
      progress: {
        showBar: true,
        showPercent: true,
        text: 'Completed',
        position: 'bottom',
        variation: 'only-completed',
      },
      action: {
        conditions: [],
        default: {
          action: 'GOTO',
          target: 'purpose-panel',
        },
      },
      button: {
        text: 'Next',
      },
      questionSets: [
        {
          index: 4,
          questionSetId: 'receiver-address-set',
        },
      ],
    },
    {
      panelId: 'purpose-panel',
      panelHeader: 'Confidentiality Agreement (One Way)',
      progress: {
        showBar: true,
        showPercent: true,
        text: 'Completed',
        position: 'bottom',
        variation: 'only-completed',
      },
      action: {
        conditions: [],
        default: {
          action: 'SUBMIT',
          target: '#',
        },
      },
      button: {
        text: 'Submit',
      },
      questionSets: [
        {
          index: 5,
          questionSetId: 'purpose-set',
        },
      ],
    },
  ],
  questionSets: [
    {
      questionSetId: 'discloser-name-set',
      questions: [
        {
          questionId: 'Discloser_Name',
          question: 'What is the full name of the legal party disclosing the information? ',
          input: {
            type: 'addressInput',
            placeholder: 'e.g. John Smith',
          },
          validations: [
            {
              type: 'isLength',
              params: [1],
            },
          ],
        },
        {
          questionId: 'Cond_Discloser_ABN_or_ACN',
          question: 'Do you know the ABN or ACN of the legal party disclosing the information?',
          validations: [
            {
              type: 'isIn',
              params: [[true, false]],
            },
          ],
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: true,
                conditionalQuestions: [
                  {
                    questionId: 'Discloser_ABN_or_ACN',
                    question:
                      'What is the ABN or ACN of the legal party disclosing the information?',
                    input: {
                      type: 'textInput',
                      placeholder: 'eg. 20 222 022 022',
                    },
                    validateOn: 'blur',
                    validations: [
                      {
                        type: 'isLength',
                        params: [1],
                      },
                    ],
                  },
                ],
                validations: [
                  {
                    type: 'isLength',
                    params: [1],
                  },
                ],
              },
              {
                text: 'No',
                value: false,
                conditionalQuestions: [],
              },
            ],
          },
        },
      ],
    },
    {
      questionSetId: 'discloser-address-set',
      questions: [
        {
          questionId: 'Cond_discloser_address',
          question: 'Do you know the Address of the Party Disclosing the information?',
          validations: [
            {
              type: 'isIn',
              params: [[true, false]],
            },
          ],
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: true,
                conditionalQuestions: [
                  {
                    questionId: 'discloser_address',
                    question: 'What is the Address of the legal party disclosing the information?',
                    input: {
                      type: 'textInput',
                    },
                    validateOn: 'blur',
                    validations: [
                      {
                        type: 'isLength',
                        params: [1],
                      },
                    ],
                  },
                ],
                validations: [
                  {
                    type: 'isLength',
                    params: [1],
                  },
                ],
              },
              {
                text: 'No',
                value: false,
                conditionalQuestions: [],
              },
            ],
          },
        },
      ],
    },
    {
      questionSetId: 'receiver-name-set',
      questions: [
        {
          questionId: 'Receiver_Name',
          question: 'What is the name of the legal party recieving the information?',
          input: {
            type: 'textInput',
            placeholder: 'e.g. John Smith',
          },
          validations: [
            {
              type: 'isLength',
              params: [1],
            },
          ],
        },
        {
          questionId: 'Cond_Receiver_ABN_or_ACN',
          question: 'Do you know the ABN or ACN of the party receiving the information?',
          validations: [
            {
              type: 'isIn',
              params: [[true, false]],
            },
          ],
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: true,
                conditionalQuestions: [
                  {
                    questionId: 'Receiver_ABN_or_ACN',
                    question: 'What is the ABN or ACN of the party recieving the information?',
                    input: {
                      type: 'textInput',
                      placeholder: 'eg. 20 222 022 022',
                    },
                    validateOn: 'blur',
                    validations: [
                      {
                        type: 'isLength',
                        params: [1],
                      },
                    ],
                  },
                ],
                validations: [
                  {
                    type: 'isLength',
                    params: [1],
                  },
                ],
              },
              {
                text: 'No',
                value: false,
                conditionalQuestions: [],
              },
            ],
          },
        },
      ],
    },
    {
      questionSetId: 'receiver-address-set',
      questions: [
        {
          questionId: 'Cond_receiver_address',
          question: 'Do you know the Address of the Party recieving the information?',
          validations: [
            {
              type: 'isIn',
              params: [[true, false]],
            },
          ],
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: true,
                conditionalQuestions: [
                  {
                    questionId: 'receiver_address',
                    question: 'What is the address of the party recieving the information?',
                    input: {
                      type: 'textInput',
                    },
                    validateOn: 'blur',
                    validations: [
                      {
                        type: 'isLength',
                        params: [1],
                      },
                    ],
                  },
                ],
                validations: [
                  {
                    type: 'isLength',
                    params: [1],
                  },
                ],
              },
              {
                text: 'No',
                value: false,
                conditionalQuestions: [],
              },
            ],
          },
        },
      ],
    },
    {
      questionSetId: 'purpose-set',
      questions: [
        {
          questionId: 'purpose',
          question: 'What is the purpose for which the confidential information is being provided.',
          postText:
            'For example, it may be in relation to discussing ' +
            'and evaluating a potential business partnership or the sale of a company.',
          input: {
            type: 'textInput',
          },
          validations: [
            {
              type: 'isLength',
              params: [1],
            },
          ],
        },
        {
          questionId: 'Cond_term',
          question: 'Will the Agreement only last for a determined amount of time?',
          validations: [
            {
              type: 'isIn',
              params: [[true, false]],
            },
          ],
          input: {
            type: 'radioOptionsInput',
            options: [
              {
                text: 'Yes',
                value: true,
                conditionalQuestions: [
                  {
                    questionId: 'term',
                    question: 'What is the term?',
                    input: {
                      type: 'textInput',
                      placeholder: 'eg. 1 year',
                    },
                    validateOn: 'blur',
                    validations: [
                      {
                        type: 'isLength',
                        params: [1],
                      },
                    ],
                  },
                ],
              },
              {
                text: 'No',
                value: false,
                conditionalQuestions: [],
              },
            ],
          },
        },
        {
          questionId: 'jurisdiction',
          question: 'The laws of which state or territory govern this agreement?',
          input: {
            type: 'textInput',
          },
          validations: [
            {
              type: 'isLength',
              params: [1],
            },
          ],
        },
      ],
    },
  ],
};
