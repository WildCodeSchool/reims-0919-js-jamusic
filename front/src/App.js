import React from 'react'
import axios from 'axios'
import Search from './Components/Search'
import Profile from './Components/Profile'
import AccountRegister from './Components/AccountRegister'
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import ModifProfileForm from './Components/ModifProfileForm'
import Header from './Components/Header'
import ProfileCreation from './Components/ProfileCreation'
import NewsFeed from './Components/NewsFeed'
import { Switch, Route, Redirect } from 'react-router-dom'
import './Components/Layout.css'
import './Components/Space.css'
import './Components/List.css'
import './Components/Form.css'
import './Components/Button.css'
import './Components/Color.css'
import './Components/Image.css'
import './Components/Font.css'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			researchIsVisible: false,
			selectedTags: [],
			isLoaded: false,
			email: '',
			password: '',
			token: null,
			isConnected: false,
			id: null
		}
		this.handleSelectedTags = this.handleSelectedTags.bind(this)
		this.handleresearchIsVisible = this.handleresearchIsVisible.bind(this)
		this.submitForm = this.submitForm.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.onChangePassword = this.onChangePassword.bind(this)
		this.getUserInfo = this.getUserInfo.bind(this)
	}

	submitForm(e) {
		e.preventDefault()
		const url = 'http://localhost:3000/login'

		axios
			.post(url, {
				email: this.state.email,
				password: this.state.password
			})
			.then(data =>
				data.status === 201
					? this.setState({
							token: data.data.token,
							isConnected: true
					  })
					: alert('Mauvais identifiants')
			)
			.then(() => this.getUserInfo())
			.catch(function(error) {
				alert(error)
			})
	}

	getUserInfo = () => {
		axios
			.get('http://localhost:3000/profiles/', {
				headers: {
					Authorization: `Bearer ${this.state.token}`
				}
			})
			.then(data =>
				this.setState({ id: data.data[0].id, isLoaded: true })
			)
	}

	loadProfile = event => {
		console.log(event.target.id)
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		})
	}

	handleresearchIsVisible() {
		this.setState({ researchIsVisible: !this.state.researchIsVisible })
	}

	handleSelectedTags(instrument) {
		this.setState({
			selectedTags: this.state.selectedTags.includes(instrument)
				? this.state.selectedTags.filter(tag => tag !== instrument)
				: [...this.state.selectedTags, instrument]
		})
	}
	render() {
		return (
			<div className='background-color body-font'>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/login' />
					</Route>
					<Route
						exact
						path='/register'
						component={() => <AccountRegister />}
					/>
					<Route
						path='/login'
						render={() =>
							this.state.isLoaded !== true ? (
								<LoginForm
									{...this.state}
									submitForm={this.submitForm}
									onChangeEmail={this.onChangeEmail}
									onChangePassword={this.onChangePassword}
								/>
							) : (
								<Redirect to={`/profiles/${this.state.id}`} />
							)
						}
					/>
					<div className='flex-column height-max-100'>
						<Header />
						<main className='flex1 overflow height-max-100'>
							<Route
								exact
								path={`/${this.state.id}/feed`}
								component={props => (
									<NewsFeed
										{...this.state}
										{...props}
										loadProfile={this.loadProfile}
									/>
								)}
							/>
							<Route
								exact
								path={`/profiles/:id`}
								render={props =>
									this.state.isConnected ? (
										<Profile
											{...props}
											{...this.state}
											submitForm={this.submitForm}
											onChangeEmail={this.onChangeEmail}
											onChangePassword={
												this.onChangePassword
											}
											loadProfile={this.loadProfile}
										/>
									) : (
										<Redirect to='/login/' />
									)
								}
							/>
							<Route
								exact
								path={`/profiles/modif`}
								component={() => (
									<ModifProfileForm {...this.state} />
								)}
							/>
							<Route
								exact
								path={'/tags'}
								component={() => (
									<Search
										tags={this.state.tags}
										handleSelectedTags={
											this.handleSelectedTags
										}
										selectedTags={this.state.selectedTags}
										researchIsVisible={
											this.state.researchIsVisible
										}
										handleresearchIsVisible={
											this.handleresearchIsVisible
										}
									/>
								)}
							/>
							<Route
								exact
								path={'/creationtest'}
								component={() => <ProfileCreation />}
							/>
						</main>
						<Navbar {...this.state} />
					</div>
				</Switch>
			</div>
		)
	}
}

export default App
