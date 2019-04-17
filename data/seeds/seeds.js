
exports.seed = function(knex, Promise) {

      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'josh', password: 'pass'},
        {id: 2, username: 'joshua', password: 'pass'},
        {id: 3, username: 'alejandro', password: 'pass'},
        {id: 4, username: 'krisli', password: 'pass'},
        {id: 5, username: 'rudy', password: 'pass'},
        {id: 6, username: 'crawford', password: 'pass'},
        {id: 7, username: 'kenneth', password: 'pass'},
        {id: 8, username: 'arthur', password: 'pass'},
        {id: 9, username: 'leonard', password: 'pass'},
        {id: 10, username: 'guest', password: 'welcome'},
      ]);
  
};
