'use strict';

/**
 * Strategies for data processing.
 * Like sort (sorting) and aggregate.
 * Each strategy returns resulting data for output and the field list with their data types.
 */

module.exports = function (strategy) {
  return {
    sort: function (data, params) {
      // Sorting
      var direction = params.ascending ? 1 : -1;
      switch (params.field) {
        case 'created_utc':
          data.sort(function (a, b) {
            return (a.data.created_utc - b.data.created_utc) * direction;
          });
          break;
        case 'score':
          data.sort(function (a, b) {
            return (a.data.score - b.data.score) * direction;
          });
          break;
      }
      return {
        data: data,
        fields: {id: 'string', title: 'string', created_utc: 'date', score: 'number'}
      };
    },
    aggregate: function (data, params) {
      var res = {};
      for (var i = 0; i < data.length; i++) {
        if (res[data[i].data.domain]) {
          res[data[i].data.domain].data.article_count++;
          res[data[i].data.domain].data.score_sum += data[i].data.score;
        } else
          res[data[i].data.domain] =
          {data: {domain: data[i].data.domain, article_count: 1, score_sum: data[i].data.score}};
      }
      return {
        data: Object.keys(res).map(function (key) {
          return res[key]
        }),
        fields: {domain: 'string', article_count: 'number', score_sum: 'number'}
      }
    }
  }[strategy];
};
