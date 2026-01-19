import { API_URL, KEY, TIMEOUT_SECONDS } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
const executeWithTimeout = async function (fetchPromise) {
  return await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
};
export const AJAX = async function (endpoint, uploadData = undefined) {
  try {
    const url = `${API_URL}${endpoint}?key=${KEY}`;

    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await executeWithTimeout(fetchPro);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
