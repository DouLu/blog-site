export async function getList() {
  const url = 'http://localhost:3000/api';
  const request = new Request(`${url}/list`, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  });
  let response = await fetch(request);
  let res = await response.json();
  return res.data;
}