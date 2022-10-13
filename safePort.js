module.exports = (args)=>{
    let port = 1234;
    if(args[2])
    {
        const safePort = parseInt(process.argv[2]);
        if(isNaN(safePort)==false)
        {
            port = safePort;
        }
        else
        {
            console.log('Port must be an integer! Got: '+process.argv[2]);
            console.log('Port will default to '+port);
        }
    }
    return port;
}