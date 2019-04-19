
exports.seed = function(knex, Promise) {

      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'josh', password: 'pass' , role: 'registered user'},
        {id: 2, username: 'joshua', password: 'pass' , role: 'registered user'},
        {id: 3, username: 'alejandro', password: 'pass' , role: 'registered user'},
        {id: 4, username: 'krisli', password: 'pass' , role: 'registered user'},
        {id: 5, username: 'rudy', password: 'pass' , role: 'registered user'},
        {id: 6, username: 'crawford', password: 'pass' , role: 'registered user'},
        {id: 7, username: 'kenneth', password: 'pass' , role: 'registered user'},
        {id: 8, username: 'arthur', password: 'pass' , role: 'registered user'},
        {id: 9, username: 'leonard', password: 'pass' , role: 'registered user'},
        {id: 10, username: 'guest', password: 'welcome', role: 'guest'},
      ]);
  
};
