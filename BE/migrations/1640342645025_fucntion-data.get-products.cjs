exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`CREATE OR REPLACE FUNCTION data.get_products(_limit integer DEFAULT 10, _offset integer DEFAULT 0, _where json DEFAULT NULL::json, _order_by text DEFAULT ''::text)
 RETURNS TABLE(id integer, name character varying, previewphoto text, description text, publish boolean, created_at timestamp without time zone, firstname character varying, lastname character varying, userphoto text, configuration json)
 LANGUAGE plpgsql
AS $function$
DECLARE
    _sql_str text := '';

    _sql_str__product_name text := '';
    _sql_str__user_id text := '';
    _sql_str__color_id text := '';
    _sql_str__size_id text := '';
    _sql_str__price text := '';
    _sql_str__quantity text := '';
    _str_id text := '';

    _where_str text := '';
    _order_by_str text := '';
    _row_count integer := NULL;
BEGIN

    IF NOT (_limit > 0)  THEN
        _limit := 10;
    END IF;


    IF NOT (_offset >= 0)  THEN
        _offset := 0;
    END IF;


    -- IF (trim(COALESCE(_where, '')) <> '') THEN
    --     _where_str := ' AND ' || trim(COALESCE(_where, ''));
    -- END IF;


    IF ((_where->'product_name' IS NOT NULL) AND (json_typeof(_where->'product_name') = 'string') AND (_where->>'product_name' <> '')) THEN
        _sql_str__product_name := format ('
            AND (
                (lower(products.name) LIKE %1$L)
                OR
                (lower(products.description) LIKE %1$L)
                OR
                (lower(product_configurations.sku) LIKE %1$L)
            )
            ',
            '%' || lower(_where->>'product_name') || '%'
        );
        -- _sql_str__product_name := format ('
        --     AND (lower(%1$I.name) @@ to_tsquery(''english'', %2$L)
        --     ',
        --     _table_product, '%' || lower(_where->'product_name') || '%'
        -- );
        -- _sql_str__product_name := format ('
        --     AND to_tsvector(''english'', %1$I.name) @@ to_tsquery(''english'', %2$L)
        --     ',
        --     _table_product, '%' || lower(_where->'product_name') || '%'
        -- );
    END IF;


    IF ((_where->'user_id' IS NOT NULL) AND (json_typeof(_where->'user_id') = 'array')) THEN

        _str_id := '';

        SELECT string_agg(t.id::text, ',')
        INTO _str_id
        FROM json_array_elements_text(_where->'user_id') AS t(id)
        WHERE TRUE
            AND (t.id IS NOT NULL)
        ;

        IF (_str_id <> '') THEN
            _sql_str__user_id := format ('
                AND ((products.user_id)::integer IN (%1$s))
                ',
                _str_id
            );
        END IF;

    END IF;


    IF ((_where->'color_id' IS NOT NULL) AND (json_typeof(_where->'color_id') = 'array')) THEN

        _str_id := '';

        SELECT string_agg(t.id::text, ',')
        INTO _str_id
        FROM json_array_elements_text(_where->'color_id') AS t(id)
        WHERE TRUE
            AND (t.id IS NOT NULL)
        ;

        IF (_str_id <> '') THEN
            _sql_str__color_id := format ('
                AND ((product_configurations.configuration->>''color_id'')::integer IN (%1$s))
                ',
                _str_id
            );
        END IF;

    END IF;


    IF ((_where->'size_id' IS NOT NULL) AND (json_typeof(_where->'size_id') = 'array')) THEN

        _str_id := '';

        SELECT string_agg(t.id::text, ',')
        INTO _str_id
        FROM json_array_elements_text(_where->'size_id') AS t(id)
        WHERE TRUE
            AND (t.id IS NOT NULL)
        ;

        IF (_str_id <> '') THEN
            _sql_str__size_id := format ('
                AND ((product_configurations.configuration->>''size_id'')::integer IN (%1$s))
                ',
                _str_id
            );
        END IF;

    END IF;


    IF ((_where->'price' IS NOT NULL) AND (json_typeof(_where->'price') = 'array')) THEN

        IF (((_where->'price'->>0)::numeric >= 0) AND ((_where->'price'->>1)::numeric >= 0))  THEN
            _sql_str__price := format ('
                AND (product_configurations.price BETWEEN %1$s AND %2$s)
                ',
                (_where->'price'->>0)::numeric, (_where->'price'->>1)::numeric
            );
        END IF;

    END IF;


    IF ((_where->'quantity' IS NOT NULL) AND (json_typeof(_where->'quantity') = 'array')) THEN

        IF (((_where->'quantity'->>0)::integer >= 0) AND ((_where->'quantity'->>1)::integer >= 0)) THEN
            _sql_str__quantity := format ('
                AND (product_configurations.quantity BETWEEN %1$s AND %2$s)
                ',
                (_where->'quantity'->>0)::integer, (_where->'quantity'->>1)::integer
            );
        END IF;

    END IF;


    IF (trim(COALESCE(_order_by, '')) <> '') THEN
        _order_by_str := ' ORDER BY ' || trim(COALESCE(_order_by, ''));
    END IF;


    _sql_str := format('
        SELECT
            products.id,
            products.name,
            products.photos[1] as previewPhoto,
            products.description,
            products.publish,
            products.created_at,

            users.first_name,
            users.last_name,
            users.photo as userPhoto,

            product_configurations.configuration

        FROM
            data.products
                LEFT JOIN data.users ON (products.user_id = users.id)
                INNER JOIN LATERAL (
                    SELECT
                        ts.id,
                        json_agg(ts.configuration) AS configuration,
                        string_agg(sku, ''   '') AS sku
                    FROM (
                        SELECT
                            products.id,
                            json_build_object(
                                ''color_id'', product_colors.id,
                                ''color_name'', product_colors.name,
                                ''color_code'', product_colors.code,
                                ''configuration'',
                                json_agg(
                                    json_build_object(
                                        ''sku'', product_configurations.sku,
                                        ''price'', product_configurations.price,
                                        ''quantity'', product_configurations.quantity,
                                        ''size_id'', product_sizes.id,
                                        ''size_name'', product_sizes.name,
                                        ''size_code'', product_sizes.code
                                    )
                                    ORDER BY product_colors.id, product_sizes.id
                                )
                            )
                            AS configuration,
                            string_agg(trim(COALESCE(sku, '''')), ''   '') AS sku
                        FROM
                             data.product_configurations
                                LEFT JOIN data.product_colors ON ((product_configurations.configuration->>''color_id'')::integer = product_colors.id)
                                LEFT JOIN data.product_sizes ON ((product_configurations.configuration->>''size_id'')::integer = product_sizes.id)
                        WHERE TRUE
                            AND (product_configurations.product_id = products.id)

                            -- FILTER BY color_id
                            %6$s

                            -- FILTER BY size_id
                            %7$s

                            -- FILTER BY price
                            %8$s

                            -- FILTER BY quantity
                            %9$s

                        GROUP BY
                            products.id,
                            product_colors.id,
                            product_colors.name,
                            product_colors.code
                    ) ts
                    GROUP BY
                        ts.id
                ) product_configurations ON (products.id = product_configurations.id)
        WHERE TRUE

            -- FILTER BY product_name
            %4$s

            -- FILTER BY user_id
            %5$s

        -- ORDER BY
        %3$s

        LIMIT %1$s OFFSET %2$s
        ',
        _limit,
        _offset,
        _order_by_str,
        _sql_str__product_name,
        _sql_str__user_id,
        _sql_str__color_id,
        _sql_str__size_id,
        _sql_str__price,
        _sql_str__quantity
    );
    -- RAISE INFO '-- %', _sql_str;
    RETURN QUERY
    EXECUTE _sql_str;


    RETURN;

END;
$function$
;
        `);
};
