import AuthForm from '../components/AuthForm';
import {json, redirect} from "react-router-dom"

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  const response = fetch("http://localhost:8080/"+mode, {
    method: "POST",
    headers: {
      content: "application/json"
    },
    body: JSON.stringify(authData)
  })

  if(response.status === 422 || response.status === 401){
    return response;
  }
  if(!response.ok){
    throw json({message: "User could not be authenticated"}, {status: 422});
  }

  return redirect("/");
}