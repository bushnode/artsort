'use strict';

var expect = require('chai').expect;
var artsort = require('../');
var request = require('sync-request');

describe('Test module', function () {
    var res = request('GET', 'https://www.reddit.com/r/javascript/.json');
    var data = res.getBody('utf8');

    it('sort + csv', function () {
        var res = artsort(data, 'sort', {field: 'score', ascending: true},
            'csv', {delimiter: '; '});
        expect(res.split('\n').length >= 5).that.equals(true);
    } );

    it('aggregate + sql', function () {
        var res = artsort(data, 'aggregate', {field: 'created_utc', ascending: false},
            'sql', {table: 'art', fields: ['domain', 'articles', 'score']});
        expect(res.split('\n').length >= 3).that.equals(true);
    } );
});
