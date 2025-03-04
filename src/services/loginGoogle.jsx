import { GoogleLogin } from "react-google-login";

const clientId = "1018434450389-cont8867068oegkgggd59e7n4apjrer3.apps.googleusercontent.com"

function googleLogin() {

    const onSuccess = (res) => {
        console.log('login completo', res.profileObj);   
    }

    const onFailure = (res) => {
        console.log('login failed', res);
    }

    retrun(
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login con google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default googleLogin;