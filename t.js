let y;

y = 5;
(function() {
  let y;
  y = 4;
  {
    let y = 9;
    console.log(y);
  }
  console.log(y);
});

console.log(y);
