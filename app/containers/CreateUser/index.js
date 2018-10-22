import React from 'react'
import Button from 'components/Button'
import styles from './styles.css'

class CreateUser extends React.Component {
  render() {
    return (
      <div className={styles.createUser}>
        <div className={styles.content}>
          <h1>Create user</h1>
          <form>
            <label>
              Email:
              <input
                type="email"
                placeholder="some@email.com"
                name="email"
                id="email"
              />
            </label>

            <label>
              First name:
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                id="firstName"
              />
            </label>

            <label>
              Last name:
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                id="lastName"
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
              />
            </label>

            <label>
              Confirm password:
              <input
                type="password"
                placeholder="confirmPassword"
                name="confirmPassword"
                id="confirmPassword"
              />
            </label>

            <div className={styles.formLabel}>
              Member type:
              <div className={styles.radioButtonGroup}>
                <input type="radio" name="memberType" id="studs_member"/>
                <label htmlFor="studs_member">Studs member</label>
                <br/>

                <input type="radio" name="memberType" id="company_member"/>
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
