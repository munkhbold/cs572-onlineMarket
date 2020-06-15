export const parseErrors = (error)=>{
    if(error.errors){
        const errors = error.errors
        let messages = [];
        for(let field in errors){
            messages.push(errors[field].properties.message)
        }
        return messages;
    }
    return [error.message];
}