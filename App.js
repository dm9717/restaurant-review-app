import React, { useState } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { UserContext } from './src/contexts/userContext';

export default function App() {
    const [user, setUser] = useState();
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppNavigator />
        </UserContext.Provider>
    );
}
