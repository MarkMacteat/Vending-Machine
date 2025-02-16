export function ReturnMoney({ exchange }) {
  const bankNotes = ["1000", "500", "100", "50", "20", "10", "5", "2", "1"];
  var returnBank = [];
  var dict = {};

  while (exchange > 1) {
    for (let i = 0; i < bankNotes.length; i++) {
      let b = bankNotes[i];
      while (exchange >= Number(b)) {
        exchange -= Number(b);
        returnBank.push(b);
      }
    }
  }
  // ระบบทอนตังเข้า dict
  returnBank.forEach((value) => {
    if (dict["bank_" + value]) {
      dict["bank_" + value] += 1;
    } else {
      dict["bank_" + value] = 1;
    }
  });

  //console.log(dict);
  return dict;
}
