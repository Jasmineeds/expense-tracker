// category icon
const CATEGORY = {
  1: "https://fontawesome.com/icons/home?style=solid",
  2: "https://fontawesome.com/icons/shuttle-van?style=solid",
  3: "https://fontawesome.com/icons/grin-beam?style=solid",
  4: "https://fontawesome.com/icons/utensils?style=solid",
  5: "https://fontawesome.com/icons/pen?style=solid"
}

// func: get category icon' name
function categoryIcon(categoryId) {
  const iconPage = CATEGORY[categoryId]
  const regex = /\/icons\/(.*?)\?/
  const iconName = regex.exec(iconPage)[1]
  return iconName
}

// func: add icon info to list of record
function formattedCategory(records) {
  return records.map(record => {
    const { categoryId } = record
    record.icon = categoryIcon(categoryId)
    return record
  })
}

// func: formate date from list of record
function formattedDates(records) {
  return records.map(record => {
    const date = new Date(record.date)
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    record.date = formattedDate
    return record
  })
}

// func: formate date from one record
function formattedDate(record) {
  const date = new Date(record.date)
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  record.date = formattedDate
  return record
}

function formattedRecords(records) {
  records = formattedDates(records)
  records = formattedCategory(records)
  return records
}

module.exports = {
  formattedDates,
  formattedDate,
  categoryIcon,
  formattedCategory,
  formattedRecords
}