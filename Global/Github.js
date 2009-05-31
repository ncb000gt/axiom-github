/* TODO: Lots of copy and paste...must reduce. */

if (!global.axiom) {
    global.axiom = {};
}

axiom.Github = function(username, token, format, repository) {
    /* VARS */
    this.STATES = {
	OPEN: 'open',
	UNREAD: 'unread',
	CLOSED: 'closed'
    };

    /* INIT */
    this.username = username;
    this.password = token;
    this.format = format || 'json';
    this.repository = repository;

    this.getUsername = function() {
	return this.username;
    };

    this.getToken = function() {
	return this.password;
    };

    this.setFormat = function(format) {
	this.format = format;
    };

    this.getFormat = function() {
	return this.format;
    };

    this.setRepository = function(repository) {
	this.repository = repository;
    };

    this.getRepository = function() {
	return this.repository;
    };


    /* ISSUES */
    this.issueSearch = function(term, state) {
	state = state || 'open';
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'issues/search',
	    this.getUsername(),
	    this.getRepository(),
	    state,
	    term
	].join('/');

	app.log(url);
	var issues = axiom.HTTP.get(url);
	return issues.issues;
    };

    this.issuesGet = function(state) {
	state = state || 'open';
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'issues/list',
	    this.getUsername(),
	    this.getRepository(),
	    state
	].join('/');

	var issues = axiom.HTTP.get(url);

	return issues.issues;
    };

    this.issueGet = function(number) {
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'issues/show',
	    this.getUsername(),
	    this.getRepository(),
	    number
	].join('/');

	var issues = axiom.HTTP.get(url);

	return issues.issue;
    };

    this.issueCreate = function(title, body) {
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'issues/open',
	    this.getUsername(),
	    this.getRepository()
	].join('/');

	if (!(this.getUsername() && this.getToken() && title)) {
	    throw "Required data does not exist. Please make sure you've specified a username, API token and title.";
	}

	var post_data = {
	    login: this.getUsername(),
	    token: this.getToken(),
	    title: title
	};

	if (body) {
	    post_data.body = body;
	}

	try {
	    var content = axiom.HTTP.post(url, post_data);
	    return content.issue;
	} catch (e) {
	    app.log("Error: There was a problem with the server.");
	    return null;
	}
    };


    /* USERS */
    this.userSearch = function(username) {
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/search',
	    username
	].join('/');

	var content = axiom.HTTP.get(url);
	return content.user;
    };

    this.userGet = function(username) {
	var post_data = null;
	if (username == this.getUsername()) {
	    post_data = {
		login: username,
		token: this.getToken()
	    };
	}
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/show',
	    username
	].join('/');

	var content = null;
	if (post_data)
	    content = axiom.HTTP.post(url, post_data);
	else
	    content = axiom.HTTP.get(url);

	return content.user;
    };

    /* TODO: Fix this API...it sucks */
    this.userGetFollowers = function(username) {
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/show',
	    username,
	    'followers'
	].join('/');

	var content = axiom.HTTP.get(url);
	return content.users;
    };

    /* TODO: Fix this API...it sucks */
    this.userGetFollowing = function(username) {
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/show',
	    username,
	    'following'
	].join('/');

	var content = axiom.HTTP.get(url);
	return content.users;
    };

    this.userFollow = function(username) {
	var post_data = {
		login: username,
		token: this.getToken()
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/follow',
	    username
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.user;
    };

    this.userUnfollow = function(username) {
	var post_data = {
		login: username,
		token: this.getToken()
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/unfollow',
	    username
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.user;
    };

    this.userGetKeys = function() {
	var post_data = {
	    login: username,
	    token: this.getToken()
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/keys'
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.public_keys;
    };

    this.userAddKey = function(name, key) {
	var post_data = {
	    login: username,
	    token: this.getToken(),
	    name: name,
	    key: key
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/keys/add'
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.public_key;
    };

    this.userRemoveKey = function(id) {
	var post_data = {
	    login: username,
	    token: this.getToken(),
	    id: id
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/keys/remove'
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.public_key;
    };

    this.userGetEmails = function() {
	var post_data = {
	    login: username,
	    token: this.getToken()
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/emails'
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.emails;
    };

    this.userAddEmail = function(email) {
	var post_data = {
	    login: username,
	    token: this.getToken(),
	    email: email
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/email/add'
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.email;
    };

    this.userRemoveEmail = function(email) {
	var post_data = {
	    login: username,
	    token: this.getToken(),
	    email: email
	};

	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/keys/remove'
	].join('/');

	var content = axiom.HTTP.post(url, post_data);

	return content.email;
    };

    /*  */

    return this;
};

axiom.Github.toString = function() {
    return "[axiom.Github]";
};

axiom.Github.prototype.toString = function() {
    return "[axiom.Github Object]";
};

axiom.lib = "Github";
axiom.dontEnum(axiom.lib);
for (var i in axiom[axiom.lib])
    if (i != 'prototype')
	axiom[axiom.lib].dontEnum(i);
for (var i in axiom[axiom.lib].prototype)
    if (i != 'prototype')
	axiom[axiom.lib].prototype.dontEnum(i);
delete axiom.lib;