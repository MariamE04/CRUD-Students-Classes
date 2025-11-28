// utils/fetchData.js
export function fetchData(url, callback, method = undefined, body = undefined) {
  const headers = {
    Accept: "application/json",
  };

  // kun sæt Content-Type for POST/PUT when body is present
  if ((method === "POST" || method === "PUT") && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const options = {};
  if (method) options.method = method;
  options.headers = headers;
  if (body !== undefined) options.body = JSON.stringify(body);

  // DEBUG: log request so du kan se præcis hvad der sendes
  console.log("fetch ->", url, options);

  fetch(url, options)
    .then((res) => {
      // hvis HTTP-status ikke er 2xx -> læs tekst og kast fejl med indhold
      if (!res.ok) {
        return res
          .text()
          .then((text) => {
            throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
          });
      }

      // hvis 204 No Content -> return null til callback
      if (res.status === 204) return null;

      // ellers prøv at parse json
      return res.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      // print hele error objektet til console (mere detaljer)
      console.error("fetchData ERROR:", err);
    });
}
