import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
 import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import LayoutContainer from "./components/Layaouts/LayoutContainer";
import Perfil from "./routes/Perfil";
import LayoutRequireAuth from "./components/Layaouts/LayoutRequireAuth";
import NotFound from "./routes/NotFound";
import LayoutRedirect from "./components/Layaouts/LayoutRedirect";


const App = () => {
     const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading...</p>;
     }

    return (
        <>
            <Navbar />
        
            <Routes>
                <Route path="/" element={<LayoutRequireAuth/>}>
                    <Route index element={<Home />}/>
                    <Route path="perfil" element={<Perfil />}/>
                    
                </Route>
                <Route path="/" element={<LayoutContainer/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/:nanoid" element={<LayoutRedirect/>}>
                <Route index element={<NotFound/>}/>
                </Route>
               
            </Routes>
        </>
    );
};

export default App;



