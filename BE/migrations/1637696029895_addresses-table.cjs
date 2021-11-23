/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable({ schema: 'data', name: 'addresses' }, {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"data"."users"',
            onDelete: 'cascade',
        },
        country_id: { type: 'varchar(100)', notNull: true, unique: true },
        state: { type: 'varchar(255)' },
        post_code: { type: 'varchar(255)' },
        address_type: { type: 'varchar(255)' },
        city: { type: 'varchar(255)' },
        address_line_1: { type: 'text' },
        address_line_2: { type: 'text' },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
};

exports.down = pgm => {
    pgm.dropTable({ schema: 'data', name: 'addresses' }, {
        ifExists: true,
        cascade: false
    })
};
