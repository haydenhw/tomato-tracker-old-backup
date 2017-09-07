import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import callOnTargetUpdate from '../hocs/callOnTargetUpdate';

import List from './List';

let renderField = (placeholder, inputRef) => ({
  input,
  label,
  type,
  meta: {  error, pristine, touched }
}) => (
  <div className="input-wrapper">
    <label/>
    <div>
      <input
        {...input}
        className="form-input"
        ref={inputRef}
        placeholder="Task Name"
        type={type}
       />
       <div className={(touched && error) && 'error' }>
         {/* 'press ENTER to submit task' */}
         {(touched && error ) ? error : ''} 
       </div>
       
      </div>
    </div>
  );

let AddTasksForm = class extends Component {
  componentWillMount() {
    const { shouldDisableFocusOnMount } = this.props;
    const getRef = !shouldDisableFocusOnMount 
      ?  el => this.inputRef = el 
      : () => {};
      
    this.renderField = renderField('Add Task', getRef);
  }
  
  componentDidMount() {
    const { shouldDisableFocusOnMount } = this.props;
    
    if (!shouldDisableFocusOnMount) {
      this.inputRef.focus();
    }
  }
  
  render() {
    const {
      submitButtonText, 
      handleFormSubmit,
      handleTaskSubmit,
      handleSubmit,
      inputRef,
      isContentAnimated, 
      isModalActive,
      isOnboardingActive,
      shouldRenderSubmitButton,
      renderFormTask,
      tasks,
      title,
      titleName
    } = this.props;
    
    return (
      <div className={`${isOnboardingActive ? "fullscreen-container": "bounceInDown"}`}>
        <div className={`${isModalActive ? "form-container": "" }`}>
          {title && 
            <h2 className={`form-title ${isOnboardingActive ? "bounceInDown" : ""}`}>
              {title}  
              {titleName && <span className='grey-title-text'>{titleName}</span>}
            </h2>
          }
          <div className={`form-field-wrapper ${isOnboardingActive ? "bounceInDown-second" : ""}`}>
            <label htmlFor="taskName">Tasks</label>
            <List className="form-task-list" items={tasks} renderItem={renderFormTask} />
            <form className="add-tasks-form" autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
              <Field name="taskName" component={this.renderField}/>
            </form>
          </div>
        </div>
      {!(shouldRenderSubmitButton === false) && 
        <button className={`${isOnboardingActive ? 'fade-in-medium-delay' : 'fade-in-short-delay'} outline-button modal-button-bottom-right`} onClick={handleSubmit(handleFormSubmit)}>{submitButtonText || "Finish"}</button>
      }
    </div>  
    );
  }
}  
 
const targetInfo = props => {
  return {
    targetValue: "ADD_TASKS",
    targetPropKey: "remoteSubmitForm" 
  } 
}

const onTargetUpdate = props => {
  const { handleSubmit, onTargetUpdate } = props;
    handleSubmit(onTargetUpdate)();
}
 
export default AddTasksForm = callOnTargetUpdate(targetInfo, onTargetUpdate)(AddTasksForm);
 
AddTasksForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array
}