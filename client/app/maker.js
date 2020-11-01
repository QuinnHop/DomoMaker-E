const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350)

    if($("#domoName").val() == ''|| $("#domoColor").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });
    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm"
        onSubmit={handleDomo}
        name="domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="color">Color: </label>
            <select id="domoColor" type="dropdown" name="color">
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
            </select>
            <label htmlFor="name">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    )
}
const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        return ( 
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name} </h3>
                <h3 className="domoColor">Color: {domo.color} </h3>
                <h3 className="domoAge">Age: {domo.age} </h3>
            </div>
            );
        });
        return( 
            <div className="domoList">
                {domoNodes}
            </div>
        );
}

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render (
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
    ReactDOM.render (
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (results) => {
        setup(results.csrfToken)
    });
};

$(document).ready(function() {
    getToken();
});