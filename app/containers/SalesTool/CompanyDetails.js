import React, { Component } from 'react'

// import {
//   companyInfoApi,
//   companyContactsApi,
//   companyCommentsApi,
//   updateCompanyApi,
//   addCommentApi,
//   updateCommentApi,
//   deleteCommentApi,
//   addContactApi,
//   deleteContactApi,
//   updateContactApi,
// } from '../utils/api'

import StaticCommentCard from 'components/StaticCommentCard'
import CreateContactCard from 'components/CreateContactCard'
import StaticContactCard from 'components/StaticContactCard'
import NewCommentCard from 'components/NewCommentCard'
import EditCommentCard from 'components/EditCommentCard'
import Button from 'components/Button'

import styles from './CompanyDetailsStyles.css'

// import {
//   StaticCommentCard,
//   EditCommentCard,
//   CreateContactCard,
//   NewCommentCard,
//   StaticContactCard,
//   EditCompanyInfoDropdown,
// } from '../components'

import PropTypes from 'prop-types'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: { 1: 'Cristian Osorio Bretti', 2: 'Pelle' },
      statuses: { 1: 'Ej kontaktad', 2: 'Kontaktad' },
      companyId: props.match.params.id,
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
    //this.getAllInfo()
  }

  /*
  getAllInfo = async () => {
    const { info } = await companyInfoApi(this.state.companyId)
    const { contacts } = await companyContactsApi(this.state.companyId)
    const { comments } = await companyCommentsApi(this.state.companyId)
    this.setState({
      info,
      contacts,
      comments,
    })
    document.title = 'STUDS | ' + info.company_name
  }

  getComments = async () => {
    const { comments } = await companyCommentsApi(this.state.companyId)
    this.setState({ comments })
  }

  getContacts = async () => {
    const { contacts } = await companyContactsApi(this.state.companyId)
    this.setState({ contacts })
  }

  updateCompany = async () => {
    try {
      const wasUpdated = await updateCompanyApi({
        id: this.state.companyId,
        body: {
          status: this.state.info.status,
          responsible_user: this.state.info.responsible_user,
        },
      })
      if (wasUpdated) {
        this.setState({ completedUpdating: true })
        setTimeout(() => {
          this.setState({ completedUpdating: false })
        }, 3000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  createComment = async text => {
    try {
      const addedComment = await addCommentApi({
        id: this.state.companyId,
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

  createContact = async body => {
    try {
      const addedComment = await addContactApi({
        id: this.state.companyId,
        body,
      })
      if (addedComment) {
        console.log('ADDED Contact')
        this.getContacts()
        this.setState({
          showCreateContact: false,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

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
          {/* <div
            className={styles.back_button}
            onClick={() => {
              this.props.back()
            }}
          >
            Back
          </div>
          <div>{this.state.info.company_name}</div> */}
          <div>Företagsnamn</div>
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
                className='form-control'
                id='status-select'
                value={this.state.info.status}
                onChange={event =>
                  this.setState(
                    {
                      info: { ...this.state.info, status: event.target.value },
                    }
                    //this.updateCompany
                  )
                }
              >
                {Object.keys(this.state.statuses).map(key => (
                  <option key={key} value={key}>
                    {this.state.statuses[key]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Ansvarig</label>
              <select
                className='form-control'
                id='member-select'
                value={
                  this.state.info.responsible_user !== null
                    ? this.state.info.responsible_user
                    : 0
                }
                onChange={event => {
                  this.setState(
                    {
                      info: {
                        ...this.state.info,
                        responsibleUser: event.target.value,
                      },
                    },
                    this.updateCompany
                  )
                }}
              >
                <option value={0}>Ingen</option>
                {Object.keys(this.state.users).map(key => (
                  <option key={key} value={key}>
                    {this.state.users[key]}
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
                    contactInfo={contactInfo}
                    saveContact={body => this.saveContact(contactInfo.id, body)}
                    hideCard={() => this.cancelEditingContact(contactInfo.id)}
                  />
                ) : (
                  <StaticContactCard
                    contactInfo={contactInfo}
                    deleteContact={this.deleteContact}
                    startEditingContact={this.startEditingContact}
                  />
                )
              )}
              {this.state.showCreateContact && (
                <CreateContactCard
                  saveContact={this.createContact}
                  hideCard={() => this.setState({ showCreateContact: false })}
                />
              )}
              {!this.state.showCreateContact && (
                <Button
                  onClick={() => this.setState({ showCreateContact: true })}
                >
                  Lägg till kontaktperson
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
                      comment={comment}
                      changeCommentText={this.changeCommentText}
                      saveNewComment={this.saveNewComment}
                      cancelEditingComment={this.cancelEditingComment}
                    />
                  ) : (
                    <StaticCommentCard
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  back: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
}

export default CompanyDetails
