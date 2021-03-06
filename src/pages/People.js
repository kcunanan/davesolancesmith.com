import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPeople } from '../actions/index'

import PageLayout from '../containers/PageLayout'
import Container from '../components/container'
import PeopleList from '../components/people-list'

class People extends Component {
  componentDidMount () {
    this.props.fetchPeople()
  }

  render () {
    let people = this.props.people
    if (this.props.limit) {
      people = people.slice(0, this.props.limit)
    }
    return (
        <PageLayout page="people">
            <Container>
                <div className="has-text-centered">
                    <h1 className="title">{this.props.page.title}</h1>
                    {this.props.page.subtitle ? <p className="subtitle">{this.props.page.subtitle}</p> : null}
                    <hr />
                </div>
                <PeopleList people={people} />
            </Container>
        </PageLayout>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page,
    people: state.people
  }
}

export default withRouter(connect(mapStateToProps, { fetchPeople })(People))
