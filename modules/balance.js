// private Balances List
const StoreBalances = []

module.exports = {
  addEntry: function (entry) {
    StoreBalances.push(entry)
  },
  isEmpty: function () {
    if (StoreBalances.length === 0) return true
    else return false
  },
  getEntry: function (index) {
    return StoreBalances[index]
  },
  getEntrylist: function () {
    return StoreBalances
  }
}
