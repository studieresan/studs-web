import React, { Component } from 'react'

import StaticCommentCard from 'components/CompanyCommentCard/StaticCommentCard'
import CreateContactCard from 'components/CompanyContactCard/CreateContactCard'
import StaticContactCard from 'components/CompanyContactCard/StaticContactCard'
import NewCommentCard from 'components/CompanyCommentCard/NewCommentCard'
import EditCommentCard from 'components/CompanyCommentCard/EditCommentCard'
import Button from 'components/Button'

import styles from './styles.css'
import PropTypes from 'prop-types'
import { isSuccess } from './store/constants'

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
    document.title = 'STUDS | ' + this.props.company.name
    this.props.loadContacts(this.props.company.id)
    this.props.loadComments(this.props.company.id)
  }

  updateCompany = body => this.props.updateCompany(this.props.company.id, body)

  createComment = text => this.props.addComment(text, this.props.company.id)

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
      this.props.deleteComment(id, this.props.company.id)
    }
  }

  createContact = body => {
    this.props.addContact(body, this.props.company.id)
    this.setState({ showCreateContact: false })
  }

  deleteContact(id) {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      this.props.deleteContact(id, this.props.company.id)
    }
  }

  saveContact = (id, body) => {
    this.props.updateContact(id, body)
    this.cancelEditingContact(id)
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.header}>
          <div
            className={styles.back_button}
            onClick={() => {
              this.props.back()
            }}
          >
            <i className='fa fa-arrow-left' />
          </div>
          <div>{this.props.company.name + ' '}</div>
        </div>
        <div className={styles.company_details_body}>
          <div className={styles.company_details}>
            <div className={styles.select_input}>
              <label>Status</label>
              <select
                value={
                  this.props.company.status
                    ? this.props.company.status.id
                    : MISSING
                }
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
                {Object.keys(this.props.statuses).map(key => (
                  <option key={key} value={key}>
                    {this.props.statuses[key]}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select_input}>
              <label>Ansvarig</label>
              <select
                value={
                  this.props.company.responsibleUser
                    ? this.props.company.responsibleUser.id
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
                this.props.company.contacts &&
                this.props.company.contacts.map(contactId => {
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
                this.props.company.comments &&
                this.props.company.comments.map(commentId => {
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
  company: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  statuses: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
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
