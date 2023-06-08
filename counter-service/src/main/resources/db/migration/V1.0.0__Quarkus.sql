create table if not exists CounterEntity (id bigint not null, counter integer, primary key (id));
create sequence if not exists CounterEntity_SEQ start with 1 increment by 50;