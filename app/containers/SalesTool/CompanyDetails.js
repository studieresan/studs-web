import React, { Component } from 'react'

import {
  fetchCompany,
  updateCompany,
  fetchContacts,
  createContact,
  removeContact,
  updateContact,
  fetchComments,
  fetchUser,
  createComment,
  removeComment,
  updateComment,
} from 'api'

import StaticCommentCard from 'components/CompanyCommentCard/StaticCommentCard'
import CreateContactCard from 'components/CompanyContactCard/CreateContactCard'
import StaticContactCard from 'components/CompanyContactCard/StaticContactCard'
import NewCommentCard from 'components/CompanyCommentCard/NewCommentCard'
import EditCommentCard from 'components/CompanyCommentCard/EditCommentCard'
import Button from 'components/Button'

import styles from './CompanyDetailsStyles.css'
import PropTypes from 'prop-types'

const MISSING = 'MISSING'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      info: {},
      contacts: [],
      comments: [],
      commentsBeingEdited: [],
      contactsBeingEdited: [],
      completedUpdating: false,
      showCreateContact: false,
    }
  }

  componentDidMount = () => {
    this.getAllInfo()
  }

  async getAllInfo() {
    const currentUser = await fetchUser()
    const info = await fetchCompany(this.props.companyId)
    const contacts = await fetchContacts(this.props.companyId)
    const comments = await fetchComments(this.props.companyId)
    this.setState({
      currentUser,
      info,
      contacts,
      comments,
    })
    document.title = 'STUDS | ' + info.name
  }

  async getCompanyInfo() {
    const info = await fetchCompany(this.props.companyId)
    this.setState({ info })
  }

  async getComments() {
    const comments = await fetchComments(this.props.companyId)
    this.setState({ comments })
  }

  async getContacts() {
    const contacts = await fetchContacts(this.props.companyId)
    this.setState({ contacts, showCreateContact: false })
  }

  updateCompany = body =>
    updateCompany(this.props.companyId, body).then(() => this.getCompanyInfo())

  createComment = text =>
    createComment(this.props.companyId, text).then(() => this.getComments())

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

  async saveComment(id, text) {
    const updated = await updateComment(id, text)
    if (updated) {
      this.getComments()
    } else {
      console.log('could not update')
    }
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

  async deleteComment(id) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const deleted = await removeComment(id)
      if (deleted) {
        this.getComments()
      } else {
        console.log('could not delete comment with id: ' + id)
      }
    }
  }

  createContact = body => {
    createContact(this.props.companyId, body).then(() => this.getContacts())
  }

  async deleteContact(id) {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const deleted = await removeContact(id)
      if (deleted) {
        this.getContacts()
      } else {
        console.log('could not delete comment with id: ' + id)
      }
    }
  }

  async saveContact(id, body) {
    const updated = await updateContact(id, body)
    if (updated) {
      console.log('UPDATED CONTACT')
      this.getContacts()
    } else {
      console.error('failed to update contact with id' + id)
    }
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
          <div>{this.state.info.name}</div>
        </div>
        <div className={styles.body}>
          <div className={styles.company_details}>
            {/* <div className='flex justify-center items-end mr-4'>
              {this.state.completedUpdating && (
                <span className='text-2xl text-green-500'>
                  <i className='fas fa-check' />{' '}
                </span>
              )}
            </div> */}
            <div className={styles.select_input}>
              <label>Status</label>
              <select
                value={
                  this.state.info.status ? this.state.info.status.id : MISSING
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
                  this.state.info.responsibleUser
                    ? this.state.info.responsibleUser.id
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
              {this.state.contacts.map(contactInfo =>
                this.isContactBeingEdited(contactInfo) ? (
                  <CreateContactCard
                    key={contactInfo.id}
                    contactInfo={contactInfo}
                    saveContact={body => this.saveContact(contactInfo.id, body)}
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
                currentUser={this.state.currentUser}
              />
              {this.state.comments
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(comment =>
                  this.isCommentBeingEdited(comment) ? (
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
  companyId: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
  statuses: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
}

export default CompanyDetails
