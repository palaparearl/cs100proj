use social_net;

insert into post (
	post_date,
	post_time,
	all_comments,
	content,
	user_id
) values (
	"2019-01-01",
	"08:00:00",
	2,
	"sample post",
	4
),
(
	"2019-01-02",
	"23:08:00",
	1,
	"another post",
	5
),
(
	"2019-03-22",
	"02:39:07",
	0,
	"a fish fought off magellan",
	5
),
(
	"2018-12-31",
	"00:00:00",
	1,
	"i like cheese",
	4
),
(
	"2017-07-22",
	"09:14:53",
	1,
	"#hashtag",
	5
);