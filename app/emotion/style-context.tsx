import {createContext} from 'react';

//
//

export interface ClientStyleContextData {
  reset: () => void;
}

export const EmotionStyleContext = createContext<ClientStyleContextData>({
  reset: () => {},
});
