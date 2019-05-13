use social_net;

insert into user (
	name,
	username,
	password,
	email,
	birthday,
	all_friends,
	all_posts,
	all_comments,
	friend_requests,
	about,
	logged_in
)
values (
	"Jules Ruz",
	"jules_ruz",
	"pass us sa 100 maam huhu",
	"sample_email@gmail.com",
	"1997-8-22",
	4,
	0,
	0,
	0,
	"gusto ko na grumaduate sa 100 pls thank u",
	1
),
(
	"Marianne Monroy",
	"marianne_monroy",
	"i like chips",
	"another_sample@gmail.com",
	"1997-04-15",
	3,
	0,
	0,
	1,
	"gusto ko rin pumasa sa 100 hihi",
	0
),
(
	"Earl Palapar",
	"earl_palapar",
	"lechon, sisig, crispy pata oh my",
	"yet_another@sample.com",
	"1996-05-12",
	3,
	0,
	0,
	1,
	"pass me sa 100 din please haha",
	0
),
(
	"Random Guy III",
	"rand_guy",
	"dinuguanis<3",
	"another_email@gmail.com",
	"1994-09-22",
	4,
	2,
	3,
	0,
	"i am a random guy for sample reasons",
	0
),
(
	"A. Female",
	"rand_female",
	"oldspice-DOIIIIIIIIIIT",
	"one_last@mail.com",
	"1996-08-19",
	1,
	3,
	2,
	3,
	"i am also a random female",
	0
);