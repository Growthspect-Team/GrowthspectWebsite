import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  cursorText: string | null;
  setCursorText: (text: string | null) => void;
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <CursorContext.Provider value={{ cursorText, setCursorText, isHovering, setIsHovering }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
