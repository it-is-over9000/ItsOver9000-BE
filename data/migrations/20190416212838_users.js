
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('users', function(tbl) {
            // primary key
        tbl.increments('id');
        tbl.string('username', 128).notNullable().unique();
        tbl.string('password', 128).notNullable();
        tbl.string('role').defaultTo('registered user');
             // tbl.timestamps(); // adds created_at and updated_at
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
