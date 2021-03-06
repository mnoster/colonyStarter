// An example using the revealTaskWorkRating method
const revealTaskWorkRating = async (colonyClient, taskId, role, rating) => {

  // Set salt value
  const salt = 'secret';

  // Set rating value
  const value = rating;

  // Generate a secret for the task work rating
  const { secret } = await colonyClient.generateSecret.call({
    salt,
    value,
  });

  // Reveal the task work rating
  await colonyClient.revealTaskWorkRating.send({
    taskId,
    role,
    rating,
    salt,
  });

  // Get the task work ratings
  const taskWorkRatings = await colonyClient.getTaskWorkRatings.call({
    taskId,
  });

  // Check out the logs to see the task work ratings
  console.log('Task Work Ratings:', taskWorkRatings);

  // Return the task work ratings
  return taskWorkRatings;

}

module.exports = revealTaskWorkRating;
