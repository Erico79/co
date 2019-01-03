const validate = values => {
  const errors = {};

  if (!values.firstName) errors.firstName = "Please enter your First Name!";

  if (!values.otherNames) errors.otherNames = "Please enter your Other Names!";

  if (!values.email) errors.email = "Please provide your Email Address!";
  else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    errors.email = "Please provide a valid email!";

  if (!values.mobilePhone)
    errors.mobilePhone = "Please provide your Mobile Phone number!";

  if (!values.password) errors.password = "Please set your password!";
  else if (values.password.length < 6)
    errors.password = "The password must be at least 6 characters!";

  if (!values.confirmPassword)
    errors.confirmPassword = "Please re-enter your password!";
  else if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Passwords do NOT match! Try again.";

  return errors;
};

export default validate;
