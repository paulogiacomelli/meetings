import React from 'react'
import FormError from '../components/FormError'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            displayName: '',
            email: '',
            passOne: '',
            passTwo: '',
            errorMessage: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue }, () => {
            if (this.state.passOne !== this.state.passTwo) {
                this.setState({ errorMessage: "Passwords do not match"})
            } else {
                this.setState({ errorMessage: null })
            }
        })
    }

    render() {

        return(
            <form className="mt-3">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h3 className="font-weight-light mb-3">Register</h3>
                      <div className="form-row">
                      {this.state.errorMessage ? (
                          <FormError theMessage={this.state.errorMessage} />
                      ) : null}
                        <section className="col-sm-12 form-group">
                          <label
                            className="form-control-label sr-only"
                            htmlFor="displayName">
                                Display Name
                              </label>
                          <input
                            className="form-control"
                            value={this.state.displayName}
                            onChange={this.handleChange}
                            type="text"
                            id="displayName"
                            placeholder="Display Name"
                            name="displayName"
                            required/>
                        </section>
                      </div>
                      <section className="form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="email">
                          Email
                        </label>
                        <input
                          className="form-control"
                          value={this.state.email}
                          onChange={this.handleChange}
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          required
                          name="email"/>
                      </section>
                      <div className="form-row">
                        <section className="col-sm-6 form-group">
                          <input
                            className="form-control"
                            value={this.state.passOne}
                            onChange={this.handleChange}
                            type="password"
                            name="passOne"
                            placeholder="Password"/>
                        </section>
                        <section className="col-sm-6 form-group">
                          <input
                            className="form-control"
                            value={this.state.passTwo}
                            onChange={this.handleChange}
                            type="password"
                            required
                            name="passTwo"
                            placeholder="Repeat Password"/>
                        </section>
                      </div>
                      <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
    }

}

export default Register