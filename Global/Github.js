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
    this.search = function(term, state) {
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

    this.getIssues = function(state) {
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

    this.getIssue = function(number) {
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

    this.createIssue = function(title, body) {
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
    this.getUser = function(username) {
	var url= [
	    'http://github.com/api/v2',
	    this.getFormat(),
	    'user/show',
	    username
	].join('/');
	
	var content = axiom.HTTP.get(url);
	return content.user;
    };

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