// An example using the setTaskBrief operation
const signTaskBrief = async (colonyClient, taskId) => {

  // Get JSON formatted operation from the mock database
  const operationJSON = DATABASE.setTaskBriefOperationJSON;

  // Check the operation
  if (operationJSON) {

    // Restore operation
    const operation = await colonyClient.setTaskBrief.restoreOperation(
      operationJSON,
    );

    // Check if the operation matches the colony contract and task id and if
    // the current account is one of the required signees for the operation.
    if (
      operation.payload.sourceAddress === colonyClient._contract.address &&
      operation.payload.inputValues.taskId === taskId &&
      operation.requiredSignees.includes(colonyClient.adapter.wallet.address)
    ) {

      // Sign the operation
      await operation.sign();

      // Check for missing signees
      if (operation.missingSignees.length === 0) {

        // Send the operation
        await operation.send();

        // Update the operation in the mock database
        DATABASE.setTaskBriefOperationJSON = null;

      } else {

        // Serialize operation into JSON format
        const operationJSON = operation.toJSON();

        // Store the operation in the mock database
        DATABASE.setTaskBriefOperationJSON = operationJSON;

      }

    } else {

      // Check out the logs to see the source of the pending operation
      console.log('Operation Source:', operation.payload.sourceAddress);

      // Check out the logs to see the task id of the pending operation
      console.log('Operation Task ID:', operation.payload.inputValues.taskId);

      // Check out the logs to see the required signees of the operation
      console.log('Required Signees:', operation.requiredSignees);

    }

  }

  // Get the updated task
  const updatedTask = await colonyClient.getTask.call({ taskId });

  // Check out the logs to see the task we updated
  console.log('Updated Task:', updatedTask);

  // Return the updated task
  return updatedTask;

}

// Export signTaskBrief example
module.exports = signTaskBrief;
