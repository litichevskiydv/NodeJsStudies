const { handle } = require("./handler");

const maxTasksCount = 5;
const tasksGenerationInterval = 300;

let activeTasksCount = 0;

/**
 * @param {number} requiredTasksCount
 * @returns {Array<{url: string}>}
 */
const generateTasks = requiredTasksCount => {
  console.log(`Required tasks count: ${requiredTasksCount}`);
  if (requiredTasksCount <= 0) return [];

  const tasks = new Array(requiredTasksCount);
  return tasks.fill({ url: "https://travis-ci.org/" });
};

/**
 * @param {{url: string}} task
 * @returns {Promise<void>}
 */
const executeTask = async task => {
  activeTasksCount++;
  try {
    await handle(task);
  } catch (error) {
    console.log(error);
  } finally {
    activeTasksCount--;
    console.log(`Active tasks count: ${activeTasksCount}`);
  }
};

const poll = async () => {
  const requiredTasksCount = maxTasksCount - activeTasksCount;

  try {
    const tasks = await generateTasks(requiredTasksCount);
    tasks.forEach(executeTask);
  } catch (error) {
    console.log(error);
  }

  setTimeout(poll, tasksGenerationInterval);
};

(async () => {
  await poll();
})();
