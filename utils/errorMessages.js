const moviesErrorMessages = {
  notFoundMessage: 'Фильм по указанному ID не найден',
  badRequestMessage: 'Введены некорректные данные при создании фильма',
  forbiddenMessage: 'Вы не можете удалять чужие фильмы',
};

const usersErrorMessages = {
  notFoundMessage: 'Пользователь по указанному ID не найден',
  badRequestMessage: 'Введены некорректные данные при создании пользователя',
  conflictMessage: 'Пользователь с таким Email уже зарегистрирован',
};

const invalidPasswordMessage = 'Неправильный логин или пароль';
const unauthorizedMessage = 'Требуется авторизация';

const serverErrorMessage = 'Произошла неизвестная ошибка';

module.exports = {
  moviesErrorMessages,
  usersErrorMessages,
  serverErrorMessage,
  unauthorizedMessage,
  invalidPasswordMessage,
};
