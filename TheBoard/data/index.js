(function (data) {
  var seedDate = require("./seedData");
  var database = require("./database");

  data.getNoteCategories = function (next) {
    next(null, seedDate.initialNotes);
  };

  function seedDatabase() {
    database.getDb(function (err, db) {
      if (err) {
        console.log("Failed to create db");
      }
      else {

      }
    });
  }

  seedDatabase();

})(module.exports);