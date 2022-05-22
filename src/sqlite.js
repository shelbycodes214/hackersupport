/**
 * Module handles database management
 *
 * Server API calls the methods in here to query and update the SQLite database
 */

const fs = require("fs");

const dbFile = "./.data/votes.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;

    try {
      
      if (!exists) {
        
        
        await db.run(
          `CREATE TABLE sites (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL
          )`
        );
        await db.dun(
          `CREATE TABLE votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            site_id INTEGER NOT NULL,
            quick_learning BOOL,
            easy_to_use,
            networking,
            career_prograssion,
            created_at DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY (site_id)
              REFERENCES sites (id)
            )`
        );

        await db.run(
          `INSERT INTO site (name) VALUES ('Leetcode'), ('Codeacademy'), ('Udemy'), ('Coding Bat'), ('FreeCodeCamp')`
        );
      } else {
        console.log(await db.all("SELECT * from sites"));

      }
    } catch (dbError) {
      console.error(dbError);
    }
  });

// Our server script will call these methods to connect to the db
module.exports = {
  
  
//   getOptions: async () => {
//     // We use a try catch block in case of db errors
//     try {
//       return await db.all("SELECT * from Choices");
//     } catch (dbError) {
//       // Database connection error
//       console.error(dbError);
//     }
//   },

//   /**
//    * Process a user vote
//    *
//    * Receive the user vote string from server
//    * Add a log entry
//    * Find and update the chosen option
//    * Return the updated list of votes
//    */
  getAllVotes: async vote => {
    // Insert new Log table entry indicating the user choice and timestamp
    try {
      // Return the votes
      return await db.all("SELECT * from votes");
    } catch (dbError) {
      console.error(dbError);
    }
  },

//   /**
//    * Get logs
//    *
//    * Return choice and time fields from all records in the Log table
//    */
//   getLogs: async () => {
//     // Return most recent 20
//     try {
//       // Return the array of log entries to admin page
//       return await db.all("SELECT * from Log ORDER BY time DESC LIMIT 20");
//     } catch (dbError) {
//       console.error(dbError);
//     }
//   },

//   /**
//    * Clear logs and reset votes
//    *
//    * Destroy everything in Log table
//    * Reset votes in Choices table to zero
//    */
//   clearHistory: async () => {
//     try {
//       // Delete the logs
//       await db.run("DELETE from Log");

//       // Reset the vote numbers
//       await db.run("UPDATE Choices SET picks = 0");

//       // Return empty array
//       return [];
//     } catch (dbError) {
//       console.error(dbError);
//     }
//   }
};
