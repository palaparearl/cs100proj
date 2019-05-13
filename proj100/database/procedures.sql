use social_net;

----------- PROCEDURES ------------

delimiter $$

 -- 'create' procedures

create procedure create_user(new_username varchar(50), unique_password varchar(50), 
	unique_email varchar(50))
	begin
		insert into user values(new_username, unique_password, unique_email);
	end $$

create procedure create_post(date_created date, post_timestamp timestamp, 
	post_content varchar(50))
	begin
		insert into post values(date_created, post_timestamp, post_content)
	end $$

create procedure create_comment(comment_author varchar(50), comment_content varchar(50),
	time_commented timestamp)
	begin
		insert into comment values(comment_author, comment_content, time_commented)
	end $$

-- 'read' procedures

create procedure view_all_users()
	begin
		select * from user;
	end $$

create procedure view_all_posts()
	begin
		select * from post
	end $$

-- pass the username to see all matching database entries
-- since Facebook doesn't allow for viewing users using user ids (delete this comment haha)
create procedure view_specific_user(name varchar(50))
	begin
		select username, password, email from user where username = name
	end $$

create procedure view_specific_user_posts(selected_user int)
	begin
		select post_date, time_stamp, all_comments, content from post where user_id = selected_user;
	end $$

-- pass the value of post_id to see all comments for a particular post
create procedure view_all_post_comments(selected_post int)
	begin
		select author, content, post_time from post where post_id = selected_post
	end $$

-- pass the username to see their full friends list
create procedure view_full_friends_list(user varchar(50)) 
	begin
		select username from friends_list where username = user
	end $$

-- 'update' procedures
create procedure update_user_information(selected_user int(11), new_username varchar(50), 
	new_pass varchar(50), new_email varchar(50), new_birthday date, total_friends int(11), 
	total_posts int(11), total_comments int(11), total_friend_requests int(11), 
	updated_about varchar(250))
	begin

		update user set username = new_username,
						password = new_pass, 
						email = new_email, 
						birthday = new_birthday,
						all_friends = total_friends,
						all_posts = total_posts,
						all_comments = total_comments, 
						friend_requests = total_friend_requests,
						about = updated_about
					where user_id = selected_user

	end $$

create procedure update_post_infromation(selected_post int(11), date_posted date, post_timestamp timestamp,
	total_comments int(11), post_content varchar(250))
	begin
		update post set post_date = date_posted,
						time_stamp = post_timestamp,
						all_comments = total_comments,
						content = post_content
					where post_id = selected_post
	end $$

create procedure update_comment_information(selected_comment int(11), comment_contents varchar(250))
	begin
		update comment set content = comment_contents where comment_id = selected_comment
	end $$

create procedure update_friend_list(selected_user int(11), user_friend int(11), friend_name varchar(50))
	begin
		update friends_list set user_id = user_friend,
								username = friend_name
							where friend_id = selected_user
	end $$

create procedure update_users_friend_requests(selected_request int(11), sending_user int(11), receiving_user int(11))
	begin
		update friend_requests set sender = sending_user,
									receiver = receiving_user
								where 

-- 'delete' procedures
create procedure delete_user(selected_user int(11))
	begin
		delete from user where user_id = selected_user
	end $$

create procedure delete_post(selected_post int(11))
	begin
		delete from post where post_id = selected_post
	end $$

create procedure delete_friend_request(selected_request int(11))
	begin
		delete from friend_requests where request_id = selected_request
	end $$

create procedure delete_post(selected_post int)
	begin
		delete from post where post_id = selected_post
	end $$

create procedure delete_comment(selected_comment int)
	begin
		delete from comment where comment_id = selected_comment
	end $
$
delimiter ;