create sequence counter_id_seq start with 1 increment by 1;

CREATE TABLE counter (
    count integer,
    id bigint PRIMARY KEY
);
