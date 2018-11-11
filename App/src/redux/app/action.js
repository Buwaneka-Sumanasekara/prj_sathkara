
export function addMarks (marks) {
    return async dispatch => {
       let marksNew=marks*2;
       dispatch({
        type: 'ADD_VALUE',
        marks: marksNew
      });
    }
}