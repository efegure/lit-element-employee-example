// import {createSlice, configureStore} from '@reduxjs/toolkit';

const mockEmployees = [
  ...Array(1).fill(
    {
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2018-12-31',
      dateOfBirth: '2014-12-31',
      phone: Math.random().toString(36),
      email: 'john.doe@gmail.com',
      department: 'tech',
      position: 'Software Engineer',
    },
    0
  ),
  ...Array(1).fill(
    {
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2018-12-31',
      dateOfBirth: '1990-12-31',
      phone: Math.random().toString(36),
      email: 'john.doe@gmail.com',
      department: 'tech',
      position: 'Software Engineer',
    },
    0
  ),
];

// const employeeSlice = createSlice({
//   name: 'employees',
//   initialState: {
//     employees: mockEmployees,
//     pageCount: 0,
//     currentPage: 0,
//   },
//   reducers: {
//     addEmployee: (state, employee) => {
//       state.employees.push(employee);
//     },
//     deleteEmployee: (state, index) => {
//       state.employees.splice(1, index);
//     },
//     editEmployee: (state, index, employee) => {
//       state.employees[index] = employee;
//     },
//   },
// });

// export const {addEmployee, decremented} = employeeSlice.actions;

// export const store = configureStore({
//   reducer: employeeSlice.reducer,
// });
import {createStore} from 'redux';

const initialState = {
  employees: localStorage.getItem('employeeList')
    ? JSON.parse(localStorage.getItem('employeeList'))
    : mockEmployees,
  pageCount: 10,
  currentPage: 0,
  searchTerm: '',
};

function reducer(state = initialState, action) {
  const {employees} = state;
  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      const _state = {...state, employees: [...employees, action.payload]};
      localStorage.setItem('employeeList', JSON.stringify(_state.employees));
      return _state;
    }

    case 'DELETE_EMPLOYEE': {
      const _state = {
        ...state,
        employees: state.employees.toSpliced(action.payload, 1),
      };
      localStorage.setItem('employeeList', JSON.stringify(_state.employees));
      return _state;
    }

    case 'EDIT_EMPLOYEE': {
      const temp = [...state.employees];
      const {index, employee} = action.payload;
      temp[index] = employee;
      const _state = {...state, employees: temp};
      localStorage.setItem('employeeList', JSON.stringify(_state.employees));
      return _state;
    }
    case 'SET_PAGE':
      return {...state, currentPage: action.payload};
    case 'SET_SEARCH_TERM': {
      return {...state, searchTerm: action.payload};
    }

    default:
      return state;
  }
  //   if (action.type === 'ADD_EMPLOYEE') {
  //     return {...state, employees: [...employees, action.payload]};
  //   } else if (action.type === DELETE_EMPLOYEE) {
  //     return {...state, employees: employees.splice(1, action.payload)};
  //   } else if (action.type === 'EDIT_EMPLOYEE') {
  //     const temp = [...state.employees];
  //     const {index, employee} = action.payload;
  //     temp[index] = employee;
  //     return {...state, employees: temp};
  //   } else if (action.type === 'SET_PAGE') {
  //     return {...state, currentPage: action.payload};
  //   }
  //   return state;
}

export const store = createStore(reducer);
