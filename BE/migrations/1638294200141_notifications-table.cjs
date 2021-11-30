/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE data.notifications (
            id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id integer NOT NULL REFERENCES data.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            message text,
            is_read boolean DEFAULT false,
            type character varying(255),
            created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`)
    };

exports.down = pgm => {
    pgm.sql(`DROP TABLE IF EXISTS data.notifications;`)
};
