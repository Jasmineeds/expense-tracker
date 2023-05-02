function formattedDate(records) {
  return records.map(record => {
    const date = new Date(record.date)
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    record.date = formattedDate
    return record
  })
}

module.exports = formattedDate