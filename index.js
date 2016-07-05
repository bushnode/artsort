'use strict';

var strategies = require('./strategies');
var formats = require('./formats');

/**
 * Converting Reddit data in JSON format to the appropriate data output format.
 *
 * @param json JSON string
 * @param strategy 'sort' or 'aggregate'
 * @param strategyParams {field: 'created_utc' | 'score', ascending: true | false}
 * @param format 'sql' or 'csv'
 * @param params possible {table: 'xxx', fields: [...]} for SQL or {delimiter: '?'} for CSV
 * @returns {string}
 */
module.exports = function (json, strategy, strategyParams, format, params) {
  var data;
  try {
    data = JSON.parse(json).data.children;
  } catch (e) {
    return '';
  }

  var strategyData = strategies(strategy)(data, strategyParams);
  data = strategyData.data;
  var fields = strategyData.fields;
  var fieldNames = Object.keys(fields);
  var formater = formats(format);

  var lines = [];
  for (var i=0; i<data.length; i++) {
    var row = data[i].data;
    var line = [];
    for (var j=0; j<fieldNames.length; j++) {
      var cell = row[fieldNames[j]];
      if (fields[fieldNames[j]] == 'date')
        cell = formater.dateFormat(cell);
      line.push(formater.quoteEscape(cell, fields[fieldNames[j]]));
    }
    // Line formation
    lines.push(formater.lineFormation(line, typeof params != 'undefined' ? params : {}, fieldNames));
  }
  return lines.join('\n');
};
