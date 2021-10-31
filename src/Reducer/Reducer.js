// const initialState: UserState = {
//     user: {},

//   }
  
//   const UserReducer = (state = initialState, action: UserActions) => {
//     switch (action.type) {
//     case LOGIN_USER_SUCCESS:
//       console.log('state', state) // initialState update see above
//       return {
//         ...state,
//         loading: false,
//         user: action.payload,
//         users: action.payload,
//         isAuthenticated: true,
//         error: '',
//       }
//     case LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         users: [],
//       }
//     default:
//       return state
//     }
//   }
  
//   export default UserReducer