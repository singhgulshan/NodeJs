console.time('sum');
() => {
  let s = 5+6+6+9;
  console.log(s);
}
console.timeEnd('sum');