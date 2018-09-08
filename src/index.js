const Rivescript = require("rivescript");

const rive = new Rivescript();

const main = async filePath => {
  await rive.loadFile(filePath);
  const ast = rive.deparse();
};

module.exports = main;
