const Variable = require("./variable");
const runtime = require("./runtime");

// Debug utility to pretty print a value/variable
function printValue(value) {
  if (!(value instanceof Variable)) {
    return value;
  }
  const variable = value;
  let type = "UNKOWN";
  switch (variable.typeName) {
    case "OBJECT":
      const obj = runtime[variable.type];
      type = obj.getClassName();
      break;
    case "STRING":
      const str = variable.getValue();
      type = `STRING(${str})`;
      break;
    case "INT":
      type = "INT";
      break;
    default:
      throw new Error(`Unknown variable type ${variable.typeName}`);
  }
  return `Variable(${type})`;
}

function printCommand({ i, command, stack, variables }) {
  console.log(
    i,
    command.command.name.toUpperCase(),
    command.opcode,
    command.arguments.map(offset => {
      return printValue(variables[offset]);
    })
  );
  stack.forEach((value, j) => {
    const name = printValue(value, { runtime });
    console.log("    ", j + 1, name);
  });
}

module.exports = { printCommand };
