import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../components/Login';
import Forgot from '../components/Forgot';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="forgot" component={Forgot} title="Forgot"/>
			    </Stack>
			 </Router>
			)
	}
}