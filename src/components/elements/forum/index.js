import React from 'react';
import TimeAgo from 'react-timeago'
import {Link} from 'react-router-dom'
import {Grid, Header, Icon, Segment} from 'semantic-ui-react'
import UserAvatar from '../account/avatar'
import NumericLabel from '../../../utils/NumericLabel'
import ForumLink from '../../../utils/forumlink'

export default class ForumIndex extends React.Component {
  render() {
    const {forum, isMinimized} = this.props
    let lastPost = (forum.last_post) ? (new Date(forum.last_post['created']).getTime()) : 0,
      lastReply = (forum.last_reply) ? (new Date(forum.last_reply['created']).getTime()) : 0,
      highlight = (forum.highlight),
      newest = (lastPost > lastReply) ? 'last_post' : 'last_reply',
      {author, url, created, title} = (typeof forum[newest] === 'object') ? forum[newest] : {},
      latest_post = null,
      numberFormat = {
        shortFormat: true,
        shortFormatMinValue: 1000
      }
    if (title && title.length > 100) {
      title = title.substring(0, 100) + " ..."
    }
    if (author) {
      latest_post = <Header size='tiny'>
        <UserAvatar username={author}
          style={{
            minHeight: '35px',
            marginBottom: '1em',
          }}
        />
        <Link to={`${url.split("#")[0]}`}
          style={{
            display: 'block',
            maxHeight: '35px',
            overflow: 'hidden'
          }}>
          {title}
        </Link>
        <Header.Subheader textAlign='right'>
          {'↳ '}
          <Link to={`${url}`}>
            <TimeAgo date={`${created}Z`}/>
          </Link>
        </Header.Subheader>
      </Header>
    }
    return (
      <Segment attached
        key={forum._id}
        style={{
          background: highlight ? "#ececec" : "",
          display: isMinimized ? "none" : ""
        }}
      >
        <Grid>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column computer={7} tablet={9} mobile={8}>
              <Header size='tiny'>
                <Icon color='grey' name={highlight ? 'pin' : 'list'}/>
                <Header.Content>
                  <ForumLink forum={forum}/>
                  <Header.Subheader style={{marginTop: '0.1rem'}}>
                    { (forum.description) ? forum.description : '' }
                  </Header.Subheader>
                  {
                    (forum.children && forum.children.length > 0)
                      ? (
                        <Header.Subheader style={{marginTop: '0.1rem'}}>
                          {forum.children.map((forum, i) => (<span key={i}>
                          {!!i && " • "}
                            <ForumLink forum={forum}/>
                        </span>))}
                        </Header.Subheader>
                      )
                      : ''
                  }
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={2} className='tablet or lower hidden' textAlign='center'>
              <Header size='tiny' color='grey'>
                <NumericLabel params={numberFormat}>{(forum.stats) ? forum.stats.posts : '?'}</NumericLabel>
              </Header>
            </Grid.Column>
            <Grid.Column width={2} className='tablet or lower hidden' textAlign='center'>
              <Header size='tiny' color='grey'>
                <NumericLabel params={numberFormat}>{(forum.stats) ? forum.stats.replies : '?'}</NumericLabel>
              </Header>
            </Grid.Column>
            <Grid.Column computer={5} tablet={6} mobile={8}>
              {latest_post}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}
