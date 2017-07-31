import React, {Component} from "react";
import auth from './auth.js'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            login: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let email = this.state.login;
        let pass = this.state.password;
        auth.login(email, pass, (loggedIn) => {
            if (!loggedIn)
                return this.setState({error: true});

            const {location} = this.props;

            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/')
            }
        })
    }


    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Zaloguj się</div>
                <div className="panel-body">
                    {this.state.error && (
                        <div className="alert alert-warning" role="alert">Niepoprawne dane</div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <input className="form-control"
                                   type="text"
                                   id="login"
                                   name="login"
                                   placeholder="Login"
                                   required="required"
                                   value={this.state.login}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Hasło</label>
                            <input className="form-control"
                                   type="password"
                                   id="password"
                                   name="password"
                                   placeholder="Hasło"
                                   required="required"
                                   value={this.state.password}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary">Zaloguj się</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login