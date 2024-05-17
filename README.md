## Description

Frontend for **list-vote** project. **Work in progress!**
Backend you can find here https://github.com/xartv/list-vote-backend

**The project idea** is shared lists with the ability for users to rate the items on the list. It's convenient for choosing weekend activities with a group of friends or selecting a movie for a family viewing. Everyone can add their suggestion to the list and vote for other options.

**Stack: Typescript, Next.js, Tanstack Query, Tailwind**

Demo of full project you can find here [listvote.ru](https://listvote.ru/)

[![listvote demo](https://img.youtube.com/vi/ZBwm0jCc6fk/0.jpg)](https://www.youtube.com/watch?v=ZBwm0jCc6fk)

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
NEXT_PUBLIC_PROTOCOL=http
NEXT_PUBLIC_BASE_URL=localhost
NEXT_PUBLIC_API_PORT=3002
NEXT_PUBLIC_COOKIE_DOMAIN=localhost
```

3. NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_API_PORT and NEXT_PUBLIC_PROTOCOL are the URL, PORT and PROTOCOL of the running backend. NEXT_PUBLIC_COOKIE_DOMAIN is domain for setting cookies. If you haven't changed anything during its launch, the values mentioned above should default to suitable settings. Otherwise, you will need to adjust them.

4. Alright, all that's left is to start the application
```bash
npm run dev
```
5. So you can find the running application at http://localhost:3000 🏆

🐈 *For the full functioning of the entire project, it is recommended to also run the backend application https://github.com/xartv/list-vote-backend* 
