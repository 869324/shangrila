function formartError(stack) {
  let list = stack.split(`\n`);
  const message = list[0];

  return message.split("").slice(7, message.length).join("");
}

module.exports = {
  formartError,
};
