/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns( { schema: 'data', name: 'users' },
        {
            hash: { type: 'text' },
            expired_at: { type: 'timestamp' }
        });
};

// exports.down = pgm => {};
