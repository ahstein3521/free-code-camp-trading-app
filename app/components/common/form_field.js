import React from 'react';

const FormField = ({feild,label,type,onError}) => {
  
        return(
          <fieldset className="form-group">
            <label>{label}</label>
            <input {...feild} type={type} className="form-control"/>
            {onError}
          </fieldset>
  );
};

export default FormField;
