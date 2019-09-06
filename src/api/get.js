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
  return axios.get(url)
    .then(res => Promise.resolve(res))
    .catch(err => console.log(err));
}

export function getDetail(id) {
  const url = `http://172.20.10.9:3000/movies/detail/${id}`;
  return axios.get(url)
    .then(res => Promise.resolve(res))
    .catch(err => console.log(err));
}


export default { };
