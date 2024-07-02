import bcrypt from 'bcryptjs'

const bEncrypt = (password: string) => {
  return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
          if(!err) {
              bcrypt.hash(password, salt, (err, res) => {
                  if(!err) resolve({
                      hash: res,
                      salt: salt
                  });
                  else reject(err);
              });
          }
          else reject(err);
      });
  });
}

export const hashPassword = (password: string) => {
  let loginHashPasswordHR = process.hrtime();
  return new Promise((resolve, reject) => {
      bEncrypt(password).then(encrypted => {
          let measuredTime = (process.hrtime(loginHashPasswordHR)[1] / 1e6);
          resolve({
              hash: (encrypted as {hash: string, salt: string}).hash,
              salt: (encrypted as {hash: string, salt: string}).salt,
              time: measuredTime
          });
      });
  });
}

export const checkPassword = (DBhash: string, userInput: string) => {
  return new Promise((resolve, reject) => {
      bcrypt.compare(userInput, DBhash, (err: any, res: unknown) => {
          resolve(res);
      });
  });
}