export const checkUid = (uid) => {
  const pattern = /^[0-9a-zA-Z]{3,20}$/i;
  if (pattern.test(uid)) return true;
  else return false;
};

export const checkNick = (nick) => {
  const pattern = /^[0-9a-zA-Zㄱ-ㅎ가-힣]{3,8}$/i;
  if (pattern.test(nick)) return true;
  else return false;
};

export const checkEmail = (email) => {
  const pattern = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+){1,2}$/i;

  if (pattern.test(email)) return true;
  else return false;
};

export const checkPwd = (pwd) => {
  const pattern = /^(?!.*\s)(?=.*[@#$%^&+=])(?=.*[A-Za-z])(?=.*[0-9]).{8,16}$/;

  if (pattern.test(pwd)) return true;
  else return false;
};
