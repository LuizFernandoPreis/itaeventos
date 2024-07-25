import { v4 as uuid } from 'uuid'
import { db } from '@/app/lib/db'
import {UserService} from '@/app/actions/user/user'
type SignInRequestData = {
  email: string;
  password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  await delay()
  const user = new UserService()
  await user.updateUser({ where: { id: 1 }, data: { name: '8080' } });


  if(parseInt(data?.password) == 123) return {
        token: uuid(),
        user: {
          name: 'Diego Fernandes',
          email: 'diego@rocketseat.com.br',
          avatar_url: 'https://github.com/diego3g.png'
        }
      }

  return null;
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}