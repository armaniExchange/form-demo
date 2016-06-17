import _ from 'lodash';

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

// deep filter, get all values of an attribute in a deep array
export function filterFields(fields, fieldName = 'name', extra = ['page']) {
  const fieldNames = extra;
  const mapper = (allFields) => {
    _.map(allFields, (field, key)=>{
      if (key === fieldName) {
        fieldNames.push(field);
      } else if (_.isObject(field)) {
        mapper(field);
      }
    });
  };

  mapper(fields);
  return fieldNames;
}
