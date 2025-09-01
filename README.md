<h1 style="text-align: center;">Next.js Firebase Authentication</h1>

This guide provides a step-by-step process for setting up **Firebase Authentication** in a Next.js application, covering both client-side and server-side integration.

## Steps

1. **Initialize Firebase Client**  
   Set up the Firebase client SDK to handle authentication and database interactions on the frontend.

2. **Initialize Firebase Admin**  
   Configure the Firebase Admin SDK to perform secure server-side operations and token verification.

3. **Create an Authentication Hook**  
   Build a custom React hook to manage authentication state and provide reusable login/logout functions.

4. **Implement Login API**  
   Create an API route to authenticate users and set HTTP-only cookies for secure session management.

5. **Design the Login Page**  
   Develop a user-friendly login page that integrates with your authentication hook.

6. **Handle Login Actions**  
   Use the authentication hook to manage login operations and maintain user state.

7. **Fetch and Set Cookies on Login**  
   Ensure session cookies are properly set after successful login for secure client-server communication.

8. **Implement Logout API**  
   Create an API route to clear session cookies and invalidate the user session.

9. **Logout Button Functionality**  
   Connect the logout button to the logout API and call the logout function from the useFirebaseAuth hook to log out the user securely.


<h3>📂 Folder Structure</h3>
<div>
<pre>
  src
   ├─ app
   │  ├─ (auth)
   │  │  └─ login
   │  │     └─ page.js
   │  ├─ (root)
   │  │  └─ All Page
   │  ├─ api
   │  │  ├─ login
   │  │  │  └─ route.js
   │  │  └─ logout
   │  │     └─ route.js
   │  ├─ layout.js
   │  └─ page.js
   ├─ components
   ├─ hooks
   │  └─ useFirebaseAuth.js
   └─ libs
      ├─ firebaseClient.js
      └─ firebaseServer.js
</pre>
</div>



<h3>💻 Firebase Client-Side Initialization Code</h3>

```js
//File location: src/libs/firebaseClient.js
import { initializeApp } from "firebase/app";
const initializeFirebase = () => {
  const firebaseConfig = {
    // Add your Firebase config data here
  };
  return initializeApp(firebaseConfig);
};
export default initializeFirebase;
```

<h3>💻 useFirebaseAuth Code</h3>

```js
//File location: src/hooks/useFirebaseAuth.js
"use client";
import initializeFirebase from "@/libs/firebaseClient";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useState, useEffect } from "react";

initializeFirebase(); //initialize firebase config

const useFirebase = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Get user data when authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
    });

    return () => unsubscribe();
  }, [auth]);

  // Function to handle login with email and password
  const handleEmailSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: userCredential, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      return { isLogout: true, error: null };
    } catch (error) {
      return { isLogout: false, error };
    }
  };

  return { user, handleEmailSignin, handleLogout};
};

export default useFirebase;
```


<h3>💻 Login API code</h3>

```js
//File location: src/app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, 
    path: "/",
    sameSite: "lax",
  });

  return response;
}

```







<div align="center">

### 📫 Contact Me

<a href="mailto:jahidulislamzim845@gmail.com" style="display:inline-block; margin-right:3px; outline:none; border:none;">
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
</a>
<a href="tel:+8801780115943" style="display:inline-block; margin-right:3px; outline:none; border:none;">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
</a>
<a href="https://jahidulislamzim.netlify.app" target="_blank" style="display:inline-block; margin-right:3px; outline:none; border:none;">
  <img src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Website">
</a>
<a href="https://www.facebook.com/jahidulislamzim43" target="_blank" style="display:inline-block; margin-right:3px; outline:none; border:none;">
  <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook">
</a>
<a href="https://www.linkedin.com/in/jahidulislamzim/" target="_blank" style="display:inline-block; margin-right:3px; outline:none; border:none;">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
<a href="https://github.com/jahidulislamzim" target="_blank" style="display:inline-block; margin-right:3px; outline:none; border:none;">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

</div>
