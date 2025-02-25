
import {Button} from '@heroui/button'; 
import * as actions from '@/app/actions';
import { auth } from '@/app/auth';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <form action={actions.signOut}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
