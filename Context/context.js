import { createContext, useContext, useState } from "react";

export const userContext = createContext({});
export const LikeContext = createContext();
export const LikeContextProvider = ({ children }) => {
	const [likeState, setLikeState] = useState(false);
	return (
		<LikeContext.Provider value={{ likeState, setLikeState }}>
			{children}
		</LikeContext.Provider>
	);
};

export const useLikeContext = () => useContext(LikeContext);
