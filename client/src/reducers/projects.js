import  * as actions from '../actions/indexActions'
import shortid from 'shortid';


function tasks(state, action) {
  switch(action.type) {
    case actions.ADD_TASK:
       return state.map(project => {
          if (project.shortId === action.projectId) {
            const newTask = {
              taskName: action.taskName,
              shortId: shortid.generate(),
              recordedTime: 0,
            }
            
            const newTasks = [...project.tasks, newTask];
            
            return {
              ...project,
              tasks: newTasks
            }
          }
          
          return project;
        });
      
    default:
      return state;
  }
}

export function projects(state=getProjects(), action) {
  switch(action.type) {
    case actions.ADD_TASK:
      return tasks(state, action);
      
    default:
      return state;
  }
}

function getProjects() {
  return ([
    {
      projectName: "Node Capstone",
      shortId: '123',
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
      ]
    },
    {
      projectName: "React Capstone",
      shortId: '456',
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          shortd: shortid.generate()
        },
      ]
    },
  ])
}