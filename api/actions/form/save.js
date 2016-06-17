export default function save(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};
      let valid = true;
      console.log(req);
      if (valid) {
        resolve();
      } else {
        reject(errors);
      }
    }, 1000);
  });
}
