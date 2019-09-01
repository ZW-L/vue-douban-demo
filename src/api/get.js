import axios from 'axios';

export function getPic(id) {
  const url = `/api/img/movies/${id}`;
  let result = [];
  axios.get(url)
    .then(res => {
      console.log(res);
      result = res.data.data;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
}

export function getList(listName) {
  const url = `/api/${listName}`;
  return axios.get(url);
}

export default { };
