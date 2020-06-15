export const parseErrors = (errors)=>{
    let messages = [];
    for(let field in errors){
        messages.push(errors[field].properties.message)
    }
    return messages;
}