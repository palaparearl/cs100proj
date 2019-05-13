drop database if exists social_net;
create database social_net;

use social_net;

create table user (
	user_id int auto_increment,
	name varchar(50) not null,
	username varchar(50) not null,
	password varchar(50) not null,
	email varchar(50) not null, 
	birthday date,
	all_friends int default 0,
	all_posts int default 0,
	all_comments int default 0,
	friend_requests int default 0,
	about varchar(250),
	logged_in int(1) default 0,
	primary key(user_id)
);

create table post (
	post_id int auto_increment,
	post_date date,
	post_time time,
	all_comments int not null,
	content varchar(250) not null,
	user_id int not null,
	primary key(post_id),
	foreign key fk_user_id(user_id) references user(user_id)
	on update cascade
	on delete restrict
);

create table comment (
	comment_id int auto_increment,
	author varchar(50) not null,
	content varchar(250) not null,
	comment_time time,
	user_id int not null,
	post_id int not null,
	primary key(comment_id),
	foreign key fk_comment_owner(user_id) references user(user_id),
	foreign key fk_post_id(post_id) references post(post_id)
	on update cascade
	on delete restrict
);

create table friend_requests (
	request_id int auto_increment,
	sender varchar(50) not null,
	receiver varchar(50) not null,
	primary key(request_id)
);

create table friends_list (
	friendship_id int auto_increment,
	first_friend varchar(50) not null,
	second_friend varchar(50) not null,
	primary key(friendship_id)
);