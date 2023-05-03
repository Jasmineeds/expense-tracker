// func: calculate record's total amount
function calAmount(records) {
  let amount = 0
  records.map(record => {
    amount += record.amount
  })
  return amount
}

module.exports = {
  calAmount
}