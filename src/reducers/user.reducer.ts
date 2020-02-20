const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'login':
      return action.user;
    case 'logout':
      return null;
    case 'get-user-data':
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
