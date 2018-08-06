CREATE SCHEMA IF NOT EXISTS reviewer;

CREATE SEQUENCE plan_sequence;

CREATE SEQUENCE review_sequence;

CREATE SEQUENCE usergroup_sequence;

CREATE SEQUENCE usersystem_sequence;

CREATE SEQUENCE usersystemtoken_sequence;

CREATE SEQUENCE hibernate_sequence;

CREATE SEQUENCE threat_seq;

CREATE TABLE IF NOT EXISTS plan
(
  id                     INTEGER NOT NULL
    CONSTRAINT plan_pkey
    PRIMARY KEY,
  archived               BOOLEAN,
  custom_plan            BOOLEAN,
  date                   TIMESTAMP,
  description            TEXT,
  file                   BYTEA,
  filename               VARCHAR(255),
  name                   VARCHAR(1024),
  plandetails            TEXT,
  privacy                INTEGER,
  state                  INTEGER,
  version                INTEGER,
  author                 INTEGER,
  child_plan             INTEGER
    CONSTRAINT fk_r0ie2bait5n09thyv71j0m3d6
    REFERENCES plan,
  parent_plan            INTEGER
    CONSTRAINT fk_s8lrkfjy9bjywm5gsjcvyh69s
    REFERENCES plan,
  plan_characteristics   TEXT,
  plan_threats           TEXT,
  plan_actions           TEXT,
  plan_generated_threats TEXT
);

CREATE TABLE IF NOT EXISTS plan_has_collaborator
(
  plan_id          INTEGER NOT NULL
    CONSTRAINT fk_5ohbl217grp6s0s0hsek2dmqf
    REFERENCES plan,
  collaborators_id INTEGER NOT NULL,
  CONSTRAINT plan_has_collaborator_pkey
  PRIMARY KEY (plan_id, collaborators_id)
);

CREATE TABLE IF NOT EXISTS plan_item
(
  id_plan INTEGER NOT NULL
    CONSTRAINT fk_nkccfvnu9e8e7wxktoglg9kjh
    REFERENCES plan,
  id      INTEGER,
  text    TEXT
);

CREATE TABLE IF NOT EXISTS review
(
  id            INTEGER NOT NULL
    CONSTRAINT review_pkey
    PRIMARY KEY,
  state         INTEGER,
  reviewed_plan INTEGER
    CONSTRAINT fk_po5wmpdgx5gfho3lyt6rvijsa
    REFERENCES plan,
  reviewer      INTEGER
);

CREATE TABLE IF NOT EXISTS review_item
(
  id_review INTEGER NOT NULL
    CONSTRAINT fk_gqess53yjqloftku30q4y7axp
    REFERENCES review,
  comments  TEXT,
  id        INTEGER,
  score     INTEGER
);

CREATE TABLE IF NOT EXISTS sys_user
(
  id           INTEGER NOT NULL
    CONSTRAINT sys_user_pkey
    PRIMARY KEY,
  admin        BOOLEAN,
  available    BOOLEAN,
  collaborator BOOLEAN,
  deactivated  BOOLEAN,
  email        VARCHAR(255)
    CONSTRAINT uk_ahtq5ew3v0kt1n7hf1sgp7p8l
    UNIQUE,
  institution  VARCHAR(255),
  name         VARCHAR(255),
  password     VARCHAR(255),
  profilelink  VARCHAR(255),
  work_area    VARCHAR(255)
);

ALTER TABLE plan
  ADD CONSTRAINT fk_t3gi8resm1amvqcbnsp6fj322
FOREIGN KEY (author) REFERENCES sys_user;

ALTER TABLE plan_has_collaborator
  ADD CONSTRAINT fk_nxjm5t2e3iwh4u138akulop1r
FOREIGN KEY (collaborators_id) REFERENCES sys_user;

ALTER TABLE review
  ADD CONSTRAINT fk_ihacrgbt5kdmaya7rvxk2my3t
FOREIGN KEY (reviewer) REFERENCES sys_user;

