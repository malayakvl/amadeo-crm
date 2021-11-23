/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createIndex({ schema: 'data', name: 'addresses' }, 'user_id');
};

exports.down = pgm => {
    pgm.dropIndex({ schema: 'data', name: 'addresses' }, 'user_id')
};

