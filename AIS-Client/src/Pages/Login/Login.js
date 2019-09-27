import React, { Component } from "react";
import LoaderButton from "../../components/LoaderButton";
import classes from "./Login.css";
import { Auth } from "aws-amplify";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

 
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.signIn(this.state.email, this.state.password);
      alert("logged in")
      this.props.userHasAuthenticated(true);
      // s
      console.log(x);
    } catch (e) {
      console.log(e)
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };
  render() {
    console.log(this.props.test);
    return (
      <div
        class={`card card-container ${classes["card"]} ${
          classes["card-container"]
        }`}
      >
        <h2 class={`${classes["login_title"]} text-center`}>Login</h2>
        <hr />

        <form class={classes["form-signin"]} onSubmit={this.handleSubmit}>
          <span id="reauth-email" class="reauth-email"></span>
          <p class={classes["input_title"]}>Email</p>
          <input
            type="text"
            id={classes["inputEmail"]}
            class={classes["login_box"]}
            placeholder="email@domain.com"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            autoFocus
          />
          <p class={classes["input_title"]}>Password</p>
          <input
            type="password"
            id={classes["inputPassword"]}
            class={classes["login_box"]}
            placeholder="******"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <LoaderButton
            disabled={!this.validateForm()}//opposite of false or true..starts off as false but true
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Loggin in..."
          />
        </form>
      </div>
    );
  }
}

export default Login;