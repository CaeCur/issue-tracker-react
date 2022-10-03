const checkErrorStatus = (errorState = []) => {
  errorState.forEach((errorState) => {
    errorState.errorStateFn(false);

    if (errorState.stateCheck === null || errorState.stateCheck.length === 0) {
      errorState.errorStateFn(true);
    }
  });
};

export default checkErrorStatus;

// [{errorState = title, erorrStateFn = setTitle}]
