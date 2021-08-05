// dispatch({type:"ADD_DATA",payload:{...input}})
export type Action={type:"ADD_DATA",payload:object}

export const addData=(data:object):Action=>({
    type:"ADD_DATA",
    payload:data
})