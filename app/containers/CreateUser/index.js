import React from 'react'
import { createUser } from 'api'
import Button from 'components/Button'
import styles from './styles.css'
import formToObject from './formUtils'

class CreateUser extends React.Component {
  // If we use babel-eslint as parser, we can remove this constructor
  // and use an arrow function for handleSubmit instead
  constructor(props) {
    super(props)

    this.state = {
      errorMsg: '',
      successMsg: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = event.target

    this.setState({
      errorMsg: '',
      successMsg: '',
    })

    const formData = formToObject(form.elements)
    createUser(formData)
      .then(res => {
        form.reset()
        this.setState({
          successMsg: `Successfully created user ${res.email}!`,
        })
      })
      .catch(res => {
        if (!res.json) {
          console.error(res)
          return
        }

        return res.json()
          .then(err => {
            let errorMsg
            if (Array.isArray(err)) {
              errorMsg = err.map(({ msg }) => msg).join(', ')
            } else {
              errorMsg = err.error
            }

            this.setState({
              errorMsg,
            })
          })
      })
  }

  render() {
    const { errorMsg, successMsg } = this.state
    const errorIsVisible = errorMsg && errorMsg !== ''
    const successIsVisible = successMsg && successMsg !== '' && !errorIsVisible

    return (
      <div className={styles.createUser}>
        <div className={styles.content}>
          <h2>Create user</h2>

          {errorIsVisible && (
            <div className={styles.errorMsg}>
              {errorMsg}
            </div>
          )}

          {successIsVisible && (
            <div className={styles.successMsg}>
              {successMsg}
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                placeholder="some@email.com"
                name="email"
                id="email"
                required
              />
            </label>

            <label>
              First name:
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                id="firstName"
                required
              />
            </label>

            <label>
              Last name:
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                id="lastName"
                required
              />
            </label>

            <div className={styles.formLabel}>
              Member type:
              <div className={styles.radioButtonGroup}>
                <input
                  type="radio"
                  name="memberType"
                  id="studs_member"
                  value="studs_member"
                  defaultChecked
                />
                <label htmlFor="studs_member">Studs member</label>
                <br/>

                <input
                  type="radio"
                  name="memberType"
                  id="company_member"
                  value="company_member"
                />
                <label htmlFor="company_member">Company member</label>
              </div>
            </div>

            <Button full type="submit">
              Create new user
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateUser
