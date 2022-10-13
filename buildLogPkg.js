module.exports = (body,required)=>{
    let out = {
        logPkg:{},
        msg: ''
    }
    for(let [param, value] of Object.entries(required)){
        const bodyVal = body[param];
        if(bodyVal){
            out.logPkg[param] = body[param];
            continue;
        }
        else if(value === 'required'){
            out.msg = 'missing_param: '+param;
            return out;
        }else{
            out.logPkg[param] = value;
        }
    }
    out.msg = 'OK';
    return out;
}