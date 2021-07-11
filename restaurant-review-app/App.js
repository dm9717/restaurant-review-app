import React, { useState } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { UserContext } from './src/contexts/userContext';
import { ReviewsContext } from './src/contexts/reviewsContext';

export default function App() {
    const [user, setUser] = useState();
    const [reviews, setReviews] = useState([]);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ReviewsContext.Provider value={{ reviews, setReviews }}>
                <AppNavigator />
            </ReviewsContext.Provider>
        </UserContext.Provider>
    );
}
