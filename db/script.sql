CREATE DATABASE IF NOT EXISTS twitter;

CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  user_handle varchar(64) NOT NULL UNIQUE,
  display_name varchar(128) DEFAULT NULL,
  email varchar(64) NOT NULL UNIQUE,
  background_pic varchar(128) DEFAULT NULL,
  profile_pic varchar(128) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

create table tweet (
  id bigint NOT NULL AUTO_INCREMENT, 
  user_id int NOT NULL, 
  message varchar(150), 
  ip_address varchar(40),
  likes int DEFAULT 0,
  is_delete tinyint DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY(id), 
  KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
