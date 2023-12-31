import React from "react";
import { Component } from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            emailError: '',
            passwordError: ''
        }
    }

    validateEmail = () => {
        if (!this.state.signInEmail) {
          this.setState({ emailError: 'Email is required' });
        } else {
          this.setState({ emailError: '' });
        }
    }
      
      validatePassword = () => {
        if (!this.state.signInPassword) {
          this.setState({ passwordError: 'Password is required' });
        } else {
          this.setState({ passwordError: '' });
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
        this.validateEmail();
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
        this.validatePassword();
    }

    onSubmitSignIn = () => {
        this.validateEmail();
        this.validatePassword();
        fetch('https://face-detection-backend-0tsv.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response=> response.json())
        .then(user=> {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            } else {
                alert('Wrong given credentials');
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <article className="br3  ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    />
                                    <p className="error">{this.state.emailError}</p>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    />
                                    <p className="error">{this.state.passwordError}</p>
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn} 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p  onClick={() => onRouteChange('register')} className="f6 link dim black pointer db">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
    
}

export default SignIn;