const validate = values => {
  const errors = {};
  const { chamaName, noOfMembers } = values;
  if (!chamaName) {
    errors.chamaName = "You must enter the Group's Name!";
  }

  if (!noOfMembers) {
    errors.noOfMembers = "You must enter the Number of Members in your Chama!";
  }

  if (isNaN(noOfMembers)) errors.noOfMembers = "Please enter a number!";
  else if (noOfMembers < 2)
    errors.noOfMembers = "You chama must have at least 2 members!";
  else if (parseInt(noOfMembers) !== Number(noOfMembers)) {
    errors.noOfMembers = "Enter integers only!";
  }

  return errors;
};

export default validate;