CREATE TABLE IF NOT EXISTS sys_user_token
(
  id          INTEGER NOT NULL
    CONSTRAINT sys_user_token_pkey
    PRIMARY KEY,
  token       VARCHAR(255),
  sys_user_id INTEGER
    CONSTRAINT fk_h7as8xxftgslt5ovnpxa057qi
    REFERENCES sys_user
);

CREATE TABLE IF NOT EXISTS user_group
(
  id   INTEGER NOT NULL
    CONSTRAINT user_group_pkey
    PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_group_has_manager
(
  user_group_id INTEGER NOT NULL
    CONSTRAINT fk_tnexjlheitqeakfi9yih9yb3n
    REFERENCES user_group,
  managers_id   INTEGER NOT NULL
    CONSTRAINT fk_i84s7kx1n1kjwoqcil9idw7gl
    REFERENCES sys_user,
  CONSTRAINT user_group_has_manager_pkey
  PRIMARY KEY (user_group_id, managers_id)
);

CREATE TABLE IF NOT EXISTS user_group_has_members
(
  user_group_id INTEGER NOT NULL
    CONSTRAINT fk_tbso207f09uohjosglvv3a4p
    REFERENCES user_group,
  members_id    INTEGER NOT NULL
    CONSTRAINT fk_3oye0lbl3561uflpxlb6m6ynw
    REFERENCES sys_user,
  CONSTRAINT user_group_has_members_pkey
  PRIMARY KEY (user_group_id, members_id)
);

CREATE TABLE IF NOT EXISTS characteristic
(
  id       INTEGER NOT NULL
    CONSTRAINT characteristic_pkey
    PRIMARY KEY,
  category VARCHAR(255),
  key      VARCHAR(255),
  label    VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS control_action
(
  id    INTEGER NOT NULL
    CONSTRAINT control_action_pkey
    PRIMARY KEY,
  key   VARCHAR(255),
  label VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS control_actions_for_threats
(
  threat_id         INTEGER NOT NULL,
  control_action_id INTEGER NOT NULL
    CONSTRAINT fk_3kcbcnak3706j3rx61tq10p3v
    REFERENCES control_action
);

CREATE TABLE IF NOT EXISTS threat
(
  id          INTEGER NOT NULL
    CONSTRAINT threat_pkey
    PRIMARY KEY,
  key         VARCHAR(255),
  label       VARCHAR(255),
  threat_type INTEGER,
  description TEXT
);

ALTER TABLE control_actions_for_threats
  ADD CONSTRAINT fk_eex1v66nq29h6fk9svrtakdlh
FOREIGN KEY (threat_id) REFERENCES threat;

CREATE TABLE IF NOT EXISTS threats_for_characteristics
(
  characteristic_id INTEGER NOT NULL
    CONSTRAINT fk_5hc91kfq951adev748n58vpxj
    REFERENCES characteristic,
  threat_id         INTEGER NOT NULL
    CONSTRAINT fk_44lageskngbl5kff7ass8k6bj
    REFERENCES threat
);

CREATE TABLE IF NOT EXISTS threats_for_control_actions
(
  control_action_id INTEGER NOT NULL
    CONSTRAINT fk_anjmbgvapw7beewlqaj8nudo4
    REFERENCES control_action,
  threat_id         INTEGER NOT NULL
    CONSTRAINT fk_nanswotjgwlkc2jwyv53ugoyf
    REFERENCES threat
);

CREATE TABLE IF NOT EXISTS draft
(
  id              INTEGER NOT NULL
    CONSTRAINT draft_pkey
    PRIMARY KEY,
  related_threats TEXT,
  actions         TEXT,
  characteristics TEXT,
  description     TEXT,
  draft_type      INTEGER,
  name            VARCHAR(255),
  threats         TEXT,
  author          INTEGER
    CONSTRAINT fk_aqqppw18sqvl2bjbdn34h0q23
    REFERENCES sys_user
);


