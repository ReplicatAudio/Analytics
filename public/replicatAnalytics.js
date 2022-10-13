// Front-end code for integration with replicat analytics
const replicatAnalytics = {};
replicatAnalytics.action = (tag, origin) =>{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
            console.log('Logged action with analytics');
        }else if(this.readyState == 4 && this.status != 200){
            console.log('Could not log action with analytics');
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("POST", "https://replicatAudio.com:1234/action", true);
    const params = `tag=${tag}&origin=${origin}`
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
}
