import React, { Component } from 'react'

import StaticCommentCard from 'components/CompanyCommentCard/StaticCommentCard'
import CreateContactCard from 'components/CompanyContactCard/CreateContactCard'
import StaticContactCard from 'components/CompanyContactCard/StaticContactCard'
import NewCommentCard from 'components/CompanyCommentCard/NewCommentCard'
import EditCommentCard from 'components/CompanyCommentCard/EditCommentCard'
import Button from 'components/Button'

import styles from './styles.css'
import PropTypes from 'prop-types'
import { isSuccess, hasData, isInitial } from './store/constants'

const MISSING = 'MISSING'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentsBeingEdited: [],
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
      this.props.getUsers()
    }
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(newProps) {
    if (isSuccess(newProps.companies)) {
      const company = newProps.companies.data[newProps.match.params.id]
      document.title = 'STUDS | ' + company.name
      if (
        !company.contacts &&
        (isInitial(newProps.contacts) || isSuccess(newProps.contacts))
      ) {
        newProps.loadContacts(newProps.match.params.id)
      }

      if (
        !company.comments &&
        (isInitial(newProps.comments) || isSuccess(newProps.comments))
      ) {
        newProps.loadComments(newProps.match.params.id)
      }
    }
  }

  updateCompany = body =>
    this.props.updateCompany(this.props.match.params.id, body)

  createComment = text =>
    this.props.addComment(text, this.props.match.params.id)

  startEditingComment = commentId => {
    if (!this.state.commentsBeingEdited.includes(commentId)) {
      this.setState({
        commentsBeingEdited: [...this.state.commentsBeingEdited, commentId],
      })
    }
  }

  startEditingContact = contactId => {
    if (!this.state.contactsBeingEdited.includes(contactId)) {
      this.setState({
        contactsBeingEdited: [...this.state.contactsBeingEdited, contactId],
      })
    }
  }

  saveComment = (id, text) => {
    this.props.updateComment(id, text)
    this.cancelEditingComment(id)
  }

  cancelEditingComment = id => {
    this.setState({
      commentsBeingEdited: this.state.commentsBeingEdited.filter(
        idInList => idInList !== id
      ),
    })
  }

  cancelEditingContact = id => {
    this.setState({
      contactsBeingEdited: this.state.contactsBeingEdited.filter(
        idInList => idInList !== id
      ),
    })
  }

  deleteComment = id => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      this.props.deleteComment(id, this.props.match.params.id)
    }
  }

  createContact = body => {
    this.props.addContact(body, this.props.match.params.id)
    this.setState({ showCreateContact: false })
  }

  deleteContact(id) {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      this.props.deleteContact(id, this.props.match.params.id)
    }
  }

  saveContact = (id, body) => {
    this.props.updateContact(id, body)
    this.cancelEditingContact(id)
  }

  render() {
    let company = null
    if (
      hasData(this.props.companies) &&
      this.props.companies.data[this.props.match.params.id]
    ) {
      company = this.props.companies.data[this.props.match.params.id]
    }
    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <div
            className={styles.back_button}
            onClick={() => {
              this.props.history.push({ pathname: '/sales-tool/companies' })
            }}
          >
            <i className='fa fa-arrow-left' />
          </div>
          <div>{company ? company.name : 'Laddar...'}</div>
        </div>
        <div className={styles.company_details_body}>
          <div className={styles.company_details}>
            <div className={styles.select_input}>
              <label>Status</label>
              <select
                value={company && company.status ? company.status.id : MISSING}
                onChange={event =>
                  this.updateCompany({
                    status:
                      event.target.value !== MISSING
                        ? event.target.value
                        : null,
                  })
                }
              >
                <option value={MISSING}>{'Saknar status'}</option>
                {Object.keys(this.props.statuses.data).map(key => (
                  <option key={key} value={key}>
                    {this.props.statuses.data[key]}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select_input}>
              <label>Ansvarig</label>
              <select
                value={
                  company && company.responsibleUser
                    ? company.responsibleUser.id
                    : MISSING
                }
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
          </div>
          <div className={styles.contact_comment_container}>
            <div className={styles.contact_container}>
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
            </div>
            <div className={styles.comments_container}>
              <NewCommentCard
                createComment={this.createComment}
                currentUser={this.props.currentUser}
              />
              {isSuccess(this.props.comments) ? (
                company &&
                company.comments &&
                company.comments.map(commentId => {
                  const comment = this.props.comments.data[commentId]
                  return this.isCommentBeingEdited(comment) ? (
                    <EditCommentCard
                      key={comment.id}
                      comment={comment}
                      saveComment={(id, text) => this.saveComment(id, text)}
                      cancelEditingComment={this.cancelEditingComment}
                    />
                  ) : (
                    <StaticCommentCard
                      key={comment.id}
                      comment={comment}
                      startEditingComment={this.startEditingComment}
                      deleteComment={() => this.deleteComment(comment.id)}
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

  isCommentBeingEdited = comment => {
    return this.state.commentsBeingEdited.includes(comment.id)
  }

  isContactBeingEdited = contact => {
    return this.state.contactsBeingEdited.includes(contact.id)
  }
}

CompanyDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadCompanies: PropTypes.func.isRequired,
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
}

export default CompanyDetails
