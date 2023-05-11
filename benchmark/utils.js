const symbols = {
  "test:fail": "\u2716 ",
  "test:pass": "\u2714 ",
  "arrow:right": "\u25B6 ",
};

const colors = {
  green: "\u001b[32m",
  white: "\u001b[39m",
  red: "\u001b[31m",
  gray: "\u001b[90m",
};
if (!globalThis.chrome) {
  Object.keys(symbols).forEach((key) => (symbols[key] = ""));
  Object.keys(colors).forEach((key) => (colors[key] = ""));
}

const describe = (name, cb) => {
  requestAnimationFrame(() => {
    const label = `${symbols["arrow:right"]} ${name}`;
    console.log(label);
    console.time(label);
    cb();
    console.timeEnd(label);
  });
};
const it = (name, cb) => {
  const start = globalThis.performance.now();
  let prefix = `${colors.green}${symbols["test:pass"]}`;
  try {
    cb();
  } catch (error) {
    console.error(error);
    prefix = `${colors.red}${symbols["test:fail"]}`;
  }
  console.log(
    `  ${prefix} ${name} ${colors.gray}(${(
      globalThis.performance.now() - start
    ).toFixed(6)}ms)${colors.white}`
  );
};
export { describe, it };
