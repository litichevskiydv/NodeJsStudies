const axios = require("axios");

/**
 * @param {{url: string}} task
 * @returns {Promise<void>}
 */
const handle = async task => {
  await new Promise(resolve => setInterval(resolve, Math.random() * 600 + 600));
  const response = await axios.get(task.url, {
    timeout: 50000
  });
};

module.exports = {
  handle
};
