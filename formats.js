'use strict';

/**
 * Output format for data.
 * dateFormat - method to output date type.
 * quoteEscape - quotation and escape for the field.
 * lineFormation - method to forming the line of the data row.
 */

module.exports = function (format) {
  return {
    csv: {
      // Date in DD.MM.YYYY HH:MM:SS format
      dateFormat: function (val) {
        var parts = (new Date(parseInt(val) * 1000)).toISOString().split(/[-T\.]/);
        return parts[2] + '.' + parts[1] + '.' + parts[0] + ' ' + parts[3];
      },
      // The method how to quote and escape data field
      quoteEscape: function (val, dataType) {
        return dataType == 'string' || dataType == 'date' ?
          '"' + (val + "").replace(/"/g, '""').replace(/'/g, "''") + '"' : val;
      },
      // The method how to form the output line
      lineFormation: function (fields, params, field_names) {
        return fields.join(typeof params.delimiter != 'undefined' ? params.delimiter : ',');
      }
    },
    sql: {
      // Date in YYYY-MM-DD HH:MM:SS format
      dateFormat: function (val) {
        return (new Date(parseInt(val) * 1000)).toISOString().replace('T', ' ').substr(0, 19);
      },
      quoteEscape: function (val, dataType) {
        return dataType == 'string' || dataType == 'date' ?
            "'" + (val + '').replace(/[\x09\n\r"'\\\%]/g, function (char) {
          switch (char) {
            case '\x09':
              return '\\t';
            case '\n':
              return '\\n';
            case '\r':
              return '\\r';
            case "\"":
            case "'":
            case '\\':
            case '%':
              return '\\' + char;
          }
        }) + "'" : val;
      },
      lineFormation: function (fields, params, fieldNames) {
        var fieldsName = typeof params.fields != 'undefined' ? params.fields : fieldNames;
        return 'INSERT INTO ' +
          (typeof params.table != 'undefined' ? params.table : 'article') +
          ' (' + fieldsName.join(',') + ') VALUES (' + fields.join(',') + ');';
      }
    }
  }[format];
};