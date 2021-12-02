/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns( { schema: 'data', name: 'notifications' }, {
        sender_id: {
            type: 'integer',
            references: '"data"."users"',
        },
        subject: { type: 'varchar(255)' }
    });
};

exports.down = pgm => {
    pgm.dropColumns(
        { schema: 'data', name: 'notifications' },
        { sender_id, subject },
        { ifExists: true}
    );
};
