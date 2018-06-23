
import React from 'react';
import slug from 'slug'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Icon, Menu, Popup, Segment } from 'semantic-ui-react'

import AccountLink from '../account/link'
import ForumSubscribe from './subscribe'

export default class ForumTitle extends React.Component {
    changeFilter = (e, data) => {
        const tag = (data.value) ? slug(data.value).toString() : false
        this.setState({active: tag})
        this.props.changeFilter(tag)
        this.props.hideConfig()
    }
    render() {
        let { forum } = this.props
        let tags = false
        let parent = false
        if(forum) {
            if(forum.tags) {
              tags = forum.tags.map((tag, i) => (
                  <Menu.Item key={i} value={tag} onClick={this.changeFilter} active={(this.props.active === tag)}>
                      #{tag}
                  </Menu.Item>
              ))
            }
            if(forum.parent) {
                parent = (
                    <Popup
                      trigger={
                          <Menu.Item icon as={Link} to={`/f/${forum.parent}`}>
                              <Icon name='chevron up' size='large' />
                          </Menu.Item>
                      }
                      content='Go to Parent Forum'
                      inverted
                    />
                )
            }
        }
        return (
            <div>
                <Segment attached='top' color='grey' stacked>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <Header size='tiny' key={(forum) ? forum._id : 'unknown'} color='grey'>
                                    <Icon name='list' />
                                    <Header.Content>
                                        {(forum) ? forum.name : 'unknown'}
                                        <Header.Subheader color='grey'>
                                            <tiny>
                                                <Link to={`/f/${(forum) ? forum._id : 'unknown'}`} color='grey'>
                                                    /f/{(forum) ? forum._id : 'unknown'}
                                                </Link>
                                                {' • '}
                                                created by
                                                {' '}
                                                <AccountLink username={(forum) ? forum.creator || 'eostalk' : 'unknown'} />
                                            </tiny>
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Popup
                                  trigger={
                                      <Button
                                          rounded
                                          disabled={!forum}
                                          size='large'
                                          floated='right'
                                          icon='cubes'
                                          onClick={this.props.showConfig}
                                      />
                                  }
                                  content='Forum Information'
                                  inverted
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {(forum && forum.description)
                    ? (
                        <Segment attached>
                            {forum.description}
                        </Segment>
                    )
                    : false
                }
                <Menu attached={(this.props.subforums) ? true : 'bottom'} size='tiny'>
                    <Menu.Item icon value={false} key={(forum) ? forum._id : 'unknown'} onClick={this.changeFilter} active={(this.props.active === false)}>
                        <Icon name='home' size='large' />
                    </Menu.Item>
                    {parent}
                    {tags}
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <ForumSubscribe
                              forum={this.props.forum}
                              isUser={this.props.account.isUser}
                              subscriptions={this.props.subscriptions.forums}
                              onSubscribe={this.props.actions.forumSubscribe}
                              onUnsubscribe={this.props.actions.forumUnsubscribe}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {this.props.subforums}
            </div>
        )
    }
}
