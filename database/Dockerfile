FROM postgres:9.6-alpine

ENV POSTGRES_USER pcvt-admin

ENV POSTGRES_PASSWORD pcvt-password

ENV POSTGRES_DB reviewer

COPY docker-entrypoint-initdb.d/init.sql docker-entrypoint-initdb.d/0-init.sql

COPY sql-scripts/insert_characteristic.sql /docker-entrypoint-initdb.d/1-script.sql

COPY sql-scripts/insert_threat.sql /docker-entrypoint-initdb.d/2-scripit.sql

COPY sql-scripts/insert_control_action.sql /docker-entrypoint-initdb.d/3-script.sql

COPY sql-scripts/insert_control_actions_for_threats.sql /docker-entrypoint-initdb.d/4-script.sql

COPY sql-scripts/insert_threats_for_characteristics.sql /docker-entrypoint-initdb.d/5-script.sql

COPY sql-scripts/insert_threats_for_control_actions.sql /docker-entrypoint-initdb.d/6-scrpit.sql