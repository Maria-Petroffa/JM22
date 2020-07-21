export const createUserErrorMessage = (error) => {
  if (error.response.status === 422) {
    const { email, username } = error.response.data.errors;

    const errorEmailMessage = email ? `Email ${email}` : '';
    const errorUsernameMessage = username ? `Username ${username}` : '';
    const errorMessage = `${errorEmailMessage}\n${errorUsernameMessage}`;
    alert(errorMessage);
  } else {
    alert('Упс :) что-то пошло не так, попробуйте повторить позже');
  }
};

export const authentificationUserErrorMessage = (error) => {
  if (error.response.status === 422) {
    const resp = error.response.data.errors['email or password'];
    const errorMessage = `Email or password ${resp}`;
    alert(errorMessage);
  } else {
    alert('Упс :) что-то пошло не так, попробуйте повторить позже');
  }
};

export const setUserToken = (token) => { localStorage.setItem('token', token); };

export const getUserToken = () => localStorage.getItem('token');

export const deleteUserToken = () => { localStorage.clear(); };
