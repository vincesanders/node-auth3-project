
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: 'layzie', password: 'layyour', role: 'user'},
        {username: 'bizzy', password: 'bodybeside', role: 'user'},
        {username: 'wish', password: 'meletmefeel', role: 'admin'}
      ]);
    });
};
