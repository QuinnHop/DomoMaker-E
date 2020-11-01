const DomoInfo = function(props) {
    console.log('reached')
    if(props.domos.length === 0 || props.oldest === null) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet, create a domo to see domo info</h3>
            </div>
        );
    }
    
    return (
        <div className="infoBox">
            <h2 className="info">Info:</h2>
            <p>You have {props.domos.length} domo(s).</p>
            <p>The oldest domo you have is {props.oldest.name}, who is {props.oldest.age} years old.</p>
        </div>
    )
}

const getDomoInfo = () => {
    sendAjax('GET', '/getDomoInfo', null, (data) => {
        console.log(data)
        ReactDOM.render(
            <DomoInfo domos={data.domos} oldest={data.oldest} />, document.querySelector("#domos")
        );
    });
}

const setup = function(csrf) {
    ReactDOM.render (
        <DomoInfo domos={[]} oldest = {[]} />, document.querySelector("#domos")
        
    );
    getDomoInfo();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (results) => {
        setup(results.csrfToken)
    });
};

$(document).ready(function() {
    getToken();
});