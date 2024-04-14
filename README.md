## Description

Frontend for **list-vote** project. 
Backend you can find here https://github.com/xartv/list-vote-backend

**The project idea** is shared lists with the ability for users to rate the items on the list. It's convenient for choosing weekend activities with a group of friends or selecting a movie for a family viewing. Everyone can add their suggestion to the list and vote for other options.

**Stack: Typescript, Next.js, Tanstack Query, Tailwind**

## Installation and running

1. Clone the project and install the dependencies

```bash
git clone https://github.com/xartv/list-vote-frontend.git
```

```bash
cd list-vote-frontend/
npm i
```

2. Create a .env file in the root of the project and copy the following code into it
```
BASE_URL=localhost
API_PORT=3002
```

3. BASE_URL and PORT are the URL and PORT of the running backend. If you haven't changed anything during its launch, the values mentioned above should default to suitable settings. Otherwise, you will need to adjust them.

4. Alright, all that's left is to start the application
```bash
npm run dev
```
5. So you can find the running application at http://localhost:3000 🏆

🐈 *For the full functioning of the entire project, it is recommended to also run the backend application https://github.com/xartv/list-vote-backend* 
