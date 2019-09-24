import React, { Component } from 'react'

import { fetchCompany, fetchContacts, createContact } from 'api'

import StaticCommentCard from 'components/StaticCommentCard'
import CreateContactCard from 'components/CompanyContactCard/CreateContactCard'
import StaticContactCard from 'components/CompanyContactCard/StaticContactCard'
import NewCommentCard from 'components/NewCommentCard'
import EditCommentCard from 'components/EditCommentCard'
import Button from 'components/Button'

import styles from './CompanyDetailsStyles.css'
import PropTypes from 'prop-types'

const MISSING = 'MISSING'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
      contacts: [],
      comments: [
        {
          timestamp: 1568727537000,
          text: 'This is a very nice comment',
          id: 1,
        },
      ],
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
    const info = await fetchCompany(this.props.companyId)
    console.log(info)
    const contacts = await fetchContacts(this.props.companyId)
    console.log(contacts)
    // const { comments } = await companyCommentsApi(this.props.companyId)
    this.setState({
      info,
      contacts,
    })
    //   comments,
    // })
    document.title = 'STUDS | ' + info.name
  }
  /*
  getComments = async () => {
    const { comments } = await companyCommentsApi(this.props.companyId)
    this.setState({ comments })
  }
  */
  async getContacts() {
    const contacts = await fetchContacts(this.props.companyId)
    this.setState({ contacts, showCreateContact: false })
  }

  updateCompany = (target, value) => {
    console.log('UPDATE', target, value)
  }

  /*
  createComment = async text => {
    try {
      const addedComment = await addCommentApi({
        id: this.props.companyId,
        body: {
          user: 1,
          text,
        },
      })
      if (addedComment) {
        console.log('ADDED')
        this.getComments()
        this.setState({ newComment: '' })
      }
    } catch (err) {
      console.log(err)
    }
  }
  */
  startEditingComment = commentId => {
    if (!this.state.commentsBeingEdited.includes(commentId)) {
      this.setState({
        commentsBeingEdited: [...this.state.commentsBeingEdited, commentId],
      })
    }
  }
  /*

  startEditingContact = contactId => {
    if (!this.state.contactsBeingEdited.includes(contactId)) {
      this.setState({
        contactsBeingEdited: [...this.state.contactsBeingEdited, contactId],
      })
    }
  }

  changeCommentText = (id, newText) => {
    let oldComments = this.state.comments
    oldComments.find(comment => comment.id === id).text = newText
    this.setState({ comments: oldComments })
  }

  saveNewComment = async (id, text) => {
    const updated = await updateCommentApi({ id, body: { text } })
    if (updated) {
      this.cancelEditingComment(id)
      this.getComments()
    } else {
      console.log('could not update')
    }
  }
  */

  cancelEditingComment = id => {
    this.setState({
      commentsBeingEdited: this.state.commentsBeingEdited.filter(
        idInList => idInList !== id
      ),
    })
  }

  /*

  cancelEditingContact = id => {
    this.setState({
      contactsBeingEdited: this.state.contactsBeingEdited.filter(
        idInList => idInList !== id
      ),
    })
  }

  deleteComment = async id => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const deleted = await deleteCommentApi(id)
      if (deleted) {
        this.getComments()
      } else {
        console.log('could not delete comment with id: ' + id)
      }
    }
  }
  */

  createContact = body => {
    createContact(this.props.companyId, body).then(() => this.getContacts())
  }

  /*

  deleteContact = async id => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const deleted = await deleteContactApi(id)
      if (deleted) {
        this.getContacts()
      } else {
        console.log('could not delete comment with id: ' + id)
      }
    }
  }

  saveContact = async (id, body) => {
    const updated = await updateContactApi({ id, body })
    if (updated) {
      console.log('UPDATED CONTACT')
      this.cancelEditingContact(id)
      this.getContacts()
    } else {
      console.error('failed to update contact')
      this.cancelEditingContact(id)
    }
  }

  */

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
            Back
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
                  this.updateCompany('status', event.target.value)
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
            <div>
              <label>Ansvarig</label>
              <select
                value={
                  this.state.info.responsibleUser
                    ? this.state.info.responsibleUser.id
                    : MISSING
                }
                onChange={event =>
                  this.updateCompany('responsibleUser', event.target.value)
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
                    deleteContact={this.deleteContact}
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
                  onClick={() => this.setState({ showCreateContact: true })}
                >
                  Add
                </Button>
              )}
            </div>
            <div className={styles.comments_container}>
              <NewCommentCard createComment={this.createComment} />
              {this.state.comments
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(comment =>
                  this.isCommentBeingEdited(comment) ? (
                    <EditCommentCard
                      key={comment.id}
                      comment={comment}
                      changeCommentText={this.changeCommentText}
                      saveNewComment={this.saveNewComment}
                      cancelEditingComment={this.cancelEditingComment}
                    />
                  ) : (
                    <StaticCommentCard
                      key={comment.id}
                      comment={comment}
                      startEditingComment={this.startEditingComment}
                      deleteComment={this.deleteComment}
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
