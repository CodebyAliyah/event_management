import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            error: null // Store error message
        }
    }

    async componentDidMount() {
        this.loadEvents();
    }

    async loadEvents() {
        try {
            const res = await fetch("http://localhost:3000/event/events/");
            
            // Check if response is ok (status 200)
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            
            // Check if the response content type is JSON
            const contentType = res.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json(); // Parse JSON if the response is JSON
                this.setState({ events: data });
            } else {
                throw new Error('Expected JSON response, but received something else.');
            }

        } catch (e) {
            // If there is an error (network or JSON parsing), store the error
            this.setState({ error: e.message });
            console.log('Error:', e.message);
        }
    }

    render() {
        let eventlist;

        if (this.state.events !== null) {
            eventlist = this.state.events.map((event, key) => {
                return (
                    <div key={key} className="card col-md-6 col-lg-3 m-4">
                        <div>
                            <img src={event.image} id="homeImg" className="mt-2" alt="..." />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{event.name}</h5>
                            <p className="card-text">{event.description}</p>
                            <a href="#" className="btn btn-outline-secondary w-100">{event.date} @ {event.time} Hrs</a>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"></li>
                                <li className="list-group-item mx-auto">{event.venue}</li>
                            </ul>
                        </div>
                    </div>
                );
            });
        }

        // Display error if it exists
        if (this.state.error) {
            return (
                <div className="container mt-5">
                    <h3 className="text-center text-danger">{this.state.error}</h3>
                </div>
            );
        }

        return (
            <div>
                <div id="carouselExampleSlidesOnly" className="carousel" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={require('../../img/banner.jpg')} alt="First slide" />
                            <div className="carousel-caption d-none d-md-block align-center">
                                <h1 className="drop-shadow">Eventzz</h1>
                                <h3 className="drop-shadow">Your Trusted Event Manager..</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div>
                        <h3 className="text-center mt-5">Upcoming Events...</h3>
                        <div className="row mx-auto">
                            {eventlist}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
