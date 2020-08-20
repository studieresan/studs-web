import React, { Component } from 'react'

import CreateContactCard from 'components/CompanyContactCard/CreateContactCard'
import StaticContactCard from 'components/CompanyContactCard/StaticContactCard'
import NewCommentCard from 'components/CompanyCommentCard/NewCommentCard'
import CommentCard from 'components/CompanyCommentCard/CommentCard'
import Button from 'components/Button'
import CompanyHeader from 'components/CompanyHeader'
import CompanyAmountInput from 'components/CompanyAmountInput/CompanyAmountInput'

import styles from './styles.css'
import PropTypes from 'prop-types'
import {
  isError,
  isSuccess,
  hasData,
  isInitial,
} from 'store/salesTool/constants'

const MISSING = 'MISSING'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactsBeingEdited: [],
      showCreateContact: false,
    }
  }

  componentDidMount() {
    if (!isSuccess(this.props.companies)) {
      this.props.loadCompanies()
    }

    if (!hasData(this.props.statuses)) {
      this.props.loadStatuses()
    }
    if (!Object.keys(this.props.users).length) {
      this.props.getUsers(this.props.selectedYear)
    }
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(newProps) {
    const isNewYearSet = newProps.selectedYear !== this.props.selectedYear
    const companyId = newProps.match.params.id

    //TODO: Solve this spaghetti mess of checking when to fetch what
    this.checkForErrors(this.props, newProps)
    if (isSuccess(newProps.companies)) {
      const company = newProps.companies.data[companyId]
      if (
        !company.contacts &&
        (isInitial(newProps.contacts) || isSuccess(newProps.contacts))
      ) {
        newProps.loadContacts(companyId)
      }

      if (
        (!company.comments &&
          (isInitial(newProps.comments) || isSuccess(newProps.comments))) ||
        isNewYearSet
      ) {
        newProps.loadComments(companyId, newProps.selectedYear)
      }
      if (isNewYearSet) {
        newProps.getUsers(newProps.selectedYear)
        newProps.loadCompany(companyId)
      }
    }
  }

  static checkForErrors = (props, newProps) => {
    const reduxVariables = ['companies', 'statuses', 'contacts', 'comments']
    reduxVariables.forEach(v => {
      if (!isError(props[v]) && isError(newProps[v])) {
        alert(
          'There was an error when ' + newProps[v].error + '\nPlease try again'
        )
      }
    })
  }

  updateCompany = body =>
    this.props.updateCompany(
      this.props.match.params.id,
      this.props.selectedYear,
      body
    )

  createComment = text =>
    (text ||
      confirm(
        'You really want to add an empty comment?\n' +
          'Do you want to look like a fool?'
      )) &&
    this.props.addComment(text, this.props.match.params.id)

  startEditingContact = contactId => {
    if (!this.state.contactsBeingEdited.includes(contactId)) {
      this.setState({
        contactsBeingEdited: [...this.state.contactsBeingEdited, contactId],
      })
    }
  }

  cancelEditingContact = id => {
    this.setState({
      contactsBeingEdited: this.state.contactsBeingEdited.filter(
        idInList => idInList !== id
      ),
    })
  }

  createContact = body => {
    const nonEmpty = Object.keys(body).filter(k => body[k]).length
    if (
      nonEmpty ||
      confirm(
        'How are you going to contact someone without any info at all?\n' +
          'Are you a magician?\n' +
          'Press ok if you are a magician and want to do this!'
      )
    ) {
      this.props.addContact(body, this.props.match.params.id)
    }
    this.setState({ showCreateContact: false })
  }

  deleteContact(id) {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      this.props.deleteContact(id, this.props.match.params.id)
    }
  }

  saveContact = (id, body) => {
    const nonEmpty = Object.keys(body).filter(k => body[k]).length
    if (
      nonEmpty ||
      confirm(
        'Why would you remove all info instead of deleting it?\n' +
          'Are you sure you want to do this?'
      )
    ) {
      this.props.updateContact(id, body)
      this.cancelEditingContact(id)
    }
  }

  render() {
    let company,
      status,
      responsibleUser,
      amount = null
    if (
      hasData(this.props.companies) &&
      this.props.companies.data[this.props.match.params.id]
    ) {
      company = this.props.companies.data[this.props.match.params.id]
      const year = company.years[this.props.selectedYear]
      if (year) {
        status = year.status ? year.status.id : undefined
        responsibleUser = year.responsibleUser
          ? year.responsibleUser.id
          : MISSING
        amount = year.amount
      }
    }
    return (
      <div className={styles.content}>
        <CompanyHeader
          name={company ? company.name : 'Laddar...'}
          updateName={newName => this.updateCompany({ name: newName })}
          selectedYear={this.props.selectedYear}
          setStudsYear={year => this.props.setStudsYear(year)}
          back={() =>
            this.props.history.push({ pathname: '/sales-tool/companies' })
          }
        />
        <div className={styles.company_details_body}>
          <div className={styles.company_details}>
            <div className={styles.select_input}>
              <label>Status</label>
              <select
                value={status}
                onChange={event =>
                  this.updateCompany({
                    status: event.target.value,
                  })
                }
              >
                {Object.keys(this.props.statuses.data).map(key => (
                  <option key={key} value={key}>
                    {this.props.statuses.data[key].name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select_input}>
              <label>Ansvarig</label>
              <select
                value={responsibleUser}
                onChange={event =>
                  this.updateCompany({
                    responsibleUser:
                      event.target.value !== MISSING
                        ? event.target.value
                        : null,
                  })
                }
              >
                <option value={MISSING}>{'Ingen ansvarig'}</option>
                {Object.keys(this.props.users).map(key => (
                  <option key={key} value={key}>
                    {this.props.users[key]}
                  </option>
                ))}
              </select>
            </div>
            <CompanyAmountInput
              currentAmount={amount ? amount : 0}
              updateAmount={newAmount =>
                this.updateCompany({
                  amount: newAmount,
                })
              }
            />
          </div>
          <div className={styles.contact_comment_container}>
            <div className={styles.contact_container}>
              <div className={styles.contact_header}>Kontaktuppgifter</div>
              {isSuccess(this.props.contacts) ? (
                company &&
                company.contacts &&
                company.contacts.map(contactId => {
                  const contactInfo = this.props.contacts.data[contactId]
                  return this.isContactBeingEdited(contactInfo) ? (
                    <CreateContactCard
                      key={contactInfo.id}
                      contactInfo={contactInfo}
                      saveContact={body =>
                        this.saveContact(contactInfo.id, body)
                      }
                      hideCard={() => this.cancelEditingContact(contactInfo.id)}
                    />
                  ) : (
                    <StaticContactCard
                      key={contactInfo.id}
                      contactInfo={contactInfo}
                      deleteContact={() => this.deleteContact(contactInfo.id)}
                      startEditingContact={this.startEditingContact}
                    />
                  )
                })
              ) : (
                <div>Laddar...</div>
              )}
              {this.state.showCreateContact ? (
                <CreateContactCard
                  saveContact={this.createContact}
                  hideCard={() => this.setState({ showCreateContact: false })}
                />
              ) : (
                <Button
                  className={styles.small_button}
                  onClick={() => this.setState({ showCreateContact: true })}
                >
                  Add
                </Button>
              )}
              <hr className={styles.hr} />
            </div>
            <div className={styles.comments_container}>
              {this.props.selectedYear === this.props.currentUser.studsYear && (
                <NewCommentCard
                  createComment={this.createComment}
                  currentUser={this.props.currentUser}
                />
              )}
              {isSuccess(this.props.comments) ? (
                company &&
                company.comments &&
                company.comments.map(commentId => {
                  const comment = this.props.comments.data[commentId]
                  return (
                    <CommentCard
                      key={comment.id}
                      canEdit={this.props.currentUser.id === comment.user.id}
                      comment={comment}
                      userName={this.props.users[comment.user.id]}
                      updateComment={text =>
                        this.props.updateComment(comment.id, text)
                      }
                      deleteComment={() =>
                        this.props.deleteComment(
                          comment.id,
                          this.props.match.params.id
                        )
                      }
                    />
                  )
                })
              ) : (
                <div>Laddar...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  isContactBeingEdited = contact => {
    return this.state.contactsBeingEdited.includes(contact.id)
  }
}

CompanyDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  loadCompany: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  statuses: PropTypes.object.isRequired,
  loadStatuses: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  loadContacts: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  selectedYear: PropTypes.number.isRequired,
  setStudsYear: PropTypes.func.isRequired,
}

export default CompanyDetails
