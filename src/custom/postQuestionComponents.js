import React from 'react';

const postQuestionComponents = {};

/**
 * Add an input type
 *
 * @param  type      name     Name of InputType
 * @param  Component instance Input Type Component
 */
postQuestionComponents.addPostQuestionComponent = (name, instance) => {
  console.log('This function addPostQuestionComponent  is called', name, instance);
  if (typeof name !== 'string') {
    throw new Error('Winterfell: First parameter of addInputType ' + 'must be of type string');
  }

  // if (!React.Component instanceof instance.constructor) {
  if (!React.Component instanceof instance.constructor) {
    throw new Error(
      'Winterfell: Cannot not assign "' +
        name +
        '" as an inputType. ' +
        'Second paramter expects a React component',
    );
  }

  postQuestionComponents[name] = instance;
};

export default postQuestionComponents;
