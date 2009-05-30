if (!global.axiom) {
    global.axiom = {};
}

axiom.Github = function(username, password, format) {
    this.username = username;
    this.password = password;
    this.format = format || 'json';

    this.getUsername = function() {
	return this.username;
    };

    this.getPassword = function() {
	return this.password;
    };

    this.setFormat = function(format) {
	this.format = format;
    };

    this.getFormat = function() {
	return this.format;
    };

    this.Repository = function(name) {
	this.repository = name;

	this.getRepository = function() {
	    return this.repository;
	};

	this.issues = function(state) {
	    state = state || 'all';
	    return [
		'http://github.com/api/v2',
		this.getFormat(),
		'issues/list',
		this.getUsername(),
		this.getRepository(),
		state].join('/');
	};

	return this;
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