import { createContext, Dispatch, useContext, useState } from "react";

type THeaderScrollContextType = {
    isShownByScroll: boolean;
    setIsShownByScroll: Dispatch<React.SetStateAction<boolean>>;
};

const HeaderScrollContext = createContext<THeaderScrollContextType | undefined>(undefined);

export const HeaderScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isShownByScroll, setIsShownByScroll] = useState(false);

    return (
        <HeaderScrollContext.Provider value={{ isShownByScroll: isShownByScroll, setIsShownByScroll: setIsShownByScroll }}>
            {children}
        </HeaderScrollContext.Provider>
    );
};

export const useHeaderScroll = (): THeaderScrollContextType => {
    const context = useContext(HeaderScrollContext);
    if (!context) {
        throw new Error("useHeaderScroll must be used within a HeaderScrollProvider");
    }
    return context;
};
