import { createContext } from 'react';

export const ReviewsContext = createContext({
    reviews: [],
    setReviews: () => {},
});
