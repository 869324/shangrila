export function success(dispatch, action) {
  dispatch(
    action({
      loading: false,
      status: true,
    })
  );
}

export function fail(dispatch, action, error) {
  dispatch(
    action({
      loading: false,
      status: false,
    })
  );
}
